import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import Feed from "../../Components/Feed/Feed";
import  Group from '../../../Group';
import './Home.css'

const Home = ({sidebar}) => {

  const [category,setCategory] = useState(0);
 
  
return (
  <>
    <Sidebar setCategory={setCategory} sidebar={sidebar} category={category} />
    <div className={`container ${sidebar ? "" : " large-container"}`}>
      {category === "group" ? (
        <Group />  // Render Group component when "Group" is selected
      ) : (
        <Feed category={category} />
      )}
    </div>
  </>
);
};

export default Home;
