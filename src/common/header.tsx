import { useCallback, useState, useLayoutEffect, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { getSummoner, getMatchList, getMostInfo, getItemInfo } from '../api';

import { useDispatch } from 'react-redux';

import { add as playerAdd } from '../redux/modules/player';
import { add as mostAdd } from '../redux/modules/most'; 
import { add as matchListAdd } from '../redux/modules/matchList';
import { add as itemListAdd } from '../redux/modules/itemList';

const Header = () => {
  const location = useLocation();
  
  const dispatch = useDispatch();
  
  const [searchText, setSearchText] = useState<string>("");
  const [focus, setFocus] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState(() => {
    const history = localStorage.getItem("searchHistory");
    if(history) {
      return JSON.parse(history);
    } else {
      return [];
    }
  });

  const [summonerInfo, setSummonerInfo] = useState<PlayerState>(null);

  const isEnter = useCallback((e) => {
    if(e.key === "Enter") {
      e.stopPropagation();
      window.location.href = `/${searchText}`
    }
  }, [searchText]);

  const fetchSummoner = useCallback(async (name: string) => {

    const summoner = await getSummoner(name);
    const matchList = await getMatchList(name);
    const mostInfo = await getMostInfo(name);
    
    dispatch(playerAdd(summoner.summoner));
    dispatch(mostAdd(mostInfo));
    dispatch(matchListAdd(matchList));

    const searchHistory = localStorage.getItem("searchHistory");
    if(searchHistory) {
      const array = JSON.parse(searchHistory);

      const filterArray = array.filter((v:string) => {
        return v.toLocaleLowerCase() !== name.toLocaleLowerCase()
      });

      localStorage.setItem("searchHistory", JSON.stringify([name, ...filterArray]));
      setSearchHistory([name, ...filterArray]);
    } else {
      localStorage.setItem("searchHistory", JSON.stringify([name]));  
    }
    

    // op.gg 페이지 검색 결과 searchText가 초기화 되는것을 착안해 초기화.
    setSearchText("");
  }, []);

  const searchSummoner = async () => {
    try {
      const summoner = await getSummoner(searchText);

      setSummonerInfo(summoner.summoner);
    } catch(error) {
      console.log(error);
    }

  }

  useEffect(() => {
    
    let fetch = true;

    setTimeout(() => {
      if(fetch && searchText) {
        searchSummoner();
      }
    }, 300)

    return () => {
      fetch = false;
    }
  }, [searchText])

  
  useLayoutEffect(() => {
    async function items() {
      const item = await getItemInfo(); 
      dispatch(itemListAdd(item));  
    }
    items();

    const { pathname } = location;

    const path = pathname.split("/").join("");

    if(path) {
      fetchSummoner(path);
    }

  }, []);

  return (
    <div className="header">
      <div className="inputWrap">
        <input type="text" value={searchText} placeholder="소환사명, 소환사명, ..." onKeyPress={isEnter} onChange={(e) => {
          setSearchText(e.target.value);
        }} onFocus={() => {
          setFocus(true);
        }}
          onBlur={() => {
            setFocus(false);
            setSummonerInfo(null);
          }}
        />
        {
          focus && (
            <>
              {
                searchText === "" ? (
                  <div className="latelySearch">
                    <div className="buttonWrap">
                      <button className="on">최근검색</button>
                      <button>즐겨찾기</button>
                    </div>
                    <ul className="history">
                      {
                        searchHistory.length > 0 && (
                          searchHistory.map((v: string, idx: number) => {
                            return (
                              <li key={idx}>
                                {v}
                              </li>
                            )
                          })
                        )
                      }
                    </ul>
                  </div>
                ) : (
                  <>
                    {
                      summonerInfo !== null && (
                        <div className="summonerInfo">
                          <img className="profImg" src={summonerInfo.profileImageUrl} alt="profile" />
                          <div>
                            <p className="name">{summonerInfo.name}</p>
                            <p className="tier">
                              {summonerInfo.leagues[0].tierRank.tier} - {summonerInfo.leagues[0].tierRank.lp}LP
                            </p>
                          </div>
                        </div>
                      )
                    }
                  </>
                )
              }
              
            </>
          )
        }
      </div>
      
    </div>
  )
}

export default Header;