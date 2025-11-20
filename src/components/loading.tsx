import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

const Background = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Poppins', sans-serif;
  color: #1b1b1b;
`

const LoaderWrapper = styled.div`
  position: relative;
  width: 130px;
  height: 130px;
  margin-bottom: 2rem;
`

const Spinner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 5px solid transparent;
  border-top: 5px solid #1a202c;
  animation: ${rotate} 1.5s linear infinite;
`

const InnerCircle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90px;
  height: 90px;
  background: radial-gradient(circle at 30% 30%, #4caf50, #1a202c);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 2rem;
`

const Subtitle = styled.p`
  font-size: 1rem;
  color: #555;
  animation: ${fadeIn} 1.2s ease-in-out;
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
