import React from 'react';

// Table Component: A reusable table component that can be styled with Bootstrap classes.
const Table = ({ children, className, ...rest }) => {
    return (
        <table className={`table ${className}`} {...rest}>
            {children}
        </table>
    );
};

export default Table;
