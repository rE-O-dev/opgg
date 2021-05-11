
import './index.scss';

const Rank = (props: {league: {[key: string]: any}}) => {
  const { league } = props;
  const { tierRank, wins, losses } = league;
  return (
    <div className="league">
      {
        league.hasResults === true ? (
          <div className="wrap">
            <img src={tierRank.imageUrl} alt="tierImage"/>
            <div className="explanation">
              <p className="name">{tierRank.name}</p>
              <p className="game">탑 <span>(총{wins + losses}게임)</span></p>
              <p className="tier">{tierRank.tier}</p>
              <p className="lp">{tierRank.lp} LP <span>/ {wins}승 {losses}패</span></p>
              <p>승률 {Number(wins / (wins + losses) * 100).toFixed()}%</p>
            </div>
          </div>
        ) : (
          <div>
          
          </div>
        )
      }
      
    </div>
  )

}


export default Rank;