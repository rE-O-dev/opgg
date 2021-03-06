import { RootState } from '../../redux/index';
import { useSelector } from 'react-redux';

import './index.scss';
const Player = () => {

  const player = useSelector((state: RootState) => state.player);

  if(player !== null) {
    const { ladderRank, level, name, previousTiers, profileBorderImageUrl, profileImageUrl } = player;
    
    const PreviousTier = (props: {tier: any}) => {
      const { tier } = props;
      return (
        <span className="preTier">
          <span className="short">{tier.shortString}</span>
          <span>{tier.tier}</span>
        </span>
      )
    };
    
    return (
      <div className="player">
        <div className="preTierWrap">
          {
            previousTiers.map((v, i) => {
              return <PreviousTier key={i} tier={v} />
            })
          }
        </div>
        <div className="profWrap">
          <div className="profImgWrap">
            <img className="profImg" src={profileImageUrl} alt="profile" />
            <img className="profBorderImg" src={profileBorderImageUrl} alt="profileBorder" />
            <span className="level">{level}</span>
          </div>
          <div className="summoner">
            <p className="name">{name}</p>
            <p className="ladder">
              Ladder Rank: <span className="bold">{ladderRank.rank.toLocaleString()} </span>( {ladderRank.rankPercentOfTop}% of top)
            </p>
          </div>
        </div>
      </div>
    )
  }
  else {
    return <></>;
  }
}

export default Player;