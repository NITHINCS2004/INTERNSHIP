/*

import React, { useState, useEffect } from "react";

const Group = () => {
    const [groupname, setGroupname] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [action, setAction] = useState(""); // 'create', 'join', 'invite'
    const [groups, setGroups] = useState([]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    useEffect(() => {
        const loadGroups = () => {
            const storedGroups = JSON.parse(sessionStorage.getItem("groups")) || [];
            setGroups(storedGroups);
        };

        loadGroups();

        // Listen for sessionStorage changes
        window.addEventListener("storage", loadGroups);
        return () => window.removeEventListener("storage", loadGroups);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (action === 'create') {
            const existingGroup = groups.find(group => group.groupname === groupname && group.email === email);
            if (existingGroup) {
                alert("You have already created this group.");
                return;
            }

            const newGroup = { groupname, description, email };
            const updatedGroups = [...groups, newGroup];
            sessionStorage.setItem("groups", JSON.stringify(updatedGroups));
            setGroups(updatedGroups);
            alert("Group created successfully!");
        } else if (action === 'join') {
            const alreadyJoined = groups.some(group => group.groupname === selectedGroup && group.email === email);
            if (alreadyJoined) {
                alert(`You have already joined the group: ${selectedGroup}`);
                return;
            }
            alert(`Successfully joined group: ${selectedGroup}`);
        }
    };

    const handleInvite = () => {
        if (inviteEmail.trim() && selectedGroup) {
            const subject = encodeURIComponent("Group Invitation");
            const body = encodeURIComponent(`You have been invited to join the group: ${selectedGroup}`);
            window.location.href = `mailto:${inviteEmail.trim()}?subject=${subject}&body=${body}`;
            alert(`Invitation sent to ${inviteEmail.trim()}`);
        } else {
            alert("Please enter an email and select a group.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center' }}>Select an Option</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAction('create')}>Create Group</button>
                <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAction('join')}>Join Existing Group</button>
                <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAction('invite')}>Invite to Group</button>
            </div>

            {action && action !== 'invite' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    {action === 'create' ? (
                        <>
                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Group Name:</label>
                            <input type="text" value={groupname} onChange={(e) => setGroupname(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />

                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Group Description:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />

                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                autoComplete="email"
                                style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} 
                            />

                            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>Create Group</button>
                        </>
                    ) : (
                        <>
                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Select Group:</label>
                            <select onChange={(e) => setSelectedGroup(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <option value="">Select a group</option>
                                {groups.map((group, index) => (
                                    <option key={index} value={group.groupname}>{group.groupname}</option>
                                ))}
                            </select>

                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                autoComplete="email"
                                style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} 
                            />

                            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>Join Group</button>
                        </>
                    )}
                </form>
            )}

            {action === 'invite' && (
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
                    <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Enter Email:</label>
                    <input 
                        type="email" 
                        value={inviteEmail} 
                        onChange={(e) => setInviteEmail(e.target.value)} 
                        required 
                        autoComplete="email"
                        style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} 
                    />

                    <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Select Group:</label>
                    <select onChange={(e) => setSelectedGroup(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <option value="">Select a group</option>
                        {groups.map((group, index) => (
                            <option key={index} value={group.groupname}>{group.groupname}</option>
                        ))}
                    </select>

                    <button onClick={handleInvite} style={{ padding: '10px', background: '#ffc107', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>Send Invitation</button>
                </div>
            )}
        </div>
    );
};

export default Group;

*//*
import React, { useState, useEffect } from "react";

const Group = () => {
    const [groupname, setGroupname] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [action, setAction] = useState(""); // 'create', 'join', 'invite'
    const [groups, setGroups] = useState([]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    useEffect(() => {
        const loadGroups = () => {
            const storedGroups = JSON.parse(sessionStorage.getItem("groups")) || [];
            setGroups(storedGroups);
        };

        loadGroups();

        // Listen for sessionStorage changes
        window.addEventListener("storage", loadGroups);
        return () => window.removeEventListener("storage", loadGroups);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (action === 'create') {
            const existingGroup = groups.find(group => group.groupname === groupname && group.email === email);
            if (existingGroup) {
                alert("You have already created this group.");
                return;
            }

            const newGroup = { groupname, description, email, members: [email] };
            const updatedGroups = [...groups, newGroup];
            sessionStorage.setItem("groups", JSON.stringify(updatedGroups));
            setGroups(updatedGroups);
            alert("Group created successfully!");
        } else if (action === 'join') {
            const groupToJoin = groups.find(group => group.groupname === selectedGroup);
            if (!groupToJoin) {
                alert("Group not found.");
                return;
            }

            if (groupToJoin.members.includes(email)) {
                alert("You have already joined this group.");
                return;
            }

            groupToJoin.members.push(email);
            sessionStorage.setItem("groups", JSON.stringify(groups));
            alert(`Successfully joined group: ${selectedGroup}`);
        }
    };

    const handleInvite = () => {
        if (inviteEmail.trim() && selectedGroup) {
            const subject = encodeURIComponent("Group Invitation");
            const body = encodeURIComponent(`You have been invited to join the group: ${selectedGroup}`);
            window.location.href = `mailto:${inviteEmail.trim()}?subject=${subject}&body=${body}`;
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center' }}>Select an Option</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAction('create')}>Create Group</button>
                <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAction('join')}>Join Existing Group</button>
                <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAction('invite')}>Invite to Group</button>
            </div>

            {action && action !== 'invite' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    {action === 'create' ? (
                        <>
                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Group Name:</label>
                            <input type="text" value={groupname} onChange={(e) => setGroupname(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />

                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Group Description:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />

                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                autoComplete="email"
                                style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} 
                            />

                            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>Create Group</button>
                        </>
                    ) : (
                        <>
                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Select Group:</label>
                            <select onChange={(e) => setSelectedGroup(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <option value="">Select a group</option>
                                {groups.map((group, index) => (
                                    <option key={index} value={group.groupname}>{group.groupname}</option>
                                ))}
                            </select>

                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                autoComplete="email"
                                style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} 
                            />

                            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>Join Group</button>
                        </>
                    )}
                </form>
            )}
        </div>
    );
};

export default Group;
*/
/*
import React, { useState, useEffect } from "react";

const Group = () => {
    const [groupname, setGroupname] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [action, setAction] = useState(""); // 'create', 'join', 'invite'
    const [groups, setGroups] = useState([]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    useEffect(() => {
        const loadGroups = () => {
            const storedGroups = JSON.parse(sessionStorage.getItem("groups")) || [];
            setGroups(storedGroups);
        };

        loadGroups();

        window.addEventListener("storage", loadGroups);
        return () => window.removeEventListener("storage", loadGroups);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (action === 'create') {
            const existingGroup = groups.find(group => group.groupname === groupname && group.email === email);
            if (existingGroup) {
                alert("You have already created this group.");
                return;
            }

            const newGroup = { groupname, description, email, members: [email] };
            const updatedGroups = [...groups, newGroup];
            sessionStorage.setItem("groups", JSON.stringify(updatedGroups));
            setGroups(updatedGroups);
            alert("Group created successfully!");
        } else if (action === 'join') {
            const groupToJoin = groups.find(group => group.groupname === selectedGroup);
            if (!groupToJoin) {
                alert("Group not found.");
                return;
            }

            if (groupToJoin.members.includes(email)) {
                alert(`You have already joined the group: ${selectedGroup}`);
                return;
            }

            groupToJoin.members.push(email);
            const updatedGroups = groups.map(group => 
                group.groupname === selectedGroup ? groupToJoin : group
            );

            sessionStorage.setItem("groups", JSON.stringify(updatedGroups));
            setGroups(updatedGroups);
            alert(`Successfully joined group: ${selectedGroup}`);
        }
    };

    const handleInvite = () => {
        if (inviteEmail.trim() && selectedGroup) {
            const subject = encodeURIComponent("Group Invitation");
            const body = encodeURIComponent(`You have been invited to join the group: ${selectedGroup}`);
            window.location.href = `mailto:${inviteEmail.trim()}?subject=${subject}&body=${body}`;
        } else {
            alert("Please enter an email and select a group.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <h2 style={{ textAlign: 'center' }}>Select an Option</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAction('create')}>Create Group</button>
                <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAction('join')}>Join Existing Group</button>
                <button style={{ padding: '10px', background: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={() => setAction('invite')}>Invite to Group</button>
            </div>

            {action && action !== 'invite' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    {action === 'create' ? (
                        <>
                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Group Name:</label>
                            <input type="text" value={groupname} onChange={(e) => setGroupname(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />

                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Group Description:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />

                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                autoComplete="email"
                                style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} 
                            />

                            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>Create Group</button>
                        </>
                    ) : (
                        <>
                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Select Group:</label>
                            <select onChange={(e) => setSelectedGroup(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                                <option value="">Select a group</option>
                                {groups.map((group, index) => (
                                    <option key={index} value={group.groupname}>{group.groupname}</option>
                                ))}
                            </select>

                            <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                autoComplete="email"
                                style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} 
                            />

                            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>Join Group</button>
                        </>
                    )}
                </form>
            )}

            {action === 'invite' && (
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
                    <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Enter Email:</label>
                    <input 
                        type="email" 
                        value={inviteEmail} 
                        onChange={(e) => setInviteEmail(e.target.value)} 
                        required 
                        autoComplete="email"
                        style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} 
                    />

                    <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Select Group:</label>
                    <select onChange={(e) => setSelectedGroup(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <option value="">Select a group</option>
                        {groups.map((group, index) => (
                            <option key={index} value={group.groupname}>{group.groupname}</option>
                        ))}
                    </select>

                    <button onClick={handleInvite} style={{ padding: '10px', background: '#ffc107', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>Send Invitation</button>
                </div>
            )}
        </div>
    );
};

export default Group;
*/
import React, { useState, useEffect } from "react";

const Group = () => {
    const [groupname, setGroupname] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [action, setAction] = useState(""); // 'create', 'join', 'invite'
    const [groups, setGroups] = useState([]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    // Theme state
    const [currentTheme, setCurrentTheme] = useState("light");

    // Theme logic
    useEffect(() => {
        const applyTheme = () => {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            let ampm = hours >= 12 ? "PM" : "AM";
            hours = hours % 12 || 12; // Convert to 12-hour format

            // Apply white theme between 10:00 AM and 11:59 AM
            if (hours >= 10 && hours < 12 && ampm === "AM") {
                setCurrentTheme("light");
            } else {
                setCurrentTheme("dark");
            }
        };

        applyTheme();

        // Optionally, you can set an interval to check the time every minute
        const interval = setInterval(applyTheme, 60000); // Check every minute

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, []);

    // Load groups from sessionStorage
    useEffect(() => {
        const loadGroups = () => {
            const storedGroups = JSON.parse(sessionStorage.getItem("groups")) || [];
            setGroups(storedGroups);
        };

        loadGroups();

        window.addEventListener("storage", loadGroups);
        return () => window.removeEventListener("storage", loadGroups);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (action === 'create') {
            const existingGroup = groups.find(group => group.groupname === groupname && group.email === email);
            if (existingGroup) {
                alert("You have already created this group.");
                return;
            }

            const newGroup = { groupname, description, email, members: [email] };
            const updatedGroups = [...groups, newGroup];
            sessionStorage.setItem("groups", JSON.stringify(updatedGroups));
            setGroups(updatedGroups);
            alert("Group created successfully!");
        } else if (action === 'join') {
            const groupToJoin = groups.find(group => group.groupname === selectedGroup);
            if (!groupToJoin) {
                alert("Group not found.");
                return;
            }

            if (groupToJoin.members.includes(email)) {
                alert(`You have already joined the group: ${selectedGroup}`);
                return;
            }

            groupToJoin.members.push(email);
            const updatedGroups = groups.map(group => 
                group.groupname === selectedGroup ? groupToJoin : group
            );

            sessionStorage.setItem("groups", JSON.stringify(updatedGroups));
            setGroups(updatedGroups);
            alert(`Successfully joined group: ${selectedGroup}`);
        }
    };

    const handleInvite = () => {
        if (inviteEmail.trim() && selectedGroup) {
            const subject = encodeURIComponent("Group Invitation");
            const body = encodeURIComponent(`You have been invited to join the group: ${selectedGroup}`);
            window.location.href = `mailto:${inviteEmail.trim()}?subject=${subject}&body=${body}`;
        } else {
            alert("Please enter an email and select a group.");
        }
    };

    // Theme-based styles
    const themeStyles = {
        backgroundColor: currentTheme === 'dark' ? '#333' : '#f9f9f9',
        color: currentTheme === 'dark' ? '#fff' : '#000',
    };

    const buttonStyles = {
        backgroundColor: currentTheme === 'dark' ? '#007bff' : '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        padding: '10px',
        cursor: 'pointer',
    };

    const inputStyles = {
        backgroundColor: currentTheme === 'dark' ? '#444' : '#fff',
        color: currentTheme === 'dark' ? '#fff' : '#000',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        marginTop: '5px',
    };

    return (
        <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', ...themeStyles }}>
            <h2 style={{ textAlign: 'center', color: currentTheme === 'dark' ? '#fff' : '#000' }}>Select an Option</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                <button style={buttonStyles} onClick={() => setAction('create')}>Create Group</button>
                <button style={buttonStyles} onClick={() => setAction('join')}>Join Existing Group</button>
                <button style={buttonStyles} onClick={() => setAction('invite')}>Invite to Group</button>
            </div>

            {action && action !== 'invite' && (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
                    {action === 'create' ? (
                        <>
                            <label style={{ marginTop: '10px', fontWeight: 'bold', color: currentTheme === 'dark' ? '#fff' : '#000' }}>Group Name:</label>
                            <input type="text" value={groupname} onChange={(e) => setGroupname(e.target.value)} required style={inputStyles} />

                            <label style={{ marginTop: '10px', fontWeight: 'bold', color: currentTheme === 'dark' ? '#fff' : '#000' }}>Group Description:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={inputStyles} />

                            <label style={{ marginTop: '10px', fontWeight: 'bold', color: currentTheme === 'dark' ? '#fff' : '#000' }}>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                autoComplete="email"
                                style={inputStyles} 
                            />

                            <button type="submit" style={{ ...buttonStyles, backgroundColor: '#28a745', marginTop: '10px' }}>Create Group</button>
                        </>
                    ) : (
                        <>
                            <label style={{ marginTop: '10px', fontWeight: 'bold', color: currentTheme === 'dark' ? '#fff' : '#000' }}>Select Group:</label>
                            <select onChange={(e) => setSelectedGroup(e.target.value)} required style={inputStyles}>
                                <option value="">Select a group</option>
                                {groups.map((group, index) => (
                                    <option key={index} value={group.groupname}>{group.groupname}</option>
                                ))}
                            </select>

                            <label style={{ marginTop: '10px', fontWeight: 'bold', color: currentTheme === 'dark' ? '#fff' : '#000' }}>Email:</label>
                            <input 
                                type="email" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                autoComplete="email"
                                style={inputStyles} 
                            />

                            <button type="submit" style={{ ...buttonStyles, backgroundColor: '#28a745', marginTop: '10px' }}>Join Group</button>
                        </>
                    )}
                </form>
            )}

            {action === 'invite' && (
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
                    <label style={{ marginTop: '10px', fontWeight: 'bold', color: currentTheme === 'dark' ? '#fff' : '#000' }}>Enter Email:</label>
                    <input 
                        type="email" 
                        value={inviteEmail} 
                        onChange={(e) => setInviteEmail(e.target.value)} 
                        required 
                        autoComplete="email"
                        style={inputStyles} 
                    />

                    <label style={{ marginTop: '10px', fontWeight: 'bold', color: currentTheme === 'dark' ? '#fff' : '#000' }}>Select Group:</label>
                    <select onChange={(e) => setSelectedGroup(e.target.value)} required style={inputStyles}>
                        <option value="">Select a group</option>
                        {groups.map((group, index) => (
                            <option key={index} value={group.groupname}>{group.groupname}</option>
                        ))}
                    </select>

                    <button onClick={handleInvite} style={{ ...buttonStyles, backgroundColor: '#ffc107', marginTop: '10px' }}>Send Invitation</button>
                </div>
            )}
        </div>
    );
};

export default Group;