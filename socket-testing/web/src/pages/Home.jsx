import React, { useEffect } from "react";
import io from "socket.io-client";

const Home = () => {
  const socket = io("http://localhost:5000", { withCredentials: true });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    // Channel/Topic,    function
    socket.on("Test topic", (data) => {
      console.log("Received Data: ", data);
    });

    socket.on("disconnect", (reason) => {
      console.log("Disconnected. Reason:", reason);
    });

    socket.on("error", (error) => {
      console.log("Error:", error);
    });

    return () => {
      //   console.log("Unmount");
      socket.close(); // cleanup on unmount
    };
  }, []);
  return <div>Home</div>;
};

export default Home;
