import { createContext, useState } from 'react';

type StateType = {
  player: PlayerState;
  most: MostState;
  matchList: MatchListState;
  itemList: ItemListState;
}

type ActionType = {
  setPlayer(player: PlayerState): void;
  setMost(most: MostState): void;
  setMatchList(matchList: MatchListState): void;
  setItemList(itemList: ItemListState): void;
}

type BundleType = {
  state: StateType;
  action: ActionType;
}

const initValue: BundleType = {
  state: {
    player: null,
    most: null,
    matchList: null,
    itemList: null,
  },

  action: {
    setPlayer: () => {},
    setMost: () => {},
    setMatchList: () => {},
    setItemList: () => {},
  }
}

const Context = createContext(initValue);

const ContextProvider = (props: {children: JSX.Element}) => {
  const [player, setPlayer] = useState(initValue.state.player);
  const [most, setMost] = useState(initValue.state.most);
  const [matchList, setMatchList] = useState(initValue.state.matchList);
  const [itemList, setItemList] = useState(initValue.state.itemList);
  const bundle: BundleType = {
    state: {
      player,
      most,
      matchList,
      itemList
    },
    action: {
      setPlayer,
      setMost,
      setMatchList,
      setItemList
    }
  }

  return <Context.Provider value={bundle}>{props.children}</Context.Provider>

}

export {Context, ContextProvider};