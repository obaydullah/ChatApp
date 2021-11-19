import * as actionType from './type'

export const setUser = (user) => {
    return {
        type: actionType.set_user,
        payload: {
            currentUser: user
        }
    }
}