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
        if (action === 'join' || action === 'invite') {
            const fetchGroups = async () => {
                try {
                    const response = await fetch("http://localhost:8986/get-groups");
                    const data = await response.json();
                    setGroups(data);
                } catch (error) {
                    console.error("Error fetching groups:", error);
                    setMessage("Failed to fetch groups. Please try again.");
                }
            };
            fetchGroups();
        }
    }, [action]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let response;
            if (action === 'create') {
                response = await fetch("http://localhost:8986/create-group", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ groupname, description, email }),
                });
            } else if (action === 'join') {
                const groupId = e.target.groupId.value;
                response = await fetch("http://localhost:8986/join-group", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ groupId, email }),
                });
            }

            if (response.ok) {
                const result = await response.text();
                setMessage(result);
            } else {
                const error = await response.text();
                setMessage(error);
            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Failed to submit. Please try again.");
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Select an Option</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button onClick={() => setAction('create')} className="btn" style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease, transform 0.2s ease"
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}>Create Group
                </button>
                <button onClick={() => setAction('join')} className="btn" style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease, transform 0.2s ease"
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}>Join Existing Group
                </button>
                <button onClick={() => setAction('invite')} className="btn" style={{
                    backgroundColor: "#007bff",
                    color: "white",
                    padding: "10px 20px",
                    fontSize: "16px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s ease, transform 0.2s ease"
                }}
                    onMouseOver={(e) => e.target.style.backgroundColor = "#0056b3"}
                    onMouseOut={(e) => e.target.style.backgroundColor = "#007bff"}>Invite to Group
                </button>
            </div>

            {action && action !== 'invite' && (
                <form onSubmit={handleSubmit} className="group-form">
                    {action === 'create' ? (
                        <>

                            <label>Group Name:</label>
                            <input type="text" value={groupname} onChange={(e) => setGroupname(e.target.value)} required />

                            <label>Group Description (optional):</label>
                            <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <button type="submit">Create Group</button>
                        </>
                    ) : (
                        <>

                            <label>Select Group:</label>
                            <select name="groupId" required>
                                <option value="">Select a group</option>
                                {groups.map(group => (
                                    <option key={group._id} value={group._id}>{group.groupname}</option>
                                ))}
                            </select>

                            <label>Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                            <button type="submit">Join Group</button>
                        </>
                    )}
                    {message && <p className="message">{message}</p>}
                </form>
            )}

            {action === 'invite' && (
                <form
                    action="https://api.web3forms.com/submit"
                    method="POST"
                    className="invite-form"
                    style={{
                        maxWidth: "400px",
                        margin: "20px auto",
                        padding: "20px",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "10px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >


                    <input type="hidden" name="access_key" value="65d97e76-e2f6-4b60-96f5-3b85d65ed106" />

                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Enter Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        required
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            marginBottom: "15px",
                        }}
                    />

                    <label style={{ marginBottom: "5px", fontWeight: "bold" }}>Select Group:</label>
                    <select
                        name="groupname"
                        required
                        onChange={(e) => setSelectedGroup(e.target.value)}
                        style={{
                            padding: "10px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                            marginBottom: "15px",
                        }}
                    >
                        <option value="">Select a group</option>
                        {groups.map((group) => (
                            <option key={group._id} value={group.groupname}>
                                {group.groupname}
                            </option>
                        ))}
                    </select>

                    <input type="hidden" name="subject" value="Group Invitation" />
                {/*  <input type="hidden" name="message" value={You have been invited to join the group:${selectedGroup}} />*/}

                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            padding: "10px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        Send Invitation
                    </button>
                </form>
            )}
        </div>
    );
};

export default Group;