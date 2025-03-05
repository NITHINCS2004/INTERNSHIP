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

        localStorage.setItem('downloadDate', today);
        setDownloadDate(today);

        // Store the video URL in local storage
        const downloadedVideos = JSON.parse(localStorage.getItem('downloadedVideos')) || [];
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        if (!downloadedVideos.includes(videoUrl)) {
            downloadedVideos.push(videoUrl);
            localStorage.setItem('downloadedVideos', JSON.stringify(downloadedVideos));
        }

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

export default PlayVideo;  
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
    const [isPremium, setIsPremium] = useState(false);
    const [downloadDate, setDownloadDate] = useState(null);
    const [freeDownloadUsed, setFreeDownloadUsed] = useState(false);

    useEffect(() => {
        const storedPremium = localStorage.getItem("isPremium");
        const storedDate = localStorage.getItem("downloadDate");
        const storedFreeUsed = localStorage.getItem("freeDownloadUsed");

        const today = new Date().toISOString().split('T')[0];

        if (storedPremium === "true" && storedDate === today) {
            setIsPremium(true);
        } else {
            setIsPremium(false);
            localStorage.removeItem("isPremium"); // Reset premium if it's a new day
        }

        if (storedDate === today) {
            setDownloadDate(today);
            setFreeDownloadUsed(storedFreeUsed === "true");
        } else {
            setDownloadDate(null);
            setFreeDownloadUsed(false);
            localStorage.removeItem("freeDownloadUsed"); // Reset free download flag
        }
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
        const today = new Date().toISOString().split('T')[0];

        if (!isPremium) {
            if (freeDownloadUsed) {
                alert("You have already downloaded a free video today. Please make a payment to download more.");
                return;
            }
            localStorage.setItem('freeDownloadUsed', "true");
            setFreeDownloadUsed(true);
        }

        localStorage.setItem('downloadDate', today);
        setDownloadDate(today);

        const downloadedVideos = JSON.parse(localStorage.getItem('downloadedVideos')) || [];
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        if (!downloadedVideos.includes(videoUrl)) {
            downloadedVideos.push(videoUrl);
            localStorage.setItem('downloadedVideos', JSON.stringify(downloadedVideos));
        }

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
                localStorage.setItem("downloadDate", new Date().toISOString().split('T')[0]);
                setIsPremium(true);
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

export default PlayVideo;

*/import React, { useEffect, useState } from 'react';
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
    const [freeDownloadUsed, setFreeDownloadUsed] = useState(false);

    // Theme state
    const [currentTheme, setCurrentTheme] = useState('light');

    useEffect(() => {
        const storedPremium = localStorage.getItem("isPremium");
        const storedDate = localStorage.getItem("downloadDate");
        const storedFreeUsed = localStorage.getItem("freeDownloadUsed");

        const today = new Date().toISOString().split('T')[0];

        if (storedPremium === "true" && storedDate === today) {
            setIsPremium(true);
        } else {
            setIsPremium(false);
            localStorage.removeItem("isPremium"); // Reset premium if it's a new day
        }

        if (storedDate === today) {
            setDownloadDate(today);
            setFreeDownloadUsed(storedFreeUsed === "true");
        } else {
            setDownloadDate(null);
            setFreeDownloadUsed(false);
            localStorage.removeItem("freeDownloadUsed"); // Reset free download flag
        }
    }, []);

    // Theme Logic
    useEffect(() => {
        const applyTheme = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12; // Convert to 12-hour format

            // Apply white theme between 10:00 AM and 11:59 AM
            if (hours >= 7 && hours < 12 && ampm === "AM") {
                document.body.classList.remove("dark-theme");
                document.body.classList.add("white-theme");
                setCurrentTheme('white');
            } else {
                document.body.classList.remove("white-theme");
                document.body.classList.add("dark-theme");
                setCurrentTheme('dark');
            }
        };

        applyTheme();

        // Optionally, you can set an interval to check the time every minute
        const interval = setInterval(applyTheme, 60000); // Check every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
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
        const today = new Date().toISOString().split('T')[0];

        if (!isPremium) {
            if (freeDownloadUsed) {
                alert("You have already downloaded a free video today. Please make a payment to download more.");
                return;
            }
            localStorage.setItem('freeDownloadUsed', "true");
            setFreeDownloadUsed(true);
        }

        localStorage.setItem('downloadDate', today);
        setDownloadDate(today);

        const downloadedVideos = JSON.parse(localStorage.getItem('downloadedVideos')) || [];
        const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;

        if (!downloadedVideos.includes(videoUrl)) {
            downloadedVideos.push(videoUrl);
            localStorage.setItem('downloadedVideos', JSON.stringify(downloadedVideos));
        }

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
                localStorage.setItem("downloadDate", new Date().toISOString().split('T')[0]);
                setIsPremium(true);
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

    // Inline styles based on theme
    const themeStyles = {
        backgroundColor: currentTheme === 'dark' ? '#181818' : '#ffffff',
        color: currentTheme === 'dark' ? '#fff' : '#000',
    };

    const buttonStyles = {
        backgroundColor: currentTheme === 'dark' ? '#cc0000' : '#ff0000',
        color: '#fff',
        cursor: 'pointer',
    };

    const paymentButtonStyles = {
        backgroundColor: '#00cc00',
        color: '#fff',
        cursor: 'pointer',
    };

    return (
        <div className="play-video" style={themeStyles}>
            <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>

            <h3>{apiData ? apiData.snippet.title : "Title Here"}</h3>

            <div className="play-video-info" style={themeStyles}>
                <p>{apiData ? value_converter(apiData.statistics.viewCount) : 1525} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : "2 days ago"}</p>
                <div>
                    <button
                        onClick={handleDownload}
                        style={buttonStyles}
                    >
                        Download
                    </button>
                    {!isPremium && (
                        <button
                            onClick={handlePayment}
                            style={paymentButtonStyles}
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

            <div className="publisher" style={themeStyles}>
                <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="" />
                <div>
                    <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
                    <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} Subscribers</span>
                </div>
                <button type="button" style={buttonStyles}>Subscribe</button>
            </div>

            <div className="comments" style={themeStyles}>
                <h4>Comments</h4>
                {commentData.length > 0 ? (
                    commentData.map((comment, index) => (
                        <div key={index} className="comment" style={themeStyles}>
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

export default PlayVideo;