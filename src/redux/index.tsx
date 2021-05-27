import { combineReducers } from 'redux';
import player from './modules/player';
import most from './modules/most';
import matchList from './modules/matchList'
import itemList from './modules/itemList';
const rootReducer = combineReducers({
    player,
    most,
    matchList,
    itemList,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;