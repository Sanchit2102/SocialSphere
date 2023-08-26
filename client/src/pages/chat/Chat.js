import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import LogoSearch from "../../components/profileside/logosearch/LogoSearch";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest.js";
import Conversation from "./Conversation";
import { Link } from "react-router-dom";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import ChatBox from "./ChatBox";
import { io } from "socket.io-client";

const Chat = () => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);

  const socket = useRef();
  const user = useSelector(
    (state) =>
      state.authReducer.authData?.user || state.authReducer.authData?.newUser
  );

  useEffect(() => {
    const getChats = async () => {
      try {
        const { data } = await userChats(user._id);
        setChats(data);
      } catch (error) {
        console.log(error);
      }
    };
    getChats();
  }, [user]);

  // Connect to Socket.io
  useEffect(() => {
    socket.current = io("https://sssocket.onrender.com");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("receive-message", (data) => {
      setReceiveMessage(data);
    });
  }, []);

  const checkOnlineStatus = (chat) => {
    const chatMembers = chat?.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMembers);
    return online ? true : false;
  };

  return (
    <>
      <div className="Chat">
        <div className="left-side-chat">
          <LogoSearch />
          <div className="Chat-container">
            <h2>Chats</h2>
            <div className="Chat-list">
              {chats?.map((chat) => {
                return (
                  <>
                    <div onClick={() => setCurrentChat(chat)}>
                      <Conversation
                        data={chat}
                        currentUser={user._id}
                        online={checkOnlineStatus(chat)}
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
        <div className="right-side-chat">
          <div>
            <div
              className="navIcons"
              style={{ marginLeft: "auto", width: "20rem" }}
            >
              <Link to="/home">
                <img src={Home} alt="home" />
              </Link>

              <UilSetting />
              <img src={Noti} alt="notification" />
              <Link to="/chat">
                <img src={Comment} alt="comment" />
              </Link>
            </div>
            <ChatBox
              chat={currentChat}
              currentUser={user._id}
              setSendMessage={setSendMessage}
              receiveMessage={receiveMessage}
              online={checkOnlineStatus(currentChat)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
