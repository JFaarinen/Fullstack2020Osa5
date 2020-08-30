import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ type, message }) => {
    if (message === null) {
        return null;
    } else {
        return (
            <div className={type}>{message}</div>
        );
    }
};

Message.propTypes = {
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default Message;