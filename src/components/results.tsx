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

const CardWrapper = styled.div`
  display: flex;
  width: 100vw;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`

const Confetti = styled.div<ConfettiProps>`
  position: absolute;
  font-size: 2rem;
  animation: ${fall} 3s linear infinite;
  animation-delay: ${(props) => props.$delay}s;
  left: ${(props) => props.$left}%;
  top: -50px;
`

const Card = styled.div`
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  padding: 3rem 4rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 10;
`

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #1a202c;
`

const Topic = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  color: #4a5568;
`

const ResultMessage = styled.div<{ $passed: boolean }>`
  font-size: 1.8rem;
  font-weight: bold;
  margin: 1rem 0;
  color: ${(props) => (props.$passed ? '#10b981' : '#ef4444')};
`

const Score = styled.h3<{ $passed: boolean }>`
  font-size: 4rem;
  font-weight: 900;
  margin: 2rem 0;
  color: ${(props) => (props.$passed ? '#10b981' : '#ef4444')};
  text-shadow:
    -2px -2px 0px ${(props) => (props.$passed ? '#60a5fa' : '#fca5a5')},
    2px 2px 0px ${(props) => (props.$passed ? '#a78bfa' : '#f87171')};
  font-family: 'Fredoka One', cursive;
`

const Percentage = styled.div`
  font-size: 1.2rem;
  color: #6b7280;
  margin-bottom: 1rem;
`

const Message = styled.p`
  font-size: 1rem;
  color: #6b7280;
  margin: 1.5rem 0;
  line-height: 1.6;
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
        const emojis = ['🌸', '🌺', '🌼', '🌻', '🌷', '🎉', '✨', '⭐', '💐']
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
      <Card>
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
