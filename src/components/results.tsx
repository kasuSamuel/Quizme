import { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { useLocation, useNavigate } from 'react-router-dom'
import Button from './button'

interface ConfettiProps {
  $delay: number
  $left: number
}

const fall = keyframes`
  0% {
    transform: translateY(-100vh) rotate(0deg);
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
  }
`

const glow = keyframes`
  0%, 100% {
    text-shadow: 0 0 10px #00ffff;
  }
  50% {
    text-shadow: 0 0 20px #00ffff;
  }
`

const borderGlow = keyframes`
  0%, 100% {
    border-color: #00ffff;
    box-shadow: 0 0 10px rgba(0, 255, 255, 0.5), inset 0 0 10px rgba(0, 255, 255, 0.1);
  }
  50% {
    border-color: #0099ff;
    box-shadow: 0 0 20px rgba(0, 153, 255, 0.8), inset 0 0 15px rgba(0, 153, 255, 0.2);
  }
`

const pulse = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
`

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;

  /* Gaming cyberpunk background */
  background: linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #0d0d2b 100%);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
        0deg,
        transparent 24%,
        rgba(0, 255, 255, 0.05) 25%,
        rgba(0, 255, 255, 0.05) 26%,
        transparent 27%,
        transparent 74%,
        rgba(0, 255, 255, 0.05) 75%,
        rgba(0, 255, 255, 0.05) 76%,
        transparent 77%,
        transparent
      ),
      linear-gradient(
        90deg,
        transparent 24%,
        rgba(0, 255, 255, 0.05) 25%,
        rgba(0, 255, 255, 0.05) 26%,
        transparent 27%,
        transparent 74%,
        rgba(0, 255, 255, 0.05) 75%,
        rgba(0, 255, 255, 0.05) 76%,
        transparent 77%,
        transparent
      );
    background-size: 50px 50px;
    pointer-events: none;
  }
`

const Confetti = styled.div<ConfettiProps>`
  position: absolute;
  font-size: 2rem;
  animation: ${fall} 3s linear infinite;
  animation-delay: ${(props) => props.$delay}s;
  left: ${(props) => props.$left}%;
  top: -50px;
  filter: drop-shadow(0 0 10px #00ffff);
`

const Card = styled.div<{ $passed: boolean }>`
  background: linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(26, 26, 62, 0.95) 100%);
  border: 2px solid ${(props) => (props.$passed ? '#00ff00' : '#ff0055')};
  border-radius: 20px;
  animation: ${borderGlow} 3s ease-in-out infinite;
  padding: 3rem 4rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(10px);

  /* Enhanced neon glow and shadow */
  box-shadow:
    0 0 20px ${(props) => (props.$passed ? 'rgba(0, 255, 0, 0.6)' : 'rgba(255, 0, 85, 0.6)')},
    inset 0 0 20px ${(props) => (props.$passed ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 85, 0.1)')},
    0 0 40px ${(props) => (props.$passed ? 'rgba(0, 255, 255, 0.3)' : 'rgba(255, 0, 85, 0.2)')};
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #00ffff;
  animation: ${glow} 3s ease-in-out infinite;
  letter-spacing: 2px;
  font-weight: bold;
  text-transform: uppercase;
  font-family: 'Arial', sans-serif;
`

const Topic = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #00ff00;
  text-shadow: 0 0 10px rgba(0, 255, 0, 0.8);
  letter-spacing: 1px;
`

const ResultMessage = styled.div<{ $passed: boolean }>`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 1rem 0;
  color: ${(props) => (props.$passed ? '#00ff00' : '#ff0055')};
  text-shadow: 0 0 15px
    ${(props) => (props.$passed ? 'rgba(0, 255, 0, 0.8)' : 'rgba(255, 0, 85, 0.8)')};
  animation: ${pulse} 2s ease-in-out infinite;
`

const Score = styled.h3<{ $passed: boolean }>`
  font-size: 4rem;
  font-weight: 900;
  margin: 2rem 0;
  color: ${(props) => (props.$passed ? '#00ff00' : '#ff0055')};
  font-family: 'Fredoka One', cursive;
  animation: ${pulse} 2.5s ease-in-out infinite;
`

const Percentage = styled.div`
  font-size: 1.2rem;
  color: #00ffff;
  margin-bottom: 1rem;
  letter-spacing: 1px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
`

const Message = styled.p`
  font-size: 1rem;
  color: #00ddff;
  margin: 1.5rem 0;
  line-height: 1.6;
  text-shadow: 0 0 5px rgba(0, 221, 255, 0.5);
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`


const Results = () => {
  const [showConfetti, setShowConfetti] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const { score, total, topic } = location.state

  const percentage = Math.round((score / total) * 100)
  const PASS_MARK = 80
  const passed = percentage >= PASS_MARK

  useEffect(() => {
    if (passed) {
      setShowConfetti(true)
    } else {
      setShowConfetti(false)
    }
  }, [passed])

  // Generate confetti elements
  const confettiElements = showConfetti
    ? [...Array(30)].map((_, i) => {
        const emojis = [
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
          '🎉',
          '🎊',
        ]
        return (
          <Confetti key={i} $delay={i * 0.1} $left={Math.random() * 100}>
            {emojis[Math.floor(Math.random() * emojis.length)]}
          </Confetti>
        )
      })
    : null

  return (
    <CardWrapper>
      {confettiElements}
      <Card $passed={true}>
        <Title>Quiz Results</Title>
        <Topic>Topic: {topic}</Topic>

        <ResultMessage $passed={passed}>
          {passed ? '🎊 Congratulations! 🎊' : '😔 Not Passed'}
        </ResultMessage>

        <Score $passed={passed}>
          {score} / {total}
        </Score>

        <Percentage>
          Score: {percentage}% {passed ? '✓' : '✗'}
        </Percentage>

        <Message>
          {passed
            ? `Amazing work! You scored ${percentage}% and passed with flying colors! Keep up the excellent work! 🌟`
            : `You scored ${percentage}%. The pass mark is ${PASS_MARK}%. Don't give up! Review the material and try again - you've got this! 💪`}
        </Message>

        <ButtonContainer>
          <Button label="Retake" onClick={() => navigate(`/questions/${topic}`)} />
          <Button label="Home" onClick={() => navigate('/')} />
        </ButtonContainer>
      </Card>
    </CardWrapper>
  )
}

export default Results
