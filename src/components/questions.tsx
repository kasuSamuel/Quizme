import styled from 'styled-components'
import Tab from './tab'
import { useParams, useNavigate } from 'react-router-dom'
import { useCallback, useState, useMemo } from 'react'
import Button from './button'
import ProgressBar from './progressBar'
import { useGetQuestionsByCategoryQuery } from '../store/GameSlice'
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
  text-shadow:
    0 0 10px #00ffff,
    0 0 20px #00ffff;
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

  const { data: questions = [], isLoading } = useGetQuestionsByCategoryQuery(topic!)

  const correctIndex = useMemo(() => {
    if (!questions || questions.length === 0 || index >= questions.length) {
      return -1
    }
    const question = questions[index]
    return question.options.findIndex((opt: string) => opt === question.answer)
  }, [questions, index])

  // Define ALL callbacks BEFORE any early returns
  const handleSelect = useCallback((i: number) => {
    setSelected((prev) => (!submitted ? i : prev))
  }, [submitted])

  const handleTimeout = useCallback(() => {
    setSubmitted(true)
    setTimeout(() => {
      setIndex((prevIndex) => {
        const next = prevIndex + 1
        if (next < questions.length) {
          setSelected(null)
          setSubmitted(false)
          return next
        } else {
          navigate('/results', {
            state: {
              score,
              total: questions.length,
              topic,
            },
          })
          return prevIndex
        }
      })
    }, 800)
  }, [questions.length, navigate, score, topic])

  const handleExpire = useCallback(() => {
    handleTimeout()
  }, [handleTimeout])

const handleButton = useCallback(() => {
  if (!submitted) {
    if (selected === null) return; // Don't allow submission if no option is selected

    const currentQuestion = questions[index];
    if (selected === correctIndex) {
      setScore(prev => prev + 1); // Increment score if the answer is correct
    }

    setSubmitted(true); // Mark question as submitted
    return;
  }

  // Next question or results
  const next = index + 1;
  if (next < questions.length) {
    setIndex(next);
    setSelected(null); // Reset selection for the next question
    setSubmitted(false); // Reset submission state
  } else {
    navigate('/results', {
      state: { score, total: questions.length, topic },
    });
  }
}, [submitted, selected, index, questions.length, navigate, score, topic, correctIndex]);


  // Memoize the correctIndex calculation


  if (isLoading) return <LoadingScreen />
  if (!questions || questions.length === 0) return <EmptyState />

  const question = questions[index]

  return (
    <Background>
      <LeftSide>
        <QuestionNumber>
          {index + 1} of {questions.length} Questions
        </QuestionNumber>

        <Question>{question.questionText}</Question>

        <ProgressBar current={index} total={questions.length} />

        <Timer key={index} duration={45} onExpire={handleExpire} />
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
