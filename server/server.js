import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcryptjs from "bcryptjs";

const port = 5000;
const uri = "mongodb+srv://Halogen:Halogen@cluster0.kfxar8l.mongodb.net/?retryWrites=true&w=majority";

const app = express();

app.use(cors());
app.use(express.json());
mongoose.connect(uri);
const db = mongoose.connection;
db.on("Error", (e) => console.error(e));
db.once("open", () => console.log("Connected to Database"));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
    try {
        const hashpassword = bcryptjs.hashSync(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashpassword
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        console.error("Error during registration: ", error);
        res.status(500).json({ message: "Server Error" });
    }
})

app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        const isPasswordValid = bcryptjs.compareSync(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: "Invalid " });
        }
        return res.status(200).json({
            message: "Login successful",
            user: {
                name: user.name,
                email: user.email,
            },
        });
    } catch (error) {
        console.error("Error during login: ", error);
        res.status(500).json({ message: "Server Error" });
    }
});

app.listen(port);