import styled, { keyframes } from "styled-components"

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const pulse = keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(34, 211, 238, 0.5),
                0 0 40px rgba(34, 211, 238, 0.3);
  }
  50% {
    box-shadow: 0 0 30px rgba(34, 211, 238, 0.8),
                0 0 60px rgba(34, 211, 238, 0.5);
  }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px rgba(34, 211, 238, 0.8); }
  50% { text-shadow: 0 0 20px rgba(34, 211, 238, 1); }
`

const Background = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  background: linear-gradient(135deg, #0f0f1e 0%, #1a0033 50%, #0a0a15 100%);
  color: #22d3ee;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background:
      repeating-linear-gradient(
        0deg,
        rgba(34, 211, 238, 0.03) 0px,
        transparent 1px,
        transparent 2px,
        rgba(34, 211, 238, 0.03) 3px
      );
    pointer-events: none;
    z-index: 1;
  }
`

const LoaderWrapper = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  margin-bottom: 2rem;
  z-index: 2;
`

const Spinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 3px solid rgba(34, 211, 238, 0.2);
  border-top: 3px solid #22d3ee;
  border-right: 3px solid #22d3ee;
  animation: ${rotate} 1.5s linear infinite, ${pulse} 2s ease-in-out infinite;
  box-shadow: 0 0 20px rgba(34, 211, 238, 0.6), inset 0 0 20px rgba(34, 211, 238, 0.1);
`

const InnerCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  background: linear-gradient(135deg, #0a5c5c 0%, #001a1a 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #22d3ee;
  font-weight: 700;
  font-size: 2rem;
  border: 2px solid #22d3ee;
  box-shadow: 0 0 15px rgba(34, 211, 238, 0.8), inset 0 0 15px rgba(34, 211, 238, 0.2);
  animation: ${glow} 1.5s ease-in-out infinite;
`

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #22d3ee;
  animation: ${fadeIn} 1.2s ease-in-out, ${glow} 1.5s ease-in-out infinite;
  letter-spacing: 2px;
  font-weight: 600;
  z-index: 2;
  position: relative;
`

const LoadingScreen = () => {
  return (
    <Background>
      <LoaderWrapper>
        <Spinner />
        <InnerCircle>Q</InnerCircle>
      </LoaderWrapper>
      <Subtitle>Loading...</Subtitle>
    </Background>
  )
}

export default LoadingScreen
