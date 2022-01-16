import { combineReducers } from 'redux'
import * as actionType from '../actions/type'

const initialState = {
    currentUser: null,
    isLoading: true
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.set_user:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionType.remove_user:
            return {
                ...initialState
            }
        default:
            return state
    }
}

const initialStateGruop = {
    currentGroup: null
}

const groupReducer = (state = initialStateGruop, action) => {
    switch (action.type) {
        case actionType.set_current_group:
            return {
                ...state,
                currentGroup: action.payload.currentgroup
            }
        default:
            return state;
    }
}

const rootReducers = combineReducers({
    user: userReducer,
    group: groupReducer
})

export default rootReducers;