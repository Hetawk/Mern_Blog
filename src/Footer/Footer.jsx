import "./Footer.css"
import React from "react";
import InstagramIcon from "@material-ui/icons/Instagram";
import TwitterIcon from "@material-ui/icons/Twitter";
import FacebookIcon from "@material-ui/icons/Facebook";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function Footer() {
  return (
    <div className="footer">
      <div className="socialMedia">
         
        
        <a href="https://instagram.com/enoch.dongbo"><InstagramIcon /></a>
        <a href="https://twitter.com/enoch_dongbo"><TwitterIcon /> </a>
        <a href="https://www.facebook.com/enoch.dongbo"><FacebookIcon /></a>
        <a href="https://www.linkedin.com/in/enoch-kwateh-dongbo-371a7b117"><LinkedInIcon /></a>
        
      </div>
      <p className="copyright"> &copy; 2022-{new Date().getFullYear()} Copyright: Enoch Kwateh Dongbo </p>
    </div>
  );
}

export default Footer;
