/*import React from 'react'
import './Sidebar.css'
import home from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import explore from '../../assets/explore.png'
import subscriprion from '../../assets/subscriprion.png'
import sports from '../../assets/sports.png'
import entertainment from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import jack from '../../assets/jack.png'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'

const Sidebar = ({sidebar,category,setCategory}) => {
  return (
    <div className={`sidebar ${sidebar?"":"small-sidebar"}`}>
      <div className="shortcut-links">
            <div onClick={()=>{setCategory(0)}} className={`side-link ${category===0?"active":""}`}><img src={home} alt="" /><p>Home</p></div>
            <div onClick={()=>{setCategory(20)}} className={`side-link ${category===20?"active":""}`}><img src={game_icon} alt="" /><p>Gaming</p></div>
            <div onClick={()=>{setCategory(2)}} className={`side-link ${category===2?"active":""}`}><img src={automobiles} alt="" /><p>Automobiles</p></div>
            <div onClick={()=>{setCategory(17)}} className={`side-link ${category===17?"active":""}`}><img src={sports} alt="" /><p>Sports</p></div>
            <div onClick={()=>{setCategory(24)}} className={`side-link ${category===24?"active":""}`}><img src={entertainment} alt="" /><p>Entertainment</p></div>
            <div onClick={()=>{setCategory(28)}} className={`side-link ${category===28?"active":""}`}><img src={tech} alt="" /><p>Technology</p></div>
            <div onClick={()=>{setCategory(10)}} className={`side-link ${category===10?"active":""}`}><img src={music} alt="" /><p>Music</p></div>
            <div onClick={()=>{setCategory(22)}} className={`side-link ${category===22?"active":""}`}><img src={blogs} alt="" /><p>Blogs</p></div>
            <div onClick={()=>{setCategory(25)}} className={`side-link ${category===25?"active":""}`}><img src={news} alt="" /><p>News</p></div>
            <hr/>
        </div>
        <div className="subscribed-list">
            <h3>SUBSCRIBED</h3>
            <div className={`side-link`}><img src={jack} alt="" /><p>PewDiePie</p></div>
            <div className={`side-link`}><img src={simon} alt="" /><p>MrBeast</p></div>
            <div className={`side-link`}><img src={tom} alt="" /><p>Justin Bieber</p></div>
            <div className={`side-link`}><img src={megan} alt="" /><p>5-Minute Crafts</p></div>
            <div className={`side-link`}><img src={cameron} alt="" /><p>Nas Daily</p></div>
        </div>
    </div>
  )
}

export default Sidebar
*/
/*
import React, { useEffect } from "react";
import "./Sidebar.css";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import entertainment from "../../assets/entertainment.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import jack from "../../assets/jack.png";
import simon from "../../assets/simon.png";
import tom from "../../assets/tom.png";
import megan from "../../assets/megan.png";
import cameron from "../../assets/cameron.png";

const Sidebar = ({ sidebar, category, setCategory }) => {
  useEffect(() => {
    const applyTheme = async () => {
      const now = new Date();
      const hours = now.getHours();

      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const region = data.region;

        const southIndiaStates = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];

        if (hours >= 10 && hours <= 12 && southIndiaStates.includes(region)) {
          document.body.classList.remove("dark-theme");
        } else {
          document.body.classList.add("dark-theme");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    applyTheme();
  }, []);

  return (
    <>
      <style>
        {`
          :root {
              --background-color: #fff;
              --text-color: #000;
          }

          .dark-theme {
              --background-color: #181818;
              --text-color: #fff;
          }

          .sidebar {
              background: var(--background-color);
              color: var(--text-color);
              width: 15%;
              height: 100vh;
              position: fixed;
              top: 0;
              padding-left: 2%;
              padding-top: 80px;
              transition: background 0.3s ease, color 0.3s ease;
          }

          .small-sidebar {
              width: 5%;
          }

          .shortcut-links img {
              width: 20px;
              margin-right: 20px;
          }

          .side-link {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              width: fit-content;
              flex-wrap: wrap;
              cursor: pointer;
          }

          .side-link.active img {
              padding-bottom: 2px;
              border-bottom: 3px solid red;
          }

          .shortcut-links .active {
              color: #ed3833;
              font-weight: 600;
          }

          .sidebar hr {
              border: 0;
              height: 1px;
              background: #ccc;
              width: 85%;
          }

          .subscribed-list h3 {
              font-size: 13px;
              margin: 20px 0;
              color: #5a5a5a;
          }

          .subscribed-list img {
              width: 25px;
              border-radius: 50%;
              margin-right: 20px;
          }

          .small-sidebar p {
              display: none;
          }

          .small-sidebar h3 {
              display: none;
          }

          .small-sidebar hr {
              width: 50%;
              margin-bottom: 25px;
          }

          @media (max-width: 900px) {
              .sidebar {
                  display: none;
              }
          }
        `}
      </style>
      <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
        <div className="shortcut-links">
          <div onClick={() => setCategory(0)} className={`side-link ${category === 0 ? "active" : ""}`}>
            <img src={home} alt="" />
            <p>Home</p>
          </div>
          <div onClick={() => setCategory(20)} className={`side-link ${category === 20 ? "active" : ""}`}>
            <img src={game_icon} alt="" />
            <p>Gaming</p>
          </div>
          <div onClick={() => setCategory(2)} className={`side-link ${category === 2 ? "active" : ""}`}>
            <img src={automobiles} alt="" />
            <p>Automobiles</p>
          </div>
          <div onClick={() => setCategory(17)} className={`side-link ${category === 17 ? "active" : ""}`}>
            <img src={sports} alt="" />
            <p>Sports</p>
          </div>
          <div onClick={() => setCategory(24)} className={`side-link ${category === 24 ? "active" : ""}`}>
            <img src={entertainment} alt="" />
            <p>Entertainment</p>
          </div>
          <div onClick={() => setCategory(28)} className={`side-link ${category === 28 ? "active" : ""}`}>
            <img src={tech} alt="" />
            <p>Technology</p>
          </div>
          <div onClick={() => setCategory(10)} className={`side-link ${category === 10 ? "active" : ""}`}>
            <img src={music} alt="" />
            <p>Music</p>
          </div>
          <div onClick={() => setCategory(22)} className={`side-link ${category === 22 ? "active" : ""}`}>
            <img src={blogs} alt="" />
            <p>Blogs</p>
          </div>
          <div onClick={() => setCategory(25)} className={`side-link ${category === 25 ? "active" : ""}`}>
            <img src={news} alt="" />
            <p>News</p>
          </div>
          <hr />
        </div>
        <div className="subscribed-list">
          <h3>SUBSCRIBED</h3>
          <div className="side-link">
            <img src={jack} alt="" />
            <p>PewDiePie</p>
          </div>
          <div className="side-link">
            <img src={simon} alt="" />
            <p>MrBeast</p>
          </div>
          <div className="side-link">
            <img src={tom} alt="" />
            <p>Justin Bieber</p>
          </div>
          <div className="side-link">
            <img src={megan} alt="" />
            <p>5-Minute Crafts</p>
          </div>
          <div className="side-link">
            <img src={cameron} alt="" />
            <p>Nas Daily</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
*/
import React, { useEffect } from "react";
import "./Sidebar.css";
import home from "../../assets/home.png";
import game_icon from "../../assets/game_icon.png";
import automobiles from "../../assets/automobiles.png";
import sports from "../../assets/sports.png";
import entertainment from "../../assets/entertainment.png";
import tech from "../../assets/tech.png";
import music from "../../assets/music.png";
import blogs from "../../assets/blogs.png";
import news from "../../assets/news.png";
import jack from "../../assets/jack.png";
import simon from "../../assets/simon.png";
import tom from "../../assets/tom.png";
import megan from "../../assets/megan.png";
import cameron from "../../assets/cameron.png";

const Sidebar = ({ sidebar, category, setCategory }) => {
  /*
  useEffect(() => {
    const applyTheme = async () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format

      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const region = data.region;

        const southIndiaStates = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];

        if (
          (hours === 10 || hours === 11 || (hours === 12 && minutes === 0)) &&
          ampm === "AM" &&
          southIndiaStates.includes(region)
        ) {
          document.body.classList.remove("dark-theme");
          document.body.classList.add("white-theme");
        } else {
          document.body.classList.remove("white-theme");
          document.body.classList.add("dark-theme");
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
        document.body.classList.add("dark-theme"); // Default to dark theme on error
      }
    };

    applyTheme();
  }, []);
  */
  useEffect(() => {
    const applyTheme = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert to 12-hour format
  
      // Apply white theme between 10:00 AM and 11:59 AM
      if (hours >= 10 && hours < 12 && ampm === "AM") {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("white-theme");
      } else {
        document.body.classList.remove("white-theme");
        document.body.classList.add("dark-theme");
      }
    };
  
    applyTheme();
  }, []);
  return (
    <>
      <style>
        {`
          :root {
              --background-color: #fff;
              --text-color: #000;
          }

          .dark-theme {
              --background-color: #181818;
              --text-color: #fff;
          }

          .white-theme {
              --background-color: #ffffff;
              --text-color: #000000;
          }

          .sidebar {
              background: var(--background-color);
              color: var(--text-color);
              width: 15%;
              height: 100vh;
              position: fixed;
              top: 0;
              padding-left: 2%;
              padding-top: 80px;
              transition: background 0.3s ease, color 0.3s ease;
          }
        `}
      </style>
      <div className={`sidebar ${sidebar ? "" : "small-sidebar"}`}>
        <div className="shortcut-links">
          <div onClick={() => setCategory(0)} className={`side-link ${category === 0 ? "active" : ""}`}>
            <img src={home} alt="" />
            <p>Home</p>
          </div>
          <div onClick={() => setCategory(20)} className={`side-link ${category === 20 ? "active" : ""}`}>
            <img src={game_icon} alt="" />
            <p>Gaming</p>
          </div>
          <div onClick={() => setCategory(2)} className={`side-link ${category === 2 ? "active" : ""}`}>
            <img src={automobiles} alt="" />
            <p>Automobiles</p>
          </div>
          <div onClick={() => setCategory(17)} className={`side-link ${category === 17 ? "active" : ""}`}>
            <img src={sports} alt="" />
            <p>Sports</p>
          </div>
          <div onClick={() => setCategory(24)} className={`side-link ${category === 24 ? "active" : ""}`}>
            <img src={entertainment} alt="" />
            <p>Entertainment</p>
          </div>
          <div onClick={() => setCategory(28)} className={`side-link ${category === 28 ? "active" : ""}`}>
            <img src={tech} alt="" />
            <p>Technology</p>
          </div>
          <div onClick={() => setCategory(10)} className={`side-link ${category === 10 ? "active" : ""}`}>
            <img src={music} alt="" />
            <p>Music</p>
          </div>
          <div onClick={() => setCategory(22)} className={`side-link ${category === 22 ? "active" : ""}`}>
            <img src={blogs} alt="" />
            <p>Blogs</p>
          </div>
          
          <div onClick={() => { setCategory("group") }} className={`side-link ${category === "group" ? "active" : ""}`}>
               <img src={home} alt="" /> {/* Optional: Use a different icon for "Group" */}
                  <p>Group</p>
          </div>
          <hr />
        </div>
        <div className="subscribed-list">
          <h3>SUBSCRIBED</h3>
          <div className="side-link">
            <img src={jack} alt="" />
            <p>PewDiePie</p>
          </div>
          <div className="side-link">
            <img src={simon} alt="" />
            <p>MrBeast</p>
          </div>
          <div className="side-link">
            <img src={tom} alt="" />
            <p>Justin Bieber</p>
          </div>
          <div className="side-link">
            <img src={megan} alt="" />
            <p>5-Minute Crafts</p>
          </div>
          <div className="side-link">
            <img src={cameron} alt="" />
            <p>Nas Daily</p>
          </div>
        </div>
        </div>
      
    </>
  );
};

export default Sidebar;
