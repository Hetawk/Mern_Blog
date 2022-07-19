import './Header.css'
import Himage from "../img/ekd.jpeg";

export default function Header() {
  return (
      <div className="header">
          <div className="headerTitles">
              <span className="headerTitleSm">E K D</span>
              <span className="headerTitleLg">Blog</span>
          </div>
          <img 
          className="headerImg"
          src={Himage} 
          alt=""
          />
      </div>
  );
}
