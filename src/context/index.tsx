import { createContext, useState } from 'react';

type StateType = {
  player: PlayerType;
  most: MostType;
  matchList: MatchListType;
  itemList: ItemListType;
}

type ActionType = {
  setPlayer(player: PlayerType): void;
  setMost(most: MostType): void;
  setMatchList(matchList: MatchListType): void;
  setItemList(itemList: ItemListType): void;
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