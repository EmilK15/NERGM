import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const Errormsg = ({message}) => {
    const [show, setShow] = useState(true);

    if(show)
        return (
            <Alert dismissible variant="danger" onClose={() => setShow(false)}>
                <p>
                    {message}
                </p>
            </Alert>
        );
    else {
        return (
            <p></p>
        )
    }
};

Errormsg.propTypes = {
    message: PropTypes.string.isRequired
};

export default Errormsg;