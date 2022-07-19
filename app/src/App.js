import Navbar from "./Header/Navbar/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Settings from "./Pages/Settings";
import Home from "./Pages/Home";
import Single from "./Pages/Single";
import Write from "./Pages/Write"; 
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link 
} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
// import MakePost from "./Pages/MakePost";

function App() {
  const {user} = useContext(Context); 
  return ( 
    <Router>
      <Navbar />

      <Routes> {/* formally Switch*/}

        <Route exact path="/" element={<Home/>}/>
        {/* if there is a user, go to home page */}
        <Route exact path="/register" element={user? <Home/> :<Register/>}/>
        {/* if there is a user, go to home page */}
        <Route exact path="/login" element={user? <Home/> : <Login/>}/>
        {/* if there is a user, go to settings page */}
        <Route exact path="/settings" element={user? <Settings/> : <Register/>}/>
        {/* if there is a user, go to write page */}
        <Route exact path="/write" element={user? <Write/> :<Register/>}/>
        <Route exact path="/posts/:postId" element={<Single/>}/>
        {/* <Route exact path="/makepost" element={<MakePost/>}/> */}

        
      </Routes>
  
    </Router>
  );
}

export default App;
