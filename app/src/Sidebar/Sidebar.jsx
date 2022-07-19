import './Sidebar.css'
import EKD from "../img/ekd1.jpeg"
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    // backend connection
    const [cats, setCats] = useState([]);

    useEffect(() =>{
        const getCats = async () =>{
            const res = await axios.get("/categories");
            setCats(res.data);
        };
        getCats();
    }, []);
    return (
        <div className="sidebar">
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img className="sidebarImg" src={EKD} alt="" />
                <p>
                    I am Enoch Kwateh Dongbo a  25 years old Liberian who graduated from the Messiah Mission Institute High School In
                    Liberia with the title of a Valedictorian and i am currently a student of the Zhejiang Sci-Tech University
                    in the People Republic of China study Computer Science and Technology.
                </p>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">
                   {cats.map((c, index) =>(
                       <Link to={`/?cat=${c.name}`} key={index} className="link">
                    <li className="sidebarListItem" key={index}>{c.name}</li>
                       </Link>
                   ))}
                </ul>
            </div>

            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-facebook"></i>
                    <i className="sidebarIcon fa-brands fa-linkedin"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-github"></i>
                </div>
            </div>
        </div>
    );
}
