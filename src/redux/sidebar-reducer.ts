
let initialState = {}

type initialStateType = typeof initialState;

// у state есть значение по умолчанию для инициализации
const sidebarReducer = (state = initialState, action: any):initialStateType => {
    return state;
}

export default sidebarReducer;