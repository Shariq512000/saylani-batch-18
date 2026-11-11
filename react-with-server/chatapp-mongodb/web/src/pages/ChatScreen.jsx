import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../component/api";
import { GlobalContext } from "../context/Context";
import io from "socket.io-client";

const ChatScreen = () => {
  let { state } = useContext(GlobalContext);

  const { userId } = useParams();

  const [loadingMessages, setLoadingMessages] = useState(true);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState("");
  const [userDetails, setUserDetails] = useState({});

  const socket = io("http://localhost:5000", { withCredentials: true });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    /// 1-3
    // from: 3
    // to: 1
    // 6aded77440f824b8d4dd2918-6aded78840f824b8d4dd2919

    //1-2
    socket.on(`${state.user._id}-${userId}`, (data) => {
      // console.log("Received Data: ", data);
      setMessages((prev) => [...prev, data]);
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

  const getConversation = async () => {
    setLoadingMessages(true);
    try {
      // 6aded78840f824b8d4dd2919
      const apiRes = await api.get(`/conversation/${userId}`);
      setMessages(apiRes.data.conversations);
      setLoadingMessages(false);
    } catch (error) {
      console.log("Err", error);
    }
  };

  const getUser = async () => {
    try {
      const apiRes = await api.get(`/user-detail/${userId}`);
      console.log("apiRes", apiRes.data);
      setUserDetails(apiRes.data.user);
    } catch (error) {
      console.log("Err", error);
    }
  };

  useEffect(() => {
    if (!userId) return;
    getConversation();
    getUser();
  }, [userId]);

  async function sendMessage(event) {
    event.preventDefault();
    const text = draft.trim();
    if (!text || !userId || sending) return;

    setSending(true);
    setError("");
    try {
      const apiRes = await api.post(`/chat/${userId}`, {
        message: text,
      });
      console.log("apiRes", apiRes.data);
      setDraft("");
      setMessages((prevMessages) => [...prevMessages, apiRes.data.chat]);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="">
      <div className="">
        <h3>
          {userDetails?.firstName} {userDetails?.lastName}
        </h3>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {messages.map((eachMsg) => {
          const isMe = state.user._id == eachMsg.from._id;
          return (
            <div
              className=""
              style={{
                border: "1px solid black",
                alignSelf: isMe ? "flex-end" : "flex-start",
                width: "350px",
              }}
              key={eachMsg._id}
            >
              <span>
                {isMe
                  ? "Me"
                  : `${eachMsg.from.firstName} ${eachMsg.from.lastName}`}
              </span>
              <br />
              <p>{eachMsg.message}</p>
            </div>
          );
        })}
      </div>
      <form className="composer" onSubmit={sendMessage}>
        <input
          aria-label="Write a message"
          placeholder={`Message…`}
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
        />
        <span className="composer-hint">Enter to send</span>
        <button
          className="send-button"
          type="submit"
          disabled={!draft.trim() || sending}
          aria-label="Send message"
          title="Send message"
        >
          {sending ? "…" : "↑"}
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
