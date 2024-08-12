import React from 'react';

// Button Component: A reusable button with optional styling and functionality.
const Button = ({ children, className, ...rest }) => {
    return (
        <button className={`btn ${className}`} {...rest}>
            {children}
        </button>
    );
};

export default Button;
