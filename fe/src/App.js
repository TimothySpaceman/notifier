import React, { useEffect, useState } from 'react';
import './App.css';
import PrettyInput from "./components/UI/PrettyInput/PrettyInput";
import PrettyButton from "./components/UI/PrettyButton/PrettyButton";

function App() {
    const [user, setUser] = useState('');
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(savedUser);
            setIsLogged(true);
        }
    }, []);

    function logout(){
        localStorage.clear()
        setIsLogged(false);
    }
    const handleSendClick = () => {
        console.log(user);
        localStorage.setItem('user', user);
        setIsLogged(true);
    };

    return (
        <div className="App">
            <div className={"grandAccessLimit"}>
                <PrettyButton>GRAND ACCESS</PrettyButton>
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
                        onClick={handleSendClick}
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
                    />
                </div>
                <div className={"inputLimit"}>
                    <PrettyInput
                        placeholder={"Message"}
                    />
                </div>
                <div className={"buttonLimit"}>
                    <PrettyButton
                        onClick={() => console.log("send onclick completed")}
                    >
                        send
                    </PrettyButton>
                </div>
            </div>
        </div>
    );
}

export default App;
