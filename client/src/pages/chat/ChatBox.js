import React, { useEffect, useRef, useState } from "react";
import { getUser } from "../../api/UserRequest";
import Profile from "../../img/profileImg.png";
import { addMessages, getMessages } from "../../api/MessageRequest";
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";

const ChatBox = ({ chat, currentUser,setSendMessage,receiveMessage,online }) => {
  const [userData, setUserData] = useState(null);
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const [messages, setMessages] = useState([]);
  const [newMessages, setNewMessages] = useState("");
  const scroll = useRef();

  const getUserData = async (userId) => {
    try {
      const { data } = await getUser(userId);
      await setUserData(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data } = await getMessages(chat._id);
      setMessages(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    if (chat != null) getUserData(userId);
  }, [chat, currentUser]);

  useEffect(() => {
    const userId = chat?.members?.find((id) => id !== currentUser);
    if (chat != null) fetchMessages(userId);
  }, [chat, currentUser]);

  const handleChange = (newMessages) => {
    setNewMessages(newMessages);
  };

  const handleSend = async(e) => {
    e.preventDefault();
    const message = {
      senderId: currentUser,
      text: newMessages,
      chatId: chat._id,
    };
    //mongoDb
    try {
      const {data} =await addMessages(message);
      setNewMessages('')
      setMessages([...messages,data])
    } catch (error) {
      console.log(error)
    }

    //send message to socket server
    const receiverId = chat.members.find((id)=> id !== currentUser)
    setSendMessage({...message,receiverId})
  };

  useEffect(()=>{
if(receiveMessage !== null && receiveMessage.chatId === chat._id){
  setMessages([...messages,receiveMessage])
}
  },[receiveMessage])


  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])
  return (
    <>
      <div className="ChatBox-container">
        {chat ? (
          <>
            <div className="chat-header">
              <div
                className="follower conversation"
                style={{ justifyContent: "flex-start" }}
              >
                <div>
                  <img
                    src={
                      userData?.profilePicture
                        ? publicFolder + userData.profilePicture
                        : Profile
                    }
                    alt=""
                    className="follower-img"
                    style={{ width: "60px", height: "60px" }}
                  />
                </div>
                <div
                  className="name"
                  style={{ fontSize: "1rem", marginLeft: "20px" }}
                >
                  <span>
                    {userData?.otherDetails.firstname}{" "}
                    {userData?.otherDetails.lastname}
                  </span>
                  <span>
                    {online ? 'Online':'Offline'}
                  </span>
                </div>
              </div>
              <hr style={{ width: "100%", border: "0.1px solid #ececec" }} />
            </div>
            <div className="chat-body">
              {messages.map((message) => {
                return (
                  <>
                    <div
                    ref={scroll}
                      className={
                        message?.senderId === currentUser
                          ? "message own"
                          : "message"
                      }
                    >
                      <span>{message?.text}</span>
                      <span>{format(message.createdAt)}</span>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="chat-sender">
              <div>+</div>
              <InputEmoji value={newMessages} onChange={handleChange} />
              <div className="send-button button" onClick={handleSend}>
                Send
              </div>
            </div>
          </>
        ) : (
          <>
            <span className="chatbox-empty-message">
              Tap on a Chat to start Conversation
            </span>
          </>
        )}
      </div>
    </>
  );
};

export default ChatBox;
