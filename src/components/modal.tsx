'use client'

import type React from 'react'
import styled from 'styled-components'

// Define the props for the modal component
interface ModalProps {
  message: string
  isOpen: boolean
  onConfirm: () => void
  onCancel: () => void
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, rgba(0, 255, 255, 0.1) 0%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease;
  backdrop-filter: blur(4px);
`

const ModalContainer = styled.div`
  background: linear-gradient(135deg, #0a0e27 0%, #1a1a3e 100%);
  padding: 30px;
  border-radius: 12px;
  text-align: center;
  width: 350px;
  border: 2px solid #00ffff;
  box-shadow:
    0 0 20px rgba(0, 255, 255, 0.4),
    0 0 40px rgba(0, 255, 255, 0.2),
    inset 0 0 20px rgba(0, 255, 255, 0.05);
  animation:
    zoomIn 0.3s ease,
    pulseGlow 2s ease-in-out infinite;
`

const ModalTitle = styled.h4`
  font-size: 18px;
  color: #00ffff;
  font-weight: 600;
  margin-bottom: 20px;
  text-shadow:
    0 0 10px rgba(0, 255, 255, 0.8),
    0 0 20px rgba(0, 255, 255, 0.4);
  letter-spacing: 1.5px;
`

const ModalMessage = styled.p`
  font-size: 16px;
  color: #b0e0e6;
  margin-bottom: 25px;
  line-height: 1.6;
`

const ModalActions = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: 2px solid;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  letter-spacing: 0.5px;
  transition:
    all 0.3s ease,
    transform 0.2s;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 0 15px currentColor;
  }

  &:active {
    transform: translateY(-1px);
  }
`

const ConfirmButton = styled(Button)`
  background: linear-gradient(135deg, #ff1744 0%, #c41c3b 100%);
  color: white;
  border-color: #ff1744;
  box-shadow: 0 0 10px rgba(255, 23, 68, 0.3);

  &:hover {
    box-shadow:
      0 0 20px rgba(255, 23, 68, 0.6),
      0 0 30px rgba(255, 23, 68, 0.3);
    background: linear-gradient(135deg, #ff1744 0%, #ff5252 100%);
  }
`

const CancelButton = styled(Button)`
  background: linear-gradient(135deg, #00bfa5 0%, #00897b 100%);
  color: white;
  border-color: #00bfa5;
  box-shadow: 0 0 10px rgba(0, 191, 165, 0.3);

  &:hover {
    box-shadow:
      0 0 20px rgba(0, 191, 165, 0.6),
      0 0 30px rgba(0, 191, 165, 0.3);
    background: linear-gradient(135deg, #00bfa5 0%, #26c6da 100%);
  }
`

const fadeIn = `
  @keyframes fadeIn {
    0% { opacity: 0; }
    100% { opacity: 1; }
  }

  @keyframes zoomIn {
    0% { transform: scale(0.9); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow:
        0 0 20px rgba(0, 255, 255, 0.4),
        0 0 40px rgba(0, 255, 255, 0.2),
        inset 0 0 20px rgba(0, 255, 255, 0.05);
    }
    50% {
      box-shadow:
        0 0 25px rgba(0, 255, 255, 0.6),
        0 0 50px rgba(0, 255, 255, 0.3),
        inset 0 0 20px rgba(0, 255, 255, 0.1);
    }
  }
`

const Modal: React.FC<ModalProps> = ({ message, isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <>
      <style>{fadeIn}</style>
      <ModalOverlay>
        <ModalContainer>
          <ModalTitle>Are you sure?</ModalTitle>
          <ModalMessage>{message}</ModalMessage>
          <ModalActions>
            <ConfirmButton onClick={onConfirm}>Delete</ConfirmButton>
            <CancelButton onClick={onCancel}>Cancel</CancelButton>
          </ModalActions>
        </ModalContainer>
      </ModalOverlay>
    </>
  )
}

export default Modal
