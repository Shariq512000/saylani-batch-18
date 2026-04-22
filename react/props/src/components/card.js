const UserCard = (props) => {
  console.log("props", props)
  return(
    <div className='card'>
      <h4>Name: {props.name}</h4>
      <h6>Batch: {props.batch}</h6>
      <p>Course: {props.course}</p>
    </div>
  )
}

export default UserCard;