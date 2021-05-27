const ADD = 'player/ADD' as const;
const MODIFY = 'player/MODIFY' as const;
const REMOVE = 'player/REMOVE' as const;

export const add = (player: PlayerState) => ({
    type: ADD,
    player
})

export const modify = (player: PlayerState) => ({
    type: MODIFY,
    player
})

export const remove = () => ({
    type: REMOVE
});

type PlayerAction = 
    | ReturnType<typeof add>
    | ReturnType<typeof modify>
    | ReturnType<typeof remove>

const initialState: PlayerState = null;

function player(
    state: PlayerState = initialState,
    action: PlayerAction
): PlayerState {
    switch (action.type) {
        case ADD:
            return action.player
        case MODIFY:
            return action.player
        case REMOVE:
            return null;
        default:
            return state
    }
};

export default player;