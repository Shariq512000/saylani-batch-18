export const reducer = (state, action) => {
    switch (action.type) {

        case "USER_LOGIN": {
            console.log("Calling Type:", "USER_LOGIN")
            return { ...state, isLogin: true, user: action.payload }
        }

        case "USER_LOGOUT": {
            return { ...state, isLogin: false, user: {} }
        }

        default: {
            return state
        }
    }
}