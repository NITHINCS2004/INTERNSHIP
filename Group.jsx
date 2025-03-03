/*
import React, { useState, useEffect } from "react";
import './Group.css';

const Group = () => {
    const [groupname, setGroupname] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [action, setAction] = useState(""); // 'create', 'join', 'invite'
    const [groups, setGroups] = useState([]);
    const [inviteEmail, setInviteEmail] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    useEffect(() => {
        const storedGroups = JSON.parse(sessionStorage.getItem("groups")) || [];
        setGroups(storedGroups);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (action === 'create') {
            const newGroup = { groupname, description, email };
            const updatedGroups = [...groups, newGroup];
            sessionStorage.setItem("groups", JSON.stringify(updatedGroups));
            setGroups(updatedGroups);
            setMessage("Group created successfully!");
        } else if (action === 'join') {
            setMessage(`Successfully joined group: ${selectedGroup}`);
        }
    };

    const handleInvite = () => {
        if (inviteEmail && selectedGroup) {
            const subject = encodeURIComponent("Group Invitation");
            const body = encodeURIComponent(`You have been invited to join the group: ${selectedGroup}`);
            window.location.href = `mailto:${inviteEmail}?subject=${subject}&body=${body}`;
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center' }}>Select an Option</h2>
            <div className="button-group">
                <button onClick={() => setAction('create')}>Create Group</button>
                <button onClick={() => setAction('join')}>Join Existing Group</button>
                <button onClick={() => setAction('invite')}>Invite to Group</button>
            </div>

            {action && action !== 'invite' && (
                <form onSubmit={handleSubmit}>
                    {action === 'create' ? (
                        <>
                            <label>Group Name:</label>
                            <input type="text" value={groupname} onChange={(e) => setGroupname(e.target.value)} required />

                            <label>Group Description:</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <button type="submit">Create Group</button>
                        </>
                    ) : (
                        <>
                            <label>Select Group:</label>
                            <select onChange={(e) => setSelectedGroup(e.target.value)} required>
                                <option value="">Select a group</option>
                                {groups.map((group, index) => (
                                    <option key={index} value={group.groupname}>{group.groupname}</option>
                                ))}
                            </select>

                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <button type="submit">Join Group</button>
                        </>
                    )}
                    {message && <p>{message}</p>}
                </form>
            )}

            {action === 'invite' && (
                <div className="invite-form">
                    <label>Enter Email:</label>
                    <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required />

                    <label>Select Group:</label>
                    <select onChange={(e) => setSelectedGroup(e.target.value)} required>
                        <option value="">Select a group</option>
                        {groups.map((group, index) => (
                            <option key={index} value={group.groupname}>{group.groupname}</option>
                        ))}
                    </select>

                    <button onClick={handleInvite}>Send Invitation</button>
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

    useEffect(() => {
        const storedGroups = JSON.parse(sessionStorage.getItem("groups")) || [];
        setGroups(storedGroups);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (action === 'create') {
            const newGroup = { groupname, description, email };
            const updatedGroups = [...groups, newGroup];
            sessionStorage.setItem("groups", JSON.stringify(updatedGroups));
            setGroups(updatedGroups);
            alert("Group created successfully!");
        } else if (action === 'join') {
            alert(`Successfully joined group: ${selectedGroup}`);
        }
    };

    const handleInvite = () => {
        if (inviteEmail && selectedGroup) {
            const subject = encodeURIComponent("Group Invitation");
            const body = encodeURIComponent(`You have been invited to join the group: ${selectedGroup}`);
            window.location.href = `mailto:${inviteEmail}?subject=${subject}&body=${body}`;
            alert(`Invitation sent to ${inviteEmail}`);
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
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />

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
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />

                            <button type="submit" style={{ padding: '10px', background: '#28a745', color: 'white', border: 'none', borderRadius: '5px', marginTop: '10px', cursor: 'pointer' }}>Join Group</button>
                        </>
                    )}
                </form>
            )}

            {action === 'invite' && (
                <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px', margin: 'auto' }}>
                    <label style={{ marginTop: '10px', fontWeight: 'bold' }}>Enter Email:</label>
                    <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required style={{ padding: '10px', marginTop: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />

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
