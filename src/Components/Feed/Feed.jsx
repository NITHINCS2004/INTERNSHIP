import React, { useEffect, useState } from 'react'
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

/*
import React, { useEffect, useState } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const Feed = ({ category }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        await fetch(videoList_url)
            .then((response) => response.json())
            .then((data) => setData(data.items));
    };

    useEffect(() => {
        fetchData();
        applyTheme();
    }, [category]);

    const applyTheme = () => {
        const now = new Date();
        let hours = now.getHours();
        let ampm = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12; // Convert to 12-hour format

        // Apply white theme only between 10:00 AM and 11:59 AM
        if (hours >= 10 && hours < 12 && ampm === "AM") {
            document.body.classList.remove("dark-theme");
            document.body.classList.add("white-theme");
        } else {
            document.body.classList.remove("white-theme");
            document.body.classList.add("dark-theme");
        }
    };

    return (
        <div className='feed'>
            {data.map((item, index) => {
                return (
                    <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
                        <img src={item.snippet.thumbnails.medium.url} alt="" />
                        <h2>{item.snippet.title}</h2>
                        <h3>{item.snippet.channelTitle}</h3>
                        <p>
                            {value_converter(item.statistics.viewCount)} Views &bull;
                            {" " + moment(item.snippet.publishedAt).fromNow()}
                        </p>
                    </Link>
                );
            })}
        </div>
    );
};

export default Feed;
*/
