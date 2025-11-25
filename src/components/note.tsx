import styled, { keyframes } from 'styled-components'
import { useNavigate, useParams } from 'react-router-dom'
import Button from './button'
import { useGetQuestionsByCategoryQuery } from '../store/GameSlice'
import LoadingScreen from './loading'

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #0d0d2b 100%);
`

const Card = styled.div`
  background: rgba(26, 26, 62, 0.95);
  border: 2px solid #ff0055;
  border-radius: 20px;
  padding: 3rem 4rem;
  text-align: center;
  max-width: 500px;
  width: 100%;
  position: relative;
  z-index: 10;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 20px rgba(255, 0, 85, 0.6), inset 0 0 20px rgba(255, 0, 85, 0.1);
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #ff0055;
  font-weight: bold;
  font-family: 'Fredoka One';
  animation: ${pulse} 2s ease-in-out infinite;
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

const Note = () => {
  const navigate = useNavigate()
  const { topic } = useParams()
  const topicString = topic ?? ''

  const { data: questions = [], isLoading } = useGetQuestionsByCategoryQuery(topicString)

  if (isLoading) return <LoadingScreen />

  const totalQuestions = questions.length

  // Convert backend seconds → hours + minutes + seconds
  const totalSeconds = questions.reduce((sum, q) => sum + (q.timeLimit || 0), 0)

  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  // Formatting helpers
  const hLabel = hours > 0 ? `${hours} hour${hours !== 1 ? 's' : ''} ` : ''
  const mLabel = minutes > 0 ? `${minutes} minute${minutes !== 1 ? 's' : ''} ` : ''
  const sLabel = `${seconds} second${seconds !== 1 ? 's' : ''}`

  return (
    <CardWrapper>
      <Card>
        <Title>Please Read Before Proceeding</Title>

        <Message>
          This topic consists of <strong>{totalQuestions}</strong> questions. <br />
          Each question has a specific time limit. <br />
          In total, you have{' '}
          <strong>
            {hLabel}
            {mLabel}
            {sLabel}
          </strong>{' '}
          to complete the quiz. <br />
          <br />
          Please read and agree before continuing.
        </Message>

        <ButtonContainer>
          <Button label="Browse Topics" onClick={() => navigate('/topics')} />
          <Button label="Agree" onClick={() => navigate(`/questions/${topic}`)} />
        </ButtonContainer>
      </Card>
    </CardWrapper>
  )
}

export default Note
