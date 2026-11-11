import React, { useContext, useEffect, useState } from "react";
import api from "../component/api";
import { Link } from "react-router";
import io from "socket.io-client";
import { GlobalContext } from "../context/Context";

const Users = () => {
  let { state } = useContext(GlobalContext);
  const [users, setUsers] = useState([]);
  const [newMessages, setNewMessages] = useState([]);
  // console.log("users", users);
  const socket = io("http://localhost:5000", { withCredentials: true });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    //1
    socket.on(`${state.user._id}`, (data) => {
      // console.log("Received Data: ", data);
      setNewMessages((prev) => [...prev, data]);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected. Reason:", reason);
    });

    socket.on("error", (error) => {
      console.log("Error:", error);
    });

    return () => {
      socket.close(); // cleanup on unmount
    };
  }, []);

  console.log(newMessages);

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
        position: "relative",
      }}
    >
      <div
        className=""
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {newMessages.map((eachMsg) => {
          return (
            <Link
              to={`/chat/${eachMsg.from._id}`}
              className=""
              key={eachMsg._id}
              style={{
                display: "inline-block",
                width: "250px",
                backgroundColor: "#d9d9d9",
                padding: 5,
                borderRadius: 5,
                marginBottom: 10,
              }}
            >
              <p>
                {eachMsg.from.firstName} {eachMsg.from.lastName}
              </p>
              <span>{eachMsg.message}</span>
            </Link>
          );
        })}
      </div>
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
