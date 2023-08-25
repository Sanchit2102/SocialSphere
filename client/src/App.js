import { useSelector } from "react-redux";
import "./App.css";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import { Route, Routes } from "react-router-dom";
import Chat from "./pages/chat/Chat";

function App() {
  const user = useSelector(
    (state) =>
      state.authReducer.authData?.user || state.authReducer.authData?.newUser
  );
  
  return (
    <>
      <div className="App">
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
        <Routes>
          <Route path="/" element={user ? <Home /> : <Auth />} />
          <Route path="/home" element={user ? <Home /> : <Auth />} />
          <Route path="/auth" element={user ? <Home /> : <Auth />} />
          <Route path="/profile/:id" element={user? <Profile/>:<Auth/>} />
          <Route path="/chat" element={user? <Chat/>:<Auth/>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
