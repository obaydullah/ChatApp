import * as actionType from './type'

export const setUser = (user) => {
    return {
        type: actionType.set_user,
        payload: {
            currentUser: user
        }
    }
}
export const removeUser = () => {
    return {
        type: actionType.remove_user,
    }
}

export const set_current_group = (group) => {
    return {
        type: actionType.set_current_group,
        payload: {
            currentgroup: group
        }
    }
}