import React, { useEffect, useState } from 'react'

const Test = () => {
    const [toggle, setToggle] = useState(false);

    // 2 parameter: function, dependency array
    // mount, update
    useEffect(() => {
        console.log("Component Mount")
    }, [])

  return (
    <div>
      <h1>Test Component</h1>
      <button onClick={() => setToggle(!toggle)}>Toggle</button>
    </div>
  )
}

export default Test
