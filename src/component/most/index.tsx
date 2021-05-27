import { useState } from "react";
import { useSelector } from "react-redux";

import kdaColor from "../../lib/kdaColor";
import { RootState } from "../../redux";

import './index.scss';

enum Filter {
  rate,
  recent,
}

const Most = () => {
  const most = useSelector((state: RootState) => state.most);
  
  const [filter, setFilter] = useState<number>(Filter.rate);

  if(most) {
    const { champions, recentWinRate } = most; 

    return (
      <div className="mostWrap">
        <div className="filterWrap">
          <button className={`${filter === Filter.rate && "active"} left`} onClick={() => {
            setFilter(Filter.rate)
          }}>챔피언 승률</button>
          <button className={`${filter === Filter.recent && "active"} right`} onClick={() => {
            setFilter(Filter.recent)
          }}>7일간 랭크 승률</button>
        </div>
        {
          
            <ul className="list">
              {
                filter === Filter.rate ? 
                champions.sort((a, b) => {
                  return b.games - a.games;
                }).map((v, idx) => {
                  const rate = v.wins / (v.wins + v.losses) * 100;
                  const kda = (v.kills + v.assists) / v.deaths;
                  return (
                    <li key={idx} className="rate">
                      <img src={v.imageUrl} alt="champion" />
                      <div className="championInfo">
                        <p className="bold name">{v.name}</p>
                        <p>CS {v.cs}</p>
                      </div>
                      <div className="kda">
                        <p className={`bold ${kdaColor(kda)}`}>{Number(kda).toFixed(2)}:1 평점</p>
                        <p>{Number(v.kills / v.games).toFixed(2)} / {Number(v.deaths / v.games).toFixed(2)} / {Number(v.assists / v.games).toFixed(2)}</p>
                      </div>
                      <div className="played">
                        <p className={`bold ${rate > 60 && "red"}`}>{Math.floor(rate)}%</p>
                        <p>{v.games}게임</p>
                      </div>
                    </li>
                  )
                })
               : 
               recentWinRate.sort((a, b) => {
                 return (b.wins + b.losses) - (a.wins + a.losses)
               }).map((v, idx) => {
                const rate =  v.wins / (v.wins + v.losses) * 100
                return (
                   <li key={idx} className="recent">
                     <img src={v.imageUrl} />
                     <div className="championInfo">
                       <p className="bold name">{v.name}</p>
                     </div>
                     <div className="odds">
                      <p className={`bold ${rate > 60 && "red"}`}>{Number(rate).toFixed(2)}%</p>
                     </div>
                     <Band wins={v.wins} losses={v.losses}/>
                   </li>
                 )
               })
              }
            </ul>
          
        }
        
      </div>
    )
  } else {
    return <></>;
  }
  
}

const Band = (props: {wins: number; losses: number;}) => {
  const { wins, losses } = props;
  
  const WinsBand = () => {
    return (
      <div style={{
        width: `${wins / (wins + losses) * 100}%`,
        backgroundColor: '#1f8ecd',
        color: '#fff'
      }}>
        {wins}승
      </div>
    )
  }

  const LossesBand = () => {
    return (
      <div style={{
        width: `${losses / (wins + losses) * 100}%`,
        backgroundColor: '#ee5a52',
        color: '#fff'
      }}>
        {losses}패
      </div>
    )
  }

  return (
    <div className="winRatioBand">
      {wins && <WinsBand />}
      {losses && <LossesBand />}
    </div>
  )
}


export default Most;