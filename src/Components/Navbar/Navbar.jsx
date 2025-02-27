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
        const storedVideos = JSON.parse(localStorage.getItem("downloadedVideos")) || [];
        setDownloadedVideos(storedVideos);
    }, []);

    const sidebar_toggle = () => {
        setSidebar((prev) => !prev);
    };

    return (
        <nav style={{
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
        }}>
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
                <span style={{
                    marginLeft: "15px",
                    fontWeight: "bold",
                    color: timePeriod === "AM" ? "#007bff" : "#ff4500"
                }}>{timePeriod}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                <img src={upload_icon} alt="" style={{ width: "25px", marginRight: "25px" }} />
                <img src={more_icon} alt="" style={{ width: "25px", marginRight: "25px" }} />
                <img src={notification_icon} alt="" style={{ width: "25px", marginRight: "25px" }} />
                <img 
                    src={jack_img} 
                    alt="" 
                    style={{ width: "35px", borderRadius: "50%", cursor: "pointer" }} 
                    onClick={() => setShowDropdown((prev) => !prev)}
                />
                {showDropdown && (
                    <div style={{
                        position: "absolute",
                        top: "50px",
                        right: "0",
                        background: theme === "light" ? "#fff" : "#444",
                        color: theme === "light" ? "#000" : "#fff",
                        boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        padding: "10px",
                        width: "250px",
                        maxHeight: "300px",
                        overflowY: "auto",
                        zIndex: "20"
                    }}>
                        <h4 style={{ textAlign: "center", marginBottom: "10px" }}>Downloaded Videos</h4>
                        {downloadedVideos.length > 0 ? (
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {downloadedVideos.map((video, index) => (
                                    <li key={index} style={{ padding: "8px", borderBottom: "1px solid #ddd" }}>
                                        <a href={video} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: theme === "light" ? "#007bff" : "#ffa500" }}>
                                            Video {index + 1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ textAlign: "center" }}>No videos downloaded</p>
                        )}
                    </div>
                )}
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
    const [showSearch, setShowSearch] = useState(true);

    // Function to fetch and update downloaded videos
    const fetchDownloadedVideos = () => {
        const storedVideos = JSON.parse(localStorage.getItem("downloadedVideos")) || [];
        setDownloadedVideos(storedVideos);
    };

    useEffect(() => {
        // Fetch videos on load
        fetchDownloadedVideos();

        // Listen to storage changes (Works across tabs & auto-updates)
        const handleStorageChange = () => fetchDownloadedVideos();
        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

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

        // Resize event listener to hide search bar on small screens
        const handleResize = () => {
            setShowSearch(window.innerWidth > 600); // Hide if screen width <= 600px
        };

        window.addEventListener("resize", handleResize);
        handleResize(); // Set initial state

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const sidebar_toggle = () => {
        setSidebar((prev) => !prev);
    };

    return (
        <nav style={{
            padding: "8px 2%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
            background: theme === "light" ? "#f8f9fa" : "#333",
            color: theme === "light" ? "#333" : "#f8f9fa",
            position: "sticky",
            top: "0",
            zIndex: "1000",
            width: "100%",
            height: "60px"
        }}>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img src={menu_icon} alt="" style={{ width: "24px", marginRight: "15px", cursor: "pointer" }} onClick={sidebar_toggle} />
                <Link to='/'> <img src={logo} alt="" style={{ width: "120px" }} /></Link>
            </div>
            {showSearch && (
                <div style={{ display: "flex", alignItems: "center", flexGrow: "1", justifyContent: "center" }}>
                    <div style={{
                        border: "1px solid #ccc",
                        padding: "6px 12px",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        background: theme === "light" ? "#fff" : "#444",
                        color: theme === "light" ? "#000" : "#fff",
                        width: "50%"
                    }}>
                        <input type="text" placeholder="Search" style={{
                            width: "100%",
                            border: "none",
                            outline: "none",
                            background: "transparent",
                            color: theme === "light" ? "#000" : "#fff",
                            fontSize: "14px",
                            padding: "5px"
                        }} />
                        <img src={search_icon} alt="" style={{ width: "14px" }} />
                    </div>
                    <span style={{
                        marginLeft: "10px",
                        fontWeight: "bold",
                        fontSize: "14px",
                        color: timePeriod === "AM" ? "#007bff" : "#ff4500"
                    }}>{timePeriod}</span>
                </div>
            )}
            <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
                <img src={upload_icon} alt="" style={{ width: "24px", marginRight: "15px" }} />
                <img src={more_icon} alt="" style={{ width: "24px", marginRight: "15px" }} />
                <img src={notification_icon} alt="" style={{ width: "24px", marginRight: "15px" }} />
                <img 
                    src={jack_img} 
                    alt="" 
                    style={{ width: "36px", height: "36px", borderRadius: "50%", cursor: "pointer" }} 
                    onClick={() => setShowDropdown((prev) => !prev)}
                />
                {showDropdown && (
                    <div style={{
                        position: "absolute",
                        top: "50px",
                        right: "0",
                        background: theme === "light" ? "#fff" : "#444",
                        color: theme === "light" ? "#000" : "#fff",
                        boxShadow: "0 0 5px rgba(0, 0, 0, 0.2)",
                        borderRadius: "6px",
                        padding: "8px",
                        width: "200px",
                        maxHeight: "250px",
                        overflowY: "auto",
                        zIndex: "1001"
                    }}>
                        <h4 style={{ textAlign: "center", marginBottom: "8px", fontSize: "14px" }}>Downloaded Videos</h4>
                        {downloadedVideos.length > 0 ? (
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {downloadedVideos.map((video, index) => (
                                    <li key={index} style={{ padding: "6px", borderBottom: "1px solid #ddd", fontSize: "12px" }}>
                                        <a href={video} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: theme === "light" ? "#007bff" : "#ffa500" }}>
                                            Video {index + 1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ textAlign: "center", fontSize: "12px" }}>No videos downloaded</p>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
