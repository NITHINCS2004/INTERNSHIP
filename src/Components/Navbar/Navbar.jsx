/*import React from 'react'
import './Navbar.css'
import menu_icon from '../../assets/menu.png'
import logo from '../../assets/logo.png'
import search_icon from '../../assets/search.png'
import upload_icon from '../../assets/upload.png'
import more_icon from '../../assets/more.png'
import notification_icon from '../../assets/notification.png'
import jack_img from '../../assets/jack.png'
import { Link } from 'react-router-dom'

const Navbar = ({ setSidebar }) => {

    const sidebar_toggle = (e) => {
        setSidebar((prev) => prev === false ? true : false);
    }

    return (
        <nav className='flex-div'>
            <div className="nav-left flex-div">
                <img src={menu_icon} alt="" className="menu-icon" onClick={sidebar_toggle} />
                <Link to='/'> <img src={logo} alt="" className="logo" /></Link>
            </div>
            <div className="nav-middle flex-div">
                <div className="search-box flex-div">
                    <input type="text" placeholder="Search" />
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="nav-right flex-div">
                <img src={upload_icon} alt="" />
                <img src={more_icon} alt="" />
                <img src={notification_icon} alt="" />
                <img src={jack_img} alt="" className="user-icon" />
            </div>
        </nav>
    )
}

export default Navbar
*/
/*
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import jack_img from '../../assets/jack.png';

const Navbar = ({ setSidebar }) => {
    const [theme, setTheme] = useState("dark");
    const [timePeriod, setTimePeriod] = useState("");

    useEffect(() => {
        const fetchLocationAndSetTheme = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                const data = await response.json();

                const statesSouthIndia = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];
                const userState = data.region;

                const currentHour = new Date().getHours();
                const isSouthIndia = statesSouthIndia.includes(userState);
                const isWhiteThemeTime = currentHour >= 10 && currentHour < 12;

                const newTheme = isSouthIndia && isWhiteThemeTime ? "light" : "dark";
                setTheme(newTheme);

                // ✅ Correct AM/PM logic
                setTimePeriod(currentHour >= 12 ? "PM" : "AM");

            } catch (error) {
                console.error("Error fetching location data:", error);
                setTheme("dark");
                setTimePeriod(new Date().getHours() >= 12 ? "PM" : "AM"); // Default fallback
            }
        };

        fetchLocationAndSetTheme();
    }, []);

    const sidebar_toggle = () => {
        setSidebar((prev) => !prev);
    };

    const navbarStyles = {
        padding: "10px 2%",
        justifyContent: "space-between",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        background: theme === "light" ? "#f8f9fa" : "#333",
        color: theme === "light" ? "#333" : "#f8f9fa",
        position: "sticky",
        top: "0",
        zIndex: "10",
        display: "flex",
        alignItems: "center"
    };

    const searchBoxStyles = {
        border: "1px solid #ccc",
        marginRight: "15px",
        padding: "8px 12px",
        borderRadius: "25px",
        display: "flex",
        alignItems: "center",
        background: theme === "light" ? "#fff" : "#444",
        color: theme === "light" ? "#000" : "#fff"
    };

    const inputStyles = {
        width: "400px",
        border: "0",
        outline: "0",
        background: "transparent",
        color: theme === "light" ? "#000" : "#fff"
    };

    const userIconStyles = {
        width: "35px",
        borderRadius: "50%",
        marginRight: "0"
    };

    const timeStyles = {
        marginLeft: "15px",
        fontWeight: "bold",
        color: timePeriod === "AM" ? "#007bff" : "#ff4500" // Blue for AM, Orange-Red for PM
    };

    return (
        <nav style={navbarStyles}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={menu_icon} alt="" style={{ width: "22px", marginRight: "25px", cursor: "pointer" }} onClick={sidebar_toggle} />
                <Link to='/'> <img src={logo} alt="" style={{ width: "130px" }} /></Link>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={searchBoxStyles}>
                    <input type="text" placeholder="Search" style={inputStyles} />
                    <img src={search_icon} alt="" style={{ width: "15px" }} />
                </div>
                <span style={timeStyles}>{timePeriod}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={upload_icon} alt="" style={{ width: "25px", marginRight: "25px" }} />
                <img src={more_icon} alt="" style={{ width: "25px", marginRight: "25px" }} />
                <img src={notification_icon} alt="" style={{ width: "25px", marginRight: "25px" }} />
                <img src={jack_img} alt="" style={userIconStyles} />
            </div>
        </nav>
    );
};

export default Navbar;
*/
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import menu_icon from '../../assets/menu.png';
import logo from '../../assets/logo.png';
import search_icon from '../../assets/search.png';
import upload_icon from '../../assets/upload.png';
import more_icon from '../../assets/more.png';
import notification_icon from '../../assets/notification.png';
import jack_img from '../../assets/jack.png';

const Navbar = ({ setSidebar }) => {
    const [theme, setTheme] = useState("dark");
    const [timePeriod, setTimePeriod] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [downloadedVideos, setDownloadedVideos] = useState([]);

    useEffect(() => {
        const fetchLocationAndSetTheme = async () => {
            try {
                const response = await fetch("https://ipapi.co/json/");
                const data = await response.json();

                const statesSouthIndia = ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana"];
                const userState = data.region;

                const currentHour = new Date().getHours();
                const isSouthIndia = statesSouthIndia.includes(userState);
                const isWhiteThemeTime = currentHour >= 10 && currentHour < 12;

                const newTheme = isSouthIndia && isWhiteThemeTime ? "light" : "dark";
                setTheme(newTheme);

                setTimePeriod(currentHour >= 12 ? "PM" : "AM");
            } catch (error) {
                console.error("Error fetching location data:", error);
                setTheme("dark");
                setTimePeriod(new Date().getHours() >= 12 ? "PM" : "AM");
            }
        };

        fetchLocationAndSetTheme();

        // Fetch downloaded videos from localStorage (Example data)
        const storedVideos = JSON.parse(localStorage.getItem("downloadedVideos")) || [
            { id: 1, title: "Sample Video 1", thumbnail: jack_img },
            { id: 2, title: "Sample Video 2", thumbnail: jack_img },
        ];
        setDownloadedVideos(storedVideos);
    }, []);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    const navbarStyles = {
        padding: "10px 2%",
        justifyContent: "space-between",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
        background: theme === "light" ? "#f8f9fa" : "#333",
        color: theme === "light" ? "#333" : "#f8f9fa",
        position: "sticky",
        top: "0",
        zIndex: "10",
        display: "flex",
        alignItems: "center"
    };

    const dropdownStyles = {
        position: "absolute",
        top: "50px",
        right: "10px",
        width: "250px",
        background: theme === "light" ? "#fff" : "#444",
        color: theme === "light" ? "#000" : "#fff",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        padding: "10px",
        display: showDropdown ? "block" : "none",
        maxHeight: "300px",
        overflowY: "auto"
    };

    const videoItemStyles = {
        display: "flex",
        alignItems: "center",
        padding: "8px",
        borderBottom: "1px solid #ccc",
    };

    const videoImageStyles = {
        width: "40px",
        height: "40px",
        borderRadius: "50%",
        marginRight: "10px"
    };

    const sidebar_toggle = () => {
        setSidebar((prev) => !prev);
    };

    return (
        <nav style={navbarStyles}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={menu_icon} alt="" style={{ width: "22px", marginRight: "25px", cursor: "pointer" }} onClick={sidebar_toggle} />
                <Link to='/'> <img src={logo} alt="" style={{ width: "130px" }} /></Link>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{
                    border: "1px solid #ccc",
                    marginRight: "15px",
                    padding: "8px 12px",
                    borderRadius: "25px",
                    display: "flex",
                    alignItems: "center",
                    background: theme === "light" ? "#fff" : "#444",
                    color: theme === "light" ? "#000" : "#fff"
                }}>
                    <input type="text" placeholder="Search" style={{
                        width: "400px",
                        border: "0",
                        outline: "0",
                        background: "transparent",
                        color: theme === "light" ? "#000" : "#fff"
                    }} />
                    <img src={search_icon} alt="" style={{ width: "15px" }} />
                </div>
                <span style={{ marginLeft: "15px", fontWeight: "bold", color: timePeriod === "AM" ? "#007bff" : "#ff4500" }}>{timePeriod}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                <img src={upload_icon} alt="" style={{ width: "25px", marginRight: "25px" }} />
                <img src={more_icon} alt="" style={{ width: "25px", marginRight: "25px" }} />
                <img src={notification_icon} alt="" style={{ width: "25px", marginRight: "25px" }} />

                {/* Profile Image & Dropdown */}
                <img src={jack_img} alt="Profile" style={{ width: "35px", borderRadius: "50%", cursor: "pointer" }} onClick={toggleDropdown} />

                {/* Dropdown List */}
                <div style={dropdownStyles}>
                    <h4>Downloaded Videos</h4>
                    {downloadedVideos.length > 0 ? (
                        downloadedVideos.map((video) => (
                            <div key={video.id} style={videoItemStyles}>
                                <img src={video.thumbnail} alt={video.title} style={videoImageStyles} />
                                <span>{video.title}</span>
                            </div>
                        ))
                    ) : (
                        <p>No downloads available</p>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
