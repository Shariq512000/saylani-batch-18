import React from 'react'
import './layout.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons';

const Aside = () => {
  let style={
    color: "white"
  }
  return (
    <aside>
      <FontAwesomeIcon icon={faHouse} style={style} />
    </aside>
  )
}

export default Aside
