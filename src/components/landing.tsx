// LandingPage.tsx
import styled, { keyframes } from 'styled-components'
import { useNavigate } from 'react-router-dom'
import Button from './button'  // assuming same Button component

const LandingWrapper = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;
  width: 100vw;
  height: 100vh;
`
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  margin: 0;
  color: #1a202c;
  text-shadow:
    -2px -2px 0px #60a5fa,
    2px 2px 0px #a78bfa;
  font-family: 'Fredoka One';
  display: inline-block;
  animation: ${bounce} 2s infinite;
`

const Subtitle = styled.p`
  font-size: 0.9rem;
  margin-bottom: 3rem;
  max-width: 600px;
  color: #8b8b8bff;
  font-style: italic;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 10;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`

// Optional: Floating background elements for extra flair
const FloatingShape = styled.div`
  position: absolute;
  opacity: 0.1;
  font-size: 8rem;
  pointer-events: none;
  animation: float 20s infinite linear;

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
    }
    50% {
      transform: translateY(-100px) translateX(100px) rotate(180deg);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(360deg);
    }
  }
`

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <LandingWrapper>
      {/* Decorative floating shapes */}
      <FloatingShape style={{ top: '10%', left: '10%' }}>✨</FloatingShape>
      <FloatingShape style={{ bottom: '20%', right: '15%' }}>🌟</FloatingShape>
      <FloatingShape style={{ top: '50%', left: '5%' }}>🎓</FloatingShape>

      <Title>Quiz-me</Title>
      <Subtitle>
        Test your knowledge, track your progress, and master any topic with fun and engaging quizzes!
      </Subtitle>

      <ButtonGroup>
        <Button
          label="I'm a Student"
          onClick={() => navigate('/topics')}
        />
        <Button
          label="I'm an Admin"
          onClick={() => navigate('/admin')}
        />
      </ButtonGroup>
    </LandingWrapper>
  )
}

export default LandingPage
