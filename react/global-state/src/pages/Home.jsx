import React, { useContext } from 'react'
import { GlobalContext } from '../context/Context'

const Home = () => {
    const { state } = useContext(GlobalContext);

    console.log("State", state)

    return (
        <div>
            {state.user.firstName} {state.user.lastName}
        </div>
    )
}

export default Home