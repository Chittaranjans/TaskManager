"use client";
import { useGlobalState } from '@/app/context/GlobalProvider';
import React from 'react'
import styled from 'styled-components';

interface Props {
    content: React.ReactNode,
}

function Modal({ content }: Props) {
    const { closeModal, theme } = useGlobalState();

    return (
        <ModalStyled theme={theme}>
            <div onClick={closeModal} className="modal-overlay"></div>
            <div className="modal-content">
                {content}
            </div>
        </ModalStyled>
    )
}

const ModalStyled = styled.div` 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;

    display: flex;
    justify-content: center;
    align-items: center;

    .modal-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        filter: blur(4px);
    }
    .modal-content {
        position: relative;
        padding: 1.5rem;
        max-width: 450px;
        width: 100%;
        max-height: 80vh;
        height: 100%;
        overflow-y: auto;
        z-index: 101;

        box-shadow: 0 0 1rem rgba(0, 0, 0, 0.3);
        border-radius: 1rem;
        background-color: ${props => props.theme.colorBg2};
    }
`

export default Modal
