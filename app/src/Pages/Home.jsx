import './Home.css'
import Header from "../Header/Header"
import Sidebar from '../Sidebar/Sidebar'
import Posts from "./Posts"
import {React, useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';


export default function Home() {
  // connecting backend
  // define post
  const [posts, setPosts] = useState([]);
// fetch all data per user
const {search} = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      // posts from backend url
      const res = await axios.get("/posts" + search);
      
      // const res = await axios.get("http://127.0.0.1:7000/api/posts" + search)
      setPosts(res.data);
      // console.log(res);
    };
    fetchPosts();
    
    
  }, [search]);
  // end of backend connection
  return (
    <> {/* React.Fragment key={posts.id}*/}
      <Header />

      <div className="home">
        <Posts posts={posts} />
        <Sidebar />
      </div>
    </>
  );
}
