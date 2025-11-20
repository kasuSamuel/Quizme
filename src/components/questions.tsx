import styled from 'styled-components'
import Tab from './tab'
import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Button from './button'
import ProgressBar from './progressBar'
import { useGetQuestionsByCategoryQuery } from '../store/GameSlice'
import LoadingScreen from './loading'

const Background = styled.div`
  width: 60%;
  display: flex;
  gap: 40px;
  color: #1b1b1b;
`

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  gap: 16px;
`

const RightSide = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
`

const Question = styled.h3`
  font-size: 2rem;
  font-weight: 900;
  margin: 0;
  color: #1a202c;
  font-family: 'Fredoka One';
  text-align: left;
`

const QuestionNumber = styled.p`
  font-size: 0.9rem;
  color: #8b8b8bff;
  text-align: left;
`

const TabList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Questions = () => {
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  const navigate = useNavigate()
  const { topic } = useParams<{ topic: string }>()

  const { data: questions = [], isLoading } = useGetQuestionsByCategoryQuery(topic!)


if (isLoading) {
  return <LoadingScreen />
}

  if (!questions || questions.length === 0) return null

  const question = questions[index]
  const correctIndex = question.options.findIndex((opt: string) => opt === question.answer)

  const handleSelect = (i: number) => {
    if (!submitted) setSelected(i)
  }

  const handleButton = () => {
    if (!submitted) {
      if (selected === null) return

      // Count the point immediately when submitting
      if (selected === correctIndex) {
        setScore((prev) => prev + 1)
      }
      setSubmitted(true)
    } else {
      // Move to next question or finish
      const next = index + 1
      if (next < questions.length) {
        setIndex(next)
        setSelected(null)
        setSubmitted(false)
      } else {

        navigate('/results', {
          state: {
            score,
            total: questions.length,
            topic,
          },
        })
      }
    }
  }

  return (
    <Background>
      <LeftSide>
        <QuestionNumber>
          {index + 1} of {questions.length} Questions
        </QuestionNumber>

        <Question>{question.questionText}</Question>
        <ProgressBar current={index} total={questions.length} />
      </LeftSide>

      <RightSide>
        <TabList>
          {question.options.map((option: string, i: number) => (
            <Tab
              onClicked={() => handleSelect(i)}
              key={i}
              type="answer"
              optionIndex={i}
              option={option}
              isCorrect={submitted && i === correctIndex}
              isWrong={submitted && selected === i && i !== correctIndex}
              isSelected={!submitted && selected === i}
            />
          ))}
        </TabList>

        <Button
          label={submitted ? 'Next' : 'Submit'}
          onClick={handleButton}
          disabled={!submitted && selected === null}
        />
      </RightSide>
    </Background>
  )
}

export default Questions
