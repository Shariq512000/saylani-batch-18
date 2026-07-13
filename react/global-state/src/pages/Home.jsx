import React, { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../context/Context'

const Home = () => {

    const { state, dispatch } = useContext(GlobalContext);

    console.log("state", state)

    const setUser = () => {
        dispatch({
            type: "USER_LOGIN",
            payload: {
                firstName: "Shariq",
                lastName: "Siddiqui"
            }
        })
    }

    useEffect(() => {
        setUser()
    }, [])

    return (
        <div>
        </div>
    )
}

export default Home