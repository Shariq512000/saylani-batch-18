const UserCard = (props) => {
  return (
    <div className="card">
      <h4>Name: {props.name}</h4>
      <h6>Batch: {props.batch}</h6>
      <p>Course: {props.course}</p>
    </div>
  );
};

// normalFunc(5,8)
{
  /* <Comp name="Shariq" batch="18" /> */
}
// {
//   name: "Shariq",
//   batch: "18"
// }

export default UserCard;
