import { useState, useContext, useMemo } from 'react';

import { Context } from '../../context';

import HighchartsReact from 'highcharts-react-official'
import Highcharts from 'highcharts';

import ListComponent from './content/list';

import './index.scss';
import kdaColor from '../../lib/kdaColor';

enum FilterType {
  all,
  solo,
  free
}

const filters = ["전체", "솔로게임", "자유랭크"]




const Match = () => {
  
  const { state } = useContext(Context);
  
  const { matchList } = state;

  const [filter, setFilter] = useState<number>(FilterType.all);
  
  const gameList = useMemo(() => {
    if(matchList) {
      switch(filter) {
        case FilterType.all:
          return [...matchList.games];
        case FilterType.solo:
          return matchList.games.filter(v => v.gameType === "솔랭");
        case FilterType.free:
          return matchList.games.filter(v => v.gameType === "자유 5:5 랭크");
        default:
          return null;
      }
    } else {
      return null;
    }
  }, [matchList, filter])

  if(matchList) {
    const { champions, games, positions, summary } = matchList;
    const { assists, wins, losses, kills, deaths } = summary;

    

    return (
      <div className="matchWrap">
        <div className="filterWrap">
          {
            filters.map((v, idx) => {
              return (
                <button
                  key={idx}
                  onClick={(e) => {
                    setFilter(idx)
                  }}
                  className={`${filter === idx && "active"}`}
                >
                  {v}
                </button>
              )
            })
          }
        </div>
        <div className="summaryWrap">
          <div className="totalWrap">
              <div className="left">
                <p>{wins + losses}전 {wins}승 {losses}패</p>
                <div className="graphWrap">
                  <HighchartsReact highcharts={Highcharts} 
                    options={{
                      chart: {
                        type: "pie",
                        width: 90,
                        height: 90,
                        spacingBottom: 0,
                        spacingTop: 0,
                        spacingLeft: 0,
                        spacingRight: 0,
                        marginBottom: 0,
                        marginTop: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        border: 0,
                        
                        backgroundColor: 'none'
                      },
                      tooltip: { enabled: false },
                      credits: { enabled: false },
                      title: { text: null },
                      series: [
                        {
                          width: 90,
                          height: 90,
                          innerSize: 64,
                          data: [
                            { y: wins, color: "#ee5a52" },
                            { y: losses, color: '#1f8ecd' }
                          ],
                          
                        }
                      ],
                      plotOptions: {
                        pie: {
                          size: 90,
                          borderWidth: 0,
                          dataLabels: {
                                enabled: false
                            },
                            showInLegend: false,
                            stickyTracking: false,
                            enableMouseTracking: false,
                        },
                      },
                    }} />
                  <span>{Math.floor(wins / (wins+losses) * 100)}%</span>
                </div>
              </div>
              <div className="right">
                  <p className="kda">
                    <span>{kills}</span>
                    <span> / </span>
                    <span className="red">{deaths}</span>
                    <span> / </span>
                    <span>{assists}</span>
                  </p>
                  <p className="kdaGrade">
                    <span className={`${kdaColor((kills + assists) / deaths)}`}>{Number((kills + assists) / deaths).toFixed(2)} : 1 </span>
                    <span>(58)</span>
                  </p>
              </div>
          </div>
          <div className="championWrap">
            {
              champions.map((v, idx) => {
                const kda = (v.kills + v.assists) / v.deaths;
                const rate = v.wins / v.games * 100;
                return (
                  <div key={idx} className="champion">
                    <img src={v.imageUrl} alt="champImg"/>
                    <div className="textWrap">
                      <p className="name">{v.name}</p>
                      <p className="total">
                        <span className={`${rate >= 60 && "red"}`}>{Math.floor(rate)}% </span>
                        <span>({v.wins}승 {v.losses}패)</span>
                        <span className={`${kdaColor(kda)}`}>{Number(kda).toFixed(2)} 평점</span>
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className="positionWrap">
            <p>선호 포지션 (랭크)</p>
            {
              positions.map((v, idx) => {
                return (
                  <div key={idx} className="position">
                    <i className={`${v.position}`} />
                    <div className="text">
                      <p>{v.position}</p>
                      <p className="ratio">
                        <span className="per">{Math.floor(v.games / games.length * 100)}%</span>
                        <span className="rate">Win Rate {Math.floor(v.wins / v.games * 100)}%</span>
                      </p>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {
          gameList !== null &&
          <ListComponent list={gameList} />
        }
      </div>
    )
  } else {
    return <></>;
  }
}

export default Match;