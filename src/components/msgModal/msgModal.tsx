import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

interface IModal {
    msg: string,
    title: string,
    show: boolean
}
const MsgModal = ({ msg, title, show }: IModal) => {
    const [modal, setModal] = useState(show);
    const toggle = () => setModal(!modal);

    return (
        <div>
            <Modal
                isOpen={modal}
            >
                <ModalHeader toggle={toggle}>
                    {title}
                </ModalHeader>
                <ModalBody className='text-center'>
                    {msg}
                </ModalBody>
                <ModalFooter>
                    <Link to="/">
                        <Button
                            color="primary"
                        >
                            Agree
                        </Button>
                    </Link>
                </ModalFooter>
            </Modal>
        </div>

    );
}

export default MsgModal;