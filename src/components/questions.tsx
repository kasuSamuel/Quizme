import styled from 'styled-components'
import Tab from './tab'
import { useParams, useNavigate } from 'react-router-dom'
import { useCallback, useState, useMemo } from 'react'
import Button from './button'
import ProgressBar from './progressBar'
import { useGetQuestionsByCategoryQuery, useGetCategoriesQuery } from '../store/GameSlice'
import LoadingScreen from './loading'
import Timer from './timer'
import EmptyState from './empty'

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
  color: #00ffff;
  font-family: 'Fredoka One';
  text-align: left;
`

const QuestionNumber = styled.p`
  font-size: 0.9rem;
  font-style: italic;
  max-width: 600px;
  color: #00ffff;
  text-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;
  text-align: left;
`

const TabList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Questions = () => {
  const navigate = useNavigate()
  const { topic } = useParams<{ topic: string }>()
  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [score, setScore] = useState(0)

  // Fetch all categories
  const { data: categories = [] } = useGetCategoriesQuery('')

  // Fetch questions for this category
  const { data: questions = [], isLoading } = useGetQuestionsByCategoryQuery(topic!)

  // Find this category object
  const category = useMemo(() => categories.find((c) => c.title === topic), [categories, topic])

  const correctIndex = useMemo(() => {
    if (!questions || questions.length === 0 || index >= questions.length) {
      return -1
    }
    const question = questions[index]
    return question.options.findIndex((opt) => opt === question.answer)
  }, [questions, index])

  // Final time limit logic
  const question = questions[index]

const timeLimit = useMemo(() => {
  if (!question) return 0

  // Use question's timeLimit if it's greater than 0
  if (question.timeLimit && question.timeLimit > 0) {
    return question.timeLimit
  }

  // Otherwise, use category default if available
  if (category?.defaultTimeLimit && category.defaultTimeLimit > 0) {
    return category.defaultTimeLimit
  }

  return 0
}, [question, category])


  const handleSelect = useCallback(
    (i: number) => {
      setSelected((prev) => (!submitted ? i : prev))
    },
    [submitted],
  )

  const goToNextOrResults = useCallback(() => {
    const next = index + 1
    if (next < questions.length) {
      setIndex(next)
      setSelected(null)
      setSubmitted(false)
    } else {
      navigate('/results', {
        state: { score, total: questions.length, topic },
      })
    }
  }, [index, questions.length, navigate, score, topic])

  const handleTimeout = useCallback(() => {
    setSubmitted(true)
    setTimeout(goToNextOrResults, 800)
  }, [goToNextOrResults])

  const handleExpire = useCallback(() => {
    handleTimeout()
  }, [handleTimeout])

  const handleButton = useCallback(() => {
    if (!submitted) {
      if (selected === null) return

      if (selected === correctIndex) {
        setScore((prev) => prev + 1)
      }

      setSubmitted(true)
      return
    }

    // If already submitted, go next
    goToNextOrResults()
  }, [submitted, selected, correctIndex, goToNextOrResults])

  if (isLoading) return <LoadingScreen />
  if (!questions || questions.length === 0) return <EmptyState />

  return (
    <Background>
      <LeftSide>
        <QuestionNumber>
          {index + 1} of {questions.length} Questions
        </QuestionNumber>

        <Question>{question.questionText}</Question>

        <ProgressBar current={index} total={questions.length} />

        <Timer key={index} duration={timeLimit} onExpire={handleExpire} />
      </LeftSide>

      <RightSide>
        <TabList>
          {question.options.map((option, i) => (
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
