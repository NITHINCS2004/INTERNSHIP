import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const port = 8789; // Permanent port number

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/HostelManagement123', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Define Group schema
const groupSchema = new mongoose.Schema({
    groupname: { type: String, required: true, unique: true },
    description: { type: String },
    email: { type: String, required: true },
    email2: { type: String },
    email3: { type: String },
    email4: { type: String }
});

// Create Group model
const Group = mongoose.model('Group', groupSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Route to handle group creation form submissions
app.post('/create-group', async (req, res) => {
    const { groupname, description, email } = req.body;

    try {
        // Check if the group already exists
        const existingGroup = await Group.findOne({ groupname });
        if (existingGroup) {
            return res.status(400).send(`Group with name ${groupname} already exists.`);
        }

        // Create the new group
        const newGroup = new Group({ groupname, description, email });
        await newGroup.save();

        res.send(`Group ${groupname} created successfully!`);

    } catch (err) {
        res.status(500).send('Error creating group.');
    }
});

// Route to fetch all existing groups for joining
app.get('/get-groups', async (req, res) => {
    try {
        const groups = await Group.find();
        res.json(groups);
    } catch (err) {
        res.status(500).send('Error fetching groups.');
    }
});

// Route to handle joining an existing group
app.post('/join-group', async (req, res) => {
    const { groupId, email } = req.body;

    try {
        const group = await Group.findById(groupId);
        if (!group) {
            return res.status(404).send("Group not found.");
        }

        // Check available email slots and add the new user
        if (!group.email2) {
            group.email2 = email;
        } else if (!group.email3) {
            group.email3 = email;
        } else if (!group.email4) {
            group.email4 = email;
        } else {
            return res.status(400).send("The group is full.");
        }

        await group.save();
        res.send(`User with email ${email} has joined group ${group.groupname}.`);

    } catch (err) {
        res.status(500).send('Error joining group.');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
