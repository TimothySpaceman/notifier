import React from 'react';
import './PrettyButton.css';

const PrettyButton = ({children, onClick, isNegative = false, isLogged, ...props}) => {
    return (
        <button
            className={`${isLogged ? "greenButtonDisabled" : "prettyButtonGreen"} ${isNegative ? "prettyButtonRed" : ""}`}
            onClick={onClick}
            disabled={isLogged}
            {...props}
        >
            {isLogged ? 'SUCCESSFULLY LOGGED ' : children}
        </button>
    );
};

export default PrettyButton;
