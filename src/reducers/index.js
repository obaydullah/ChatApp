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
                isLoading: true
            }
        default:
            return state
    }
}

const rootReducers = combineReducers({
    user: userReducer
})

export default rootReducers;