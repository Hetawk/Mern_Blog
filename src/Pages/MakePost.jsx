import './MakePost.css'
// import EKD1 from "../img/ekd2.jpeg"
import {Link} from "react-router-dom";


// add the prop {posts} here as well

export default function MakePost({post}) {
  
  // adding img url in order that it display when you upload it
  const PF = "http://127.0.0.1:7000/img/";
  return (
    
    <div className="makepost">
      {post.photo && 
      <img
        className="makepostImg"
        src={PF + post.photo}
        alt=""
      />}
      
      <div className="makepostInfo">
        <div className="makepostCategory">
          {post.categories.map((c, index) =>(
          <span className="makepostCat" key={index}>{c.name}</span>
          ))}
        </div>
        <Link to={`/posts/${post._id}`} className="link">
        <span className="makepostTitle">{post.title}</span> <hr/>
        </Link>
        <span className="makepostDate">{new Date(post.createdAt).toDateString()}</span> 
      </div>
      <p className="makepostDesc">
      {post.desc}
      </p>
    </div>



  )
}
