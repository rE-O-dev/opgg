const ADD = 'most/ADD' as const;

export const add = (most: MostState) => ({
    type: ADD,
    most
});

type MostAction = 
    ReturnType<typeof add>

const initialState: MostState = null;

function most(
    state: MostState = initialState,
    action: MostAction
): MostState {
    switch(action.type) {
        case ADD:
            return action.most;
        default:
            return state;
    }
}

export default most;