import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Errormodal = ({message}) => {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{message}</Modal.Title>
            </Modal.Header>
        </Modal>
    );
};

Errormodal.propTypes = {
    message: PropTypes.string.isRequired
};

export default Errormodal;