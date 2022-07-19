import MakePost from './MakePost'
import './Posts.css'

// add the props {posts} from the Home.jsx that was created
export default function Posts({posts}) {
  return (
    <div className="posts">
      {/* now map your posts*/}
      {posts.map((p, index) =>(
        <MakePost post={p} key={index}/>
      ))}

    </div>
  );
}
