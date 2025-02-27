/*import React, { useEffect, useState } from 'react'
import './PlayVideo.css'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const PlayVideo = ({ videoId }) => {

    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    const fetchVideoData = async () => {

        // Fetching Video Data
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=${videoId}`;
        await fetch(videoDetails_url).then(res => res.json()).then(data => setApiData(data.items[0]));
    }

    const fetchOtherData = async () => {

        // Fetching Channel Data
        const channelLogo_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelLogo_url).then(res => res.json()).then(data => setChannelData(data.items[0]));

        // Fetching Comment Data
        const videoComment_url = `https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&maxResults=50&key=${API_KEY}&videoId=${videoId}`;
        await fetch(videoComment_url).then(res => res.json()).then(data => setCommentData(data.items));

    }

    useEffect(() => {
        fetchVideoData();
        window.scrollTo(0, 0);
    }, [])

    useEffect(() => {
        fetchOtherData();
    }, [apiData])

    return (
        <div className="play-video">
            <iframe src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            
            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            <div className="play-video-info">
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : 1525} Views  &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "2 days ago"}</p>
                <div>
                    <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : 125}</span>
                    <span><img src={dislike} alt="" />2</span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>
            <hr />
            <div className="publisher">
                <img src={channelData ? value_converter(channelData.snippet.thumbnails.default.url) : ""} alt="" />
                <div>
                    
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button type="button">Subscribe</button>
            </div>
            <div className="vid-description">
                
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
                <hr />
               
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 130} Comments</h4>

                {commentData.map((item, index) => {
                    return (
                        <div key={index} className="comment">
                            <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                            <div>
                                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span></h3>
                                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                                <div className="comment-action">
                                    <img src={like} alt="" />
                                    <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                    <img src={dislike} alt="" />
                                </div>
                            </div>
                        </div>
                    )
                })}
                
            </div>

        </div>
    )
}

export default PlayVideo
*/
/*
import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const PlayVideo = ({ videoId }) => {
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);

    // Determine current time theme
    const currentHour = new Date().getHours();
    const isWhiteTheme = currentHour >= 10 && currentHour < 12;

    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=${videoId}`;
        await fetch(videoDetails_url)
            .then(res => res.json())
            .then(data => setApiData(data.items[0]));
    };

    const fetchOtherData = async () => {
        if (!apiData) return;
        const channelLogo_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        await fetch(channelLogo_url)
            .then(res => res.json())
            .then(data => setChannelData(data.items[0]));

        const videoComment_url = `https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&maxResults=50&key=${API_KEY}&videoId=${videoId}`;
        await fetch(videoComment_url)
            .then(res => res.json())
            .then(data => setCommentData(data.items));
    };

    useEffect(() => {
        fetchVideoData();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchOtherData();
    }, [apiData]);

    return (
        <div 
            className="play-video" 
            style={{
                backgroundColor: isWhiteTheme ? '#ffffff' : '#181818',
                color: isWhiteTheme ? '#000000' : '#ffffff'
            }}
        >
            <iframe 
                src={`https://www.youtube.com/embed/${videoId}?&autoplay=1`} 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            ></iframe>

            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>
            
            <div className="play-video-info">
                <p>
                    {apiData ? value_converter(apiData.statistics.viewCount) : 1525} Views &bull; 
                    {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "2 days ago"}
                </p>
                <div>
                    <span><img src={like} alt="" />{apiData ? value_converter(apiData.statistics.likeCount) : 125}</span>
                    <span><img src={dislike} alt="" />2</span>
                    <span><img src={share} alt="" />Share</span>
                    <span><img src={save} alt="" />Save</span>
                </div>
            </div>

            <hr style={{ backgroundColor: isWhiteTheme ? '#ccc' : '#333' }} />

            <div className="publisher">
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button type="button">Subscribe</button>
            </div>

            <div className="vid-description">
                <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Description Here"}</p>
                <hr style={{ backgroundColor: isWhiteTheme ? '#ccc' : '#333' }} />
                <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 130} Comments</h4>

                {commentData.map((item, index) => (
                    <div key={index} className="comment">
                        <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
                        <div>
                            <h3>{item.snippet.topLevelComment.snippet.authorDisplayName} 
                                <span> {moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                            </h3>
                            <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                            <div className="comment-action">
                                <img src={like} alt="" />
                                <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                                <img src={dislike} alt="" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlayVideo;

*/

import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const PlayVideo = ({ videoId }) => {
    const [apiData, setApiData] = useState(null);
    const [channelData, setChannelData] = useState(null);
    const [commentData, setCommentData] = useState([]);
    const [isPremium, setIsPremium] = useState(false);
    const [downloadDate, setDownloadDate] = useState(null);

    useEffect(() => {
        const storedPremium = localStorage.getItem("isPremium");
        const storedDate = localStorage.getItem("downloadDate");

        if (storedPremium === "true") setIsPremium(true);
        if (storedDate) setDownloadDate(storedDate);
    }, []);

    const fetchVideoData = async () => {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${API_KEY}&id=${videoId}`;
        const res = await fetch(videoDetails_url);
        const data = await res.json();
        setApiData(data.items[0]);
    };

    const fetchOtherData = async () => {
        if (!apiData) return;
        const channelLogo_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
        const channelRes = await fetch(channelLogo_url);
        const channelData = await channelRes.json();
        setChannelData(channelData.items[0]);

        const videoComment_url = `https://www.googleapis.com/youtube/v3/commentThreads?textFormat=plainText&part=snippet&maxResults=50&key=${API_KEY}&videoId=${videoId}`;
        const commentRes = await fetch(videoComment_url);
        const commentData = await commentRes.json();
        setCommentData(commentData.items);
    };

    useEffect(() => {
        fetchVideoData();
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        fetchOtherData();
    }, [apiData]);

    const handleDownload = () => {
        const today = new Date().toISOString().split('T')[0]; // Get current date (YYYY-MM-DD)

        if (!isPremium && downloadDate === today) {
            alert("You have already downloaded a video today. Please make a payment to download again.");
            return;
        }
        if (apiData) {
            const importantVideos = JSON.parse(localStorage.getItem("importantVideos")) || [];

            const videoDetails = {
                videoId: videoId,
                title: apiData.snippet.title,
                channel: apiData.snippet.channelTitle,
                thumbnail: apiData.snippet.thumbnails.default.url,
                dateSaved: today
            };

            importantVideos.push(videoDetails);
            localStorage.setItem("importantVideos", JSON.stringify(importantVideos));


            localStorage.setItem('downloadDate', today);
            setDownloadDate(today);
            alert("Video downloaded successfully!");
        };

        const loadRazorpayScript = () => {
            return new Promise((resolve) => {
                if (window.Razorpay) {
                    resolve(true);
                    return;
                }

                const script = document.createElement("script");
                script.src = "https://checkout.razorpay.com/v1/checkout.js";
                script.onload = () => resolve(true);
                script.onerror = () => resolve(false);
                document.body.appendChild(script);
            });
        };

        const handlePayment = async () => {
            const res = await loadRazorpayScript();

            if (!res) {
                alert("Failed to load Razorpay. Check your internet connection.");
                return;
            }

            const options = {
                key: "rzp_live_sDDQtMTi6CD1HY",
                amount: 100, // ₹1 in paise
                currency: "INR",
                name: "Your Business Name",
                description: "Payment for ₹1",
                image: "https://example.com/your_logo.png",
                handler: function (response) {
                    alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                    localStorage.setItem("isPremium", "true");
                    localStorage.setItem("downloadDate", new Date().toISOString().split('T')[0]); // Reset download limit
                    setIsPremium(true); // Updates UI without refresh
                    setDownloadDate(new Date().toISOString().split('T')[0]);
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        };

        return (
            <div className="play-video">
                <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>

                <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>

                <div className="play-video-info">
                    <p>{apiData ? value_converter(apiData.statistics.viewCount) : 1525} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "2 days ago"}</p>
                    <div>
                        <button
                            onClick={handleDownload}
                            style={{ backgroundColor: "#ff0000", cursor: "pointer", color: "#fff" }}
                        >
                            Download
                        </button>
                        {!isPremium && (
                            <button
                                onClick={handlePayment}
                                style={{ backgroundColor: "#00cc00", cursor: "pointer", color: "#fff" }}
                            >
                                Pay ₹1
                            </button>
                        )}
                        <span><img src={like} alt="like" />{apiData ? value_converter(apiData.statistics.likeCount) : 125}</span>
                        <span><img src={dislike} alt="dislike" />2</span>
                        <span><img src={share} alt="share" />Share</span>
                        <span><img src={save} alt="save" />Save</span>
                    </div>
                </div>

                <div className="publisher">
                    <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                    <div>
                        <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                        <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                    </div>
                    <button type="button">Subscribe</button>
                </div>


                <div className="comments">
                    <h4>Comments</h4>
                    {commentData.length > 0 ? (
                        commentData.map((comment, index) => (
                            <div key={index} className="comment">
                                <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="User" />
                                <div>
                                    <h5>{comment.snippet.topLevelComment.snippet.authorDisplayName}</h5>
                                    <p>{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No comments available.</p>
                    )}
                </div>
            </div>
        );
    };
}
    export default PlayVideo;
