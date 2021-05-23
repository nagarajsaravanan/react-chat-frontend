export const login = (payload) => ({
    payload: payload,
    type: 'LOGIN'
});

/** set chat name*/
export const chatName = (payload) => ({
    payload: payload,
    type: 'SET_CHAT_NAME'
})

/** set loading true or false */
export const loading = (payload) => ({
    payload: payload,
    type: 'LOADING'
})

/** set the users data */
export const setUsers = payload => ({
    payload: payload,
    type: 'SET_USERS'
});

/** set the message data */
export const setMessage = payload => ({
    payload: payload.data,
    type: 'SET_MESSAGE'
});

/** set the socket object */
export const setSocket = payload => ({
    payload: payload.data,
    type: 'SET_SOCKET'
});