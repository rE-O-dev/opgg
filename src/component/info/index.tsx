import { useContext } from 'react';

import { Context } from '../../context';

import Rank from '../rank';
import Most from '../most';
import Match from '../match';

import './index.scss';
const Info = () => {
  const { state } = useContext(Context);
  const { player } = state;

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