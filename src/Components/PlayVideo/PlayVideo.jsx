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
    const [downloaded, setDownloaded] = useState(false);

    useEffect(() => {
        fetchVideoData();
        window.scrollTo(0, 0);
        checkDownloadStatus();
    }, []);

    useEffect(() => {
        fetchOtherData();
    }, [apiData]);

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

    const checkDownloadStatus = () => {
        const lastDownload = localStorage.getItem('lastDownload');
        if (lastDownload) {
            const today = new Date().toISOString().split('T')[0];
            if (lastDownload === today) {
                setDownloaded(true);
            }
        }
    };

    const handleDownload = () => {
        if (downloaded && !isPremium) {
            alert("You have already downloaded a video today. Upgrade to premium for unlimited downloads.");
            return;
        }
        
        localStorage.setItem('lastDownload', new Date().toISOString().split('T')[0]);
        alert("Video downloaded successfully!");
        setDownloaded(true);
    };

    const handlePayment = () => {
        var options = {
            "key": "rzp_live_sDDQtMTi6CD1HY", // Replace with your Razorpay Key ID
            "amount": "100", // 1 Rupee = 100 paise
            "currency": "INR",
            "name": "Your Business Name",
            "description": "Payment for ₹1",
            "image": "https://example.com/your_logo.png",
            "order_id": "order_PzxRaHeJKi2wae", // Replace with actual Order ID
            "handler": function (response) {
                alert("Payment Successful! Payment ID: " + response.razorpay_payment_id);
                setIsPremium(true);
            },
            "prefill": {
                "name": "Test User",
                "email": "test@example.com",
                "contact": "9999999999"
            },
            "notes": {
                "address": "Your Business Address"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);
        rzp1.open();
    };

    return (
        <div className="play-video">
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
                    <button onClick={handleDownload} style={{ marginRight: "10px", padding: "5px 10px", cursor: "pointer" }}>Download</button>
                    {downloaded && !isPremium && (
                        <button onClick={handlePayment} style={{ padding: "5px 10px", cursor: "pointer", backgroundColor: "#3399cc", color: "#fff" }}>Pay & Go Premium</button>
                    )}
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
