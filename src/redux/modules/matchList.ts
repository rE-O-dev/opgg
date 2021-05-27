const ADD = 'matchList/ADD' as const;

export const add = (matchList: MatchListState) => ({
    type: ADD,
    matchList
});

type MatchListAction =
    ReturnType<typeof add>

const initialState: MatchListState = null;
function matchList(
    state: MatchListState = initialState,
    action: MatchListAction
): MatchListState {
    switch(action.type) {
        case ADD:
            return action.matchList;
        default:
            return state;
    }
}

export default matchList;