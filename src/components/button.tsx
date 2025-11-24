import styled, { keyframes } from 'styled-components'

export interface ButtonProps {
  label: string
  disabled?: boolean
  onClick?: () => void
}

const ripple = keyframes`
  0% {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.6;
  }
  100% {
    transform: translate(-50%, -50%) scale(2.5);
    opacity: 0;
  }
`

const glow = keyframes`
  0%, 100% {
    box-shadow: 0 8px 24px rgba(0, 255, 255, 0.4), inset 0 -4px 0 rgba(0, 0, 0, 0.2);
  }
  50% {
    box-shadow: 0 8px 32px rgba(0, 255, 255, 0.6), inset 0 -4px 0 rgba(0, 0, 0, 0.2);
  }
`

const StyledButton = styled.button`
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  border-radius: 16px;
  font-weight: 700;
  font-size: 18px;
  padding: 20px 40px;
  background: linear-gradient(135deg, #00ffff 0%, #0099ff 100%);
  color: white;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  width: 100%;
  font-family: 'Fredoka One', cursive;
  letter-spacing: 1px;
  text-transform: uppercase;


  /* Hover animation - Neon glow */
  &:hover {
    transform: translate(3px, 3px) scale(1.05);
    animation: ${glow} 2s ease-in-out infinite;
  }

  /* Active/Press state - Smaller scale and more glow */
  &:active {
    transform: translateY(0px) scale(0.98);
      inset 0 2px 8px rgba(0, 0, 0, 0.3);
  }

  /* Ripple effect on click */
  &::after {
    content: '';
    position: absolute;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    pointer-events: none;
    transform: translate(-50%, -50%) scale(0);
    opacity: 0;
  }

  &:active::after {
    animation: ${ripple} 0.6s ease-out;
  }

  /* Disabled state */
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
    animation: none;
    &:hover {
      transform: none;
      animation: none;
    }
  }
`

const Button: React.FC<ButtonProps> = ({ label, disabled = false, onClick }) => {
  return (
    <StyledButton disabled={disabled} onClick={onClick}>
      {label}
    </StyledButton>
  )
}

export default Button
