import socket from 'socket.io-client';
const endPoint = "http://localhost:5000";

const reducer = (state = { loading: false, users: [], messages: {}, io: socket(endPoint) }, action) => {
    console.log('payload', action);
    switch (action.type) {
        case 'LOGIN':
            return { ...state, login: action.payload.login, currentLogin: action.payload.data, loading: false }
        case 'SET_CHAT_NAME':
            return { ...state, ...action.payload }
        case 'LOADING':
            return { ...state, loading: action.payload }
        case 'SET_USERS':
            return { ...state, users: action.payload.data, loading: false }
        case 'SET_MESSAGE':

            let key = action.payload.fromId > action.payload.toId ? `${action.payload.toId}-${action.payload.fromId}` : `${action.payload.fromId}-${action.payload.toId}`;
            if (state.messages.hasOwnProperty(key)) {
                let flag = true;
                state.messages[key].map(m => {
                    if (m.timestamp == action.payload.timestamp) {
                        flag = false;
                        return false;
                    }
                });
                if (flag) {
                    return { ...state, messages: { ...state.messages, [key]: [...state.messages[key], action.payload] } }
                } else {
                    return state;
                }
            } else {
                return { ...state, messages: { [key]: [action.payload] } }
            }
        default:
            return state;
    }
}

export default reducer;