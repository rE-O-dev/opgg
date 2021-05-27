import Rank from '../rank';
import Most from '../most';
import Match from '../match';

import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

import './index.scss';

const Info = () => {
  const player = useSelector((state: RootState) => state.player);

  if(player) {
    const { leagues } = player;

    return (
      <div className="information">
        <div className="leftSide">
          <div className="leagueWrap">
          {
            leagues.map((league, idx) => {
              return <Rank key={idx} league={league} />
            })
          }
          </div>
          <Most />
        </div>
        <Match />
      </div>
    )
  } else {
    return <></>;
  }

}

export default Info;