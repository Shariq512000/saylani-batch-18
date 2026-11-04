import React, { useEffect, useState } from "react";
import api from "../component/api";
import { Link } from "react-router";

const Users = () => {
  const [users, setUsers] = useState([]);
  console.log("users", users);
  const getUsers = async () => {
    try {
      const apiRes = await api.get("/users"); //
      setUsers(apiRes.data.users);
    } catch (error) {
      console.log("Err", error);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      {users?.map((eachUser) => (
        <Link
          to={`/chat/${eachUser._id}`}
          className=""
          style={{
            border: "1px solid black",
            width: "350px",
            cursor: "pointer",
          }}
        >
          <h6>
            {eachUser.firstName} {eachUser.lastName}
          </h6>
          <p>{eachUser.email}</p>
        </Link>
      ))}
    </div>
  );
};

export default Users;
