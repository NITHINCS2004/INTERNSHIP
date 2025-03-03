/*import React, { useState, useEffect } from "react";
import './Group.css';

const Group = () => {
    const [groupname, setGroupname] = useState("");
    const [description, setDescription] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [action, setAction] = useState("");
    const [groups, setGroups] = useState(() => JSON.parse(sessionStorage.getItem("groups")) || []);
    const [inviteEmail, setInviteEmail] = useState("");
    const [selectedGroup, setSelectedGroup] = useState("");

    useEffect(() => {
        sessionStorage.setItem("groups", JSON.stringify(groups));
    }, [groups]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (action === 'create') {
            const newGroup = { id: Date.now().toString(), groupname, description, email };
            setGroups([...groups, newGroup]);
            setMessage("Group created successfully!");
        } else if (action === 'join') {
            setMessage(`You have joined the group successfully!`);
        }
    };

    const handleInviteSubmit = (e) => {
        e.preventDefault();
        const invitations = JSON.parse(sessionStorage.getItem("invitations")) || [];
        invitations.push({ email: inviteEmail, group: selectedGroup });
        sessionStorage.setItem("invitations", JSON.stringify(invitations));
        setMessage("Invitation sent successfully!");
    };

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Select an Option</h2>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <button onClick={() => setAction('create')}>Create Group</button>
                <button onClick={() => setAction('join')}>Join Existing Group</button>
                <button onClick={() => setAction('invite')}>Invite to Group</button>
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
                                    <option key={group.id} value={group.id}>{group.groupname}</option>
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
                <form onSubmit={handleInviteSubmit} className="invite-form">
                    <label>Enter Email:</label>
                    <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} required />
                    <label>Select Group:</label>
                    <select required onChange={(e) => setSelectedGroup(e.target.value)}>
                        <option value="">Select a group</option>
                        {groups.map((group) => (
                            <option key={group.id} value={group.groupname}>{group.groupname}</option>
                        ))}
                    </select>
                    <button type="submit">Send Invitation</button>
                </form>
            )}
        </div>
    );
};

export default Group;
*/
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
