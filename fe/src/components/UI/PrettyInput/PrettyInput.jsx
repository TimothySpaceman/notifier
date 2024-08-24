import React from 'react';
import cl from './PrettyInput.module.css'
    const PrettyInput = ({children, value, onChange, ...props}) => {
    return (
        <input
            {...props}
            onChange={onChange}
            type={'text'}
            value={value}
            className={cl.prettyInput }/>
    );
};

export default PrettyInput;