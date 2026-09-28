export const reducer = (state, action) => {

    // action = { type: "USER_LOGIN", user: apiRes.data.user }

    switch (action.type) {

        case "USER_LOGIN": {
            return { ...state, isLogin: true, user: action.user }
        }

        case "USER_LOGOUT": {
            return { ...state, isLogin: false, user: {} }
        }

        default: {
            return state
        }
    }
}