import { types } from '../types';

export const authReducer = (state = {}, action) => {
    switch (action.type) {
        case types.login:
            return {
                address: action.payload.address,
                name: action.payload.displayName
            }
        case types.logout:
            return {}
            default:
                return state;
    }
 }
 