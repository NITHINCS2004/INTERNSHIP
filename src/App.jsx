/*import React, { useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path="/" element={<Home  sidebar={sidebar} />} />
        <Route path="/video/:categoryId/:videoId" element={<Video />} />
      </Routes>
    </div>
  );
};

export default App;
*/

import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Video from "./Pages/Video/Video";
import Login from "./Pages/Login/Login"; // Import the Login component

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Set the user state
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div>
      
      {user && <Navbar setSidebar={setSidebar} />}

      <Routes>
        <Route path="/login" element={<Login />} />
        
        {user && (
          <>
            <Route path="/" element={<Home sidebar={sidebar} />} />
            <Route path="/video/:categoryId/:videoId" element={<Video />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;


