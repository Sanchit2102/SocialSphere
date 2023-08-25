import React,{useState} from "react";
import "./RightSide.css";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { TrendData } from "../../Data/TrendData";
import ShareModal from "../ShareModal";
import { Link } from "react-router-dom";

const RightSide = () => {
  const [modalOpened,setModalOpened] = useState(false)
  return (
    <>
      <div className="RightSide">
        <div className="navIcons">
        <Link to='/home'>
        <img src={Home} alt="home" />
        </Link>
          
          <UilSetting />
          <img src={Noti} alt="notification" />
          <Link to='/chat'>
          <img src={Comment} alt="comment" />
          </Link>
          
        </div>
        <div className="TrendCard">
       <h3>Trends for You</h3> 
          {TrendData.map((t, i) => {
            return <>
              <div className="Trend">
                <span>#{t.name}</span>
                <span>{t.shares}k shares</span>
              </div>
            </>;
          })}
        </div>
        <button className="button r-btn" onClick={()=>{
          setModalOpened(true)
        }}>Share</button>
        <ShareModal modalOpened = {modalOpened} setModalOpened={setModalOpened}/>
      </div>
    </>
  );
};

export default RightSide;
