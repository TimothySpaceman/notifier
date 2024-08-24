import React, {useEffect, useState} from 'react';
import './App.css';
import PrettyInput from "./components/UI/PrettyInput/PrettyInput";
import PrettyButton from "./components/UI/PrettyButton/PrettyButton";
import {getToken, onMessage} from "firebase/messaging";
import axios from "axios";
import {REGISTER_TOKEN_URL, SEND_MESSAGE_URL} from "./config";
import {messaging} from "./firebaseConfig"

function App() {
    const [user, setUser] = useState('');
    const [to, setTo] = useState('');
    const [message, setMessage] = useState('');
    const [isLogged, setIsLogged] = useState(false);
    const [granted, setGranted] = useState(Notification.permission === 'granted');

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(savedUser);
            setIsLogged(true);
        }

    }, []);

    onMessage(messaging, (payload)=>{
        alert(JSON.stringify(payload));
        console.log(payload);
    });

    function askPermission(){
        if (!("Notification" in window)) {
            console.log("Notifications not supported");
            return;
        }

        if (Notification.permission === 'granted') {
            setGranted(true)
        } else {
            window.Notification.requestPermission().then((permission) => {
                setGranted(permission === 'granted')
            })
        }
    }

    function logout() {
        localStorage.clear()
        setIsLogged(false);
    }

    async function login() {
        localStorage.setItem('user', user);
        setIsLogged(true);
        const token = await getToken(messaging, {
            vapidKey: "BC1dHaBKbOKktC3LKlFajt8ik5ggLXk10Zhj_arwv29hur8jN-ucbqCNAGRZEcdATzr_-pnAQdXR79kgUXJxtp0"
        });
        console.log(token)
        const response = await axios.post(REGISTER_TOKEN_URL, {username: user, token});
        console.log(response);
    }

    async function sendMessage() {
        const response = await axios.post(SEND_MESSAGE_URL, {from: user, to, message});
        console.log(response);
    }

    function testNotifications(){
        const notification = new Notification("Test Title");
    }

    return (
        <div className="App">
            <div className={"grandAccessLimit"}>
                <PrettyButton
                    onClick={askPermission}
                    disabled={granted}
                >
                    {granted ? "ACCESS GRANTED" : "GRAND ACCESS"}
                </PrettyButton>
                <PrettyButton
                    onClick={testNotifications}
                >
                    Test Notifications
                </PrettyButton>
            </div>
            <div className={"logIn"}>
                <div className={"inputLimit"}>
                    <PrettyInput
                        placeholder={"user"}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                        disabled={isLogged}
                    />
                </div>
                <div className={"buttonLimit"}>
                    <PrettyButton
                        onClick={login}
                        isLogged={isLogged}
                        disabled={isLogged}
                    >
                        login
                    </PrettyButton>

                    <PrettyButton
                        onClick={logout}
                        isNegative={true}
                    >
                        logout
                    </PrettyButton>
                </div>
            </div>
            <div className={"sendMessageArea"}>
                <div className={"inputLimit"}>
                    <PrettyInput
                        placeholder={"To"}
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                    />
                </div>
                <div className={"inputLimit"}>
                    <PrettyInput
                        placeholder={"Message"}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                </div>
                <div className={"buttonLimit"}>
                    <PrettyButton
                        onClick={sendMessage}
                    >
                        Send
                    </PrettyButton>
                </div>
            </div>
        </div>
    );
}

export default App;