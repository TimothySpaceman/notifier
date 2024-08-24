import express, {json} from "express";
import {createDB} from "./jsondb.js";
import path from 'path';
import {fileURLToPath} from 'url';
import {getMessaging} from "firebase-admin/messaging";
import cors from "cors";
import { createRequire } from "module";
import {initializeApp} from "firebase-admin/app";
const require = createRequire(import.meta.url);
const serviceAccount = require("../notifierps-1380a-firebase-adminsdk-2avs3-b374c56ed8.json");
const admin = require("firebase-admin");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(json());

const firebaseApp = initializeApp({
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyBg8cUs7HlCdPjys9mA1NMD-n446IzF_IQ",
    authDomain: "notifierps-1380a.firebaseapp.com",
    projectId: "notifierps-1380a",
    storageBucket: "notifierps-1380a.appspot.com",
    messagingSenderId: "320524792223",
    appId: "1:320524792223:web:e63aa897adb325cc574daa",
    measurementId: "G-J0N9EQF32S"
});
const messaging = getMessaging(firebaseApp);


const users = createDB(__dirname + "/../data/users.json");

app.get("/api/users", (req, res) => {
    res.json(users.findAll()).status(200);
})

app.post("/api/register-token", (req, res) => {
    const {token, username} = req.body;
    if (!token || !username) {
        res.json({message: "Body must contain token and username fields"}).status(400);
        return;
    }

    let user = users.findOneBy({username});

    if (!user) {
        user = {username, tokens: []};
    }

    if (user.tokens.filter(t => t === token).length !== 0) {
        res.json({message: "Token already registered"}).status(409);
        return;
    }

    user.tokens.push(token);
    users.save(user);
    res.json({message: "Token successfully registered"}).status(201);
})

app.post("/api/message", (req, res) => {
    const {message, from, to} = req.body
    if (!message || !from || !to) {
        res.json({message: "Body must contain message, from and to fields"}).status(400);
        return;
    }

    const toUser = users.findOneBy({username: to});
    if (!toUser) {
        res.json({message: "Unknown recipient"}).status(400);
        return;
    }

    const notification = {
        title: `From ${from}`,
        body: message
    };

    messaging.sendEachForMulticast({
        tokens: toUser.tokens,
        notification
    }).then(response => {
        res.json({response}).status(201);
    }).catch(error => {
        res.json({error}).status(500);
    })
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Notifier API listening on port ${port}`);
})