/*import React, { useEffect, useState } from 'react'
import './Feed.css'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const Feed = ({category}) => {

    const [data,setData] = useState([]);

    const fetchData = async ()=>{
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        await fetch(videoList_url).then((response)=>response.json()).then((data)=>setData(data.items))
    }

    useEffect(()=>{
        fetchData();
    },[category])

  return (
   <div className='feed'>
        {data.map((item,index)=>{
            return <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                         <p>{value_converter(item.statistics.viewCount)} Views &bull; 
                         {" "+moment(item.snippet.publishedAt).fromNow()}</p>
                     </Link>
        })} 
    </div>

 
  )
}

export default Feed
*/
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_KEY, value_converter } from "../../data";
import moment from "moment";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const fetchData = async () => {
      const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
      const response = await fetch(videoList_url);
      const result = await response.json();
      setData(result.items);
    };
    fetchData();

    // Get current hour in 12-hour format
    const now = new Date();
    const hours = now.getHours();
    const isAM = now.getHours() < 12; // AM or PM check

    // Apply Light theme only between 10 AM - 12 PM
    if (isAM && hours >= 10 && hours < 12) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [category]);

  return (
    <div
      className="feed"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gridColumnGap: "16px",
        gridRowGap: "30px",
        marginTop: "15px",
        backgroundColor: theme === "light" ? "#ffffff" : "#121212", // Feed section background
        color: theme === "light" ? "#000000" : "#ffffff", // Text color
        padding: "20px",
        transition: "all 0.3s ease",
      }}
    >
      {data.map((item, index) => (
        <Link
          key={index}
          to={`video/${item.snippet.categoryId}/${item.id}`}
          className="card"
          style={{
            backgroundColor: theme === "light" ? "#f9f9f9" : "#222222", // Card background
            color: theme === "light" ? "#000000" : "#ffffff", // Card text color
            padding: "10px",
            borderRadius: "8px",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt=""
            style={{
              width: "100%",
              borderRadius: "5px",
            }}
          />
          <h2 style={{ fontSize: "16px", fontWeight: "600" }}>
            {item.snippet.title}
          </h2>
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: theme === "light" ? "#555" : "#aaa",
            }}
          >
            {item.snippet.channelTitle}
          </h3>
          <p style={{ fontSize: "14px" }}>
            {value_converter(item.statistics.viewCount)} Views &bull;
            {" " + moment(item.snippet.publishedAt).fromNow()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Feed;
