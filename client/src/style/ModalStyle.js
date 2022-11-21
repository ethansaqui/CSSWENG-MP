import styles from 'styled-components';

const Modal = styles.div`
    font: 'Montserrat';
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    > .modalBackground {
        background-color: #5a0707;
        border-radius: 15px;
        height: 30rem;
        width: 35rem;
        overflow-y: auto;
    }
`

const ModalContent = styles.div`
    align-items: center;
    padding: 10px;
    color: white;
`

const ModalButton = styles.button`
    background-color: var(---tableprimary);
    color: white;
    border: none;
    border-radius: 34px;
    padding: 0.1rem 1rem;
    font-size: 0.8vw;
    width: -moz-fit-content;
    width: fit-content;
`

const CloseModal = styles.div`
    overflow: hidden;


    > button {
        background-color: #062437;
        color: white;
        position: relative;
        padding: 10px 10px;
        float: right;
        border: none;
        border-radius: 50%;
        font-size: 18px;
        font-weight: 900;
        width: 3rem
    }
`

export {ModalButton, CloseModal, Modal, ModalContent}