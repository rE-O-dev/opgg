const ADD = 'itemList/ADD' as const;

export const add = (itemList: ItemListState) => ({
    type: ADD,
    itemList
});

type ItemListAction = 
    ReturnType<typeof add>

const initialState: ItemListState = null;

function itemList(
    state: ItemListState = initialState,
    action: ItemListAction
): ItemListState {
    switch(action.type) {
        case ADD:
            return action.itemList
        default:
            return state;
    }
}

export default itemList;