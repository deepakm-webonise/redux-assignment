import ACTIONS from 'constants/action-constants';

const USER_REDUCER = {
  userInfo: {}
}

export default function(state = USER_REDUCER, action) {
    switch(action.type) {
        case ACTIONS.USER.USER_INFO:
            return _.extend({}, state, {userInfo: action.payload});
        default:
            return state;
  }
}
