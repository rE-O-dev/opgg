import { useContext } from 'react';

import { Context } from '../../../context';

import dateCalc from '../../../lib/dateCalc';

import { getMatchDetail } from '../../../api';
import { useLayoutEffect, useState } from 'react';



const ListComponent = (props: {list: JsonArrayType}) => {
  const { list } = props;

  const { state } = useContext(Context);

  const { itemList } = state;

  const [itemInfo, setItemInfo] = useState({
    key: "",
    description: "",
    gold: {
      base: 0,
      total: 0,
      sell: 0,
    }
  });
  
  return (
    <ul className="listWrap">
      {
        list.map((v, idx) => {
          const { champion, stats, items } = v;
          const { imageUrl, level } = champion;
          const { general, ward } = stats;
          const { kill, death, assist, kdaString, largestMultiKillString, opScoreBadge, cs, csPerMin, contributionForKillRate } = general;

          const splitUrl = imageUrl.split("/");

          return (
            <li key={idx} className={`contents ${v.isWin ? "win" : "loss"}`}>
              <div className="textWrap">
                <p>{v.gameType}</p>
                <p className="bold">{dateCalc(v.createDate)}</p>
                <div className={`bar ${v.isWin ? "blue" : "red"}`}></div>
                <p>{v.isWin ? "승리" : "패배"}</p>
                <p className="bold">{v.gameLength}</p>
              </div>
              <div className="settingWrap">
                <div className="imageWrap">
                  <img className="champ" src={imageUrl} alt="champion"/>
                  <div className="spellWrap">
                    {
                      v.spells.map((spell: {imageUrl: string}, i: number) => {
                        return (
                          <img className="spell" src={spell.imageUrl} alt="spell" key={i}/>
                        )
                      })
                    }
                  </div>
                  <div className="peakWrap">
                    {
                      v.peak.map((p:string, i:number) => {
                        return (
                          <img src={p} className="peak" alt="peak" key={i}/>
                        )
                      })
                    }
                  </div>
                </div>
                <p className="champName">{splitUrl[splitUrl.length-1].split(".")[0]}</p>
              </div>
              <div className="kdaWrap">
                <p className="kda">
                  <span>{kill} / </span>
                  <span>{death}</span>
                  <span> / {assist}</span>
                </p>
                <p className="kdaRatio"><span className="number">{kdaString}</span> 평점</p>
                {
                  (largestMultiKillString || opScoreBadge) && (
                    <div className="badge">
                      {
                        largestMultiKillString &&
                        <span className="multi">{largestMultiKillString}</span>
                      }
                      {
                        opScoreBadge &&
                        <span className="op">{opScoreBadge}</span>
                      }
                    </div>
                  )
                }
              </div>
              <div className="stats">
                  <p>레벨 {level}</p>
                  <p>{cs}{(csPerMin)}CS</p>
                  <p>킬관여 {contributionForKillRate}</p>
              </div>
              <div className="itemWrap">
                  {
                    new Array(8).fill("").map((item, i) => {
                      return (
                        <div key={i} className={`item ${v.isWin ? "win" : "loss"}`}>
                          {
                            items[i] && (
                              <div>
                                {
                                  itemInfo.key === `${v.gameId}_${i}_${items[i]}` &&
                                  <div className="tooltip">
                                    <div dangerouslySetInnerHTML={{__html: itemInfo.description}}>
                                    </div>
                                  </div>
                                }
                                <img src={items[i].imageUrl} alt="item" onMouseOver={() => {
                                  if(itemList !== null) {
                                    const splitItem = items[i].imageUrl.split("/");
                                    const key = splitItem[splitItem.length - 1].split(".png")[0]
                                    setItemInfo({
                                      key: `${v.gameId}_${i}_${items[i]}`,
                                      description: itemList.data[key].description,
                                      gold: itemList.data[key].gold
                                    });
                                  }
                                }}
                                onMouseLeave={() => {
                                  setItemInfo({
                                    key: "",
                                    description: "",
                                    gold: {
                                      base: 0,
                                      sell: 0,
                                      total: 0
                                    }
                                  })
                                }}
                                />
                                
                              </div>
                            )
                          }
                        </div>
                      )
                    })
                  }
                  <div className="ward">
                    <i className={`${v.isWin ? "blue":"red"}`} />
                    <span>제어와드 {ward.visionWardsBought}</span>
                  </div>
              </div>
              <div>
                <DetailRender 
                  summonerName={v.summonerName}
                  gameId={v.gameId}
                />
              </div>
              <div className={`more ${v.isWin ? "blue" : "red"}`}>
                
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}


const DetailRender = (props: {summonerName: string, gameId: string}) => {
  const {summonerName, gameId} = props;

  const matchDetail = async (summonerName: string, gameId: string) => {
    await getMatchDetail(summonerName, gameId).then((resolve) => {
      setDetail(resolve);
    });
  }

  const [detail, setDetail] = useState<{
    teams: JsonArrayType;
  } | null>(null);

  useLayoutEffect(() => {
    matchDetail(summonerName, gameId);
  }, [summonerName, gameId])
  if(detail !== null) {
    return (
      <div className="detailWrap">
        {detail.teams.map((team, i: number) => {
          const { players } = team;
          return (
            <ul key={i} className="summonernWrap">
              {
                players.map((player: {
                  champion: {
                    imageUrl: string;
                    level: number;
                  };
                  summonerId: string;
                  summonerName: string;
                }, idx:number) => {
                  return (
                    <li key={idx} className="summoner">
                      <img src={player.champion.imageUrl} />
                      <span className="summonerName">{player.summonerName}</span>
                    </li>
                  )
                })
              }
            </ul>
          )
        })}    
      </div>
    )
  } else {
    return <></>;
  }
}

export default ListComponent;