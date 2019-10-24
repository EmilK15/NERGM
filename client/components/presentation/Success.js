import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const Success = ({message}) => {
    const [show, setShow] = useState(true);

    if(show)
        return (
            <Alert dismissible variant="success" onClose={() => setShow(false)}>
                <p>
                    {message}
                </p>
            </Alert>
        );
    else {
        return (<p></p>)
    }
};

Success.propTypes = {
    message: PropTypes.string.isRequired
};

export default Success;