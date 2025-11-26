import type React from "react"
import { useEffect, useState } from "react"
import styled, { keyframes } from "styled-components"
import toast from "react-hot-toast"
import { useCreateQuestionMutation, useUpdateQuestionMutation, type Question } from "../store/GameSlice"

interface AddQuestionModalProps {
  isOpen: boolean
  onClose: () => void
  selectedCategory: string
  isEditing: boolean
  questionId?: number
  questionData?: Question
  editingQuestion: number | null
}

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const zoomIn = keyframes`
  from { transform: scale(0.95); opacity: 0; filter: blur(10px); }
  to { transform: scale(1); opacity: 1; filter: blur(0); }
`


const slideDown = keyframes`
  from { transform: translateY(-10px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(15, 30, 50, 0.9) 100%);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
`

const Container = styled.div`
  background: linear-gradient(135deg, #0a1628 0%, #1a2a4a 100%);
  padding: 30px;
  border-radius: 15px;
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(0, 255, 255, 0.5);
  box-shadow: 0 0 30px rgba(0, 255, 255, 0.4),
              0 0 60px rgba(0, 255, 255, 0.2),
              inset 0 0 30px rgba(0, 255, 255, 0.05);
  animation: ${zoomIn} 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-sizing: border-box;
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 40px rgba(0, 255, 255, 0.6),
                0 0 80px rgba(0, 255, 255, 0.3),
                inset 0 0 30px rgba(0, 255, 255, 0.1);
  }
`

const Title = styled.h3`
  font-size: 24px;
  color: #00ffff;
  margin-bottom: 25px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.8),
               0 0 20px rgba(0, 255, 255, 0.4);
  letter-spacing: 2px;
  font-weight: 700;
  text-transform: uppercase;
`

const FormField = styled.div`
  width: 100%;
  margin-bottom: 5px;
  animation: ${slideDown} 0.4s ease forwards;

  &:nth-child(2) { animation-delay: 0.05s; }
  &:nth-child(3) { animation-delay: 0.1s; }
  &:nth-child(4) { animation-delay: 0.15s; }
  &:nth-child(5) { animation-delay: 0.2s; }
  &:nth-child(6) { animation-delay: 0.25s; }
`

const Label = styled.label`
  display: block;
  color: #00ffff;
  margin-bottom: 8px;
  font-size: 13px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.6);
`

const Textarea = styled.textarea`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1.5px solid rgba(0, 255, 255, 0.4);
  background: rgba(10, 20, 40, 0.8);
  color: #00ffff;
  outline: none;
  box-sizing: border-box;
  font-family: 'Courier New', monospace;
  resize: vertical;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(0, 255, 255, 0.3);
  }

  &:focus {
    border-color: rgba(0, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
                inset 0 0 15px rgba(0, 255, 255, 0.05);
    background: rgba(10, 20, 40, 0.95);
  }

  &:hover {
    border-color: rgba(0, 255, 255, 0.6);
  }
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 14px;
  border-radius: 8px;
  border: 1.5px solid rgba(0, 255, 255, 0.4);
  background: rgba(10, 20, 40, 0.8);
  color: #00ffff;
  outline: none;
  box-sizing: border-box;
  font-family: 'Courier New', monospace;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(0, 255, 255, 0.3);
  }

  &:focus {
    border-color: rgba(0, 255, 255, 0.8);
    box-shadow: 0 0 15px rgba(0, 255, 255, 0.5),
                inset 0 0 15px rgba(0, 255, 255, 0.05);
    background: rgba(10, 20, 40, 0.95);
  }

  &:hover {
    border-color: rgba(0, 255, 255, 0.6);
  }
`

const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 100%;
  padding: 15px;
  background: rgba(0, 255, 255, 0.05);
  border: 1.5px solid rgba(0, 255, 255, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 12px;
  margin-top: 10px;
  width: 100%;
`

const Button = styled.button<{ color: string; variant?: "primary" | "secondary" }>`
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  border: 1.5px solid rgba(0, 255, 255, 0.5);
  background: ${({ color, variant }) => {
    if (variant === "primary") {
      return "linear-gradient(135deg, #00ffff 0%, #0088ff 100%)"
    }
    return color === "green"
      ? "linear-gradient(135deg, #00ff00 0%, #00aa00 100%)"
      : "linear-gradient(135deg, #ff0000 0%, #aa0000 100%)"
  }};
  color: #000;
  cursor: pointer;
  font-weight: 700;
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 5px 25px rgba(0, 255, 255, 0.6),
                0 0 30px rgba(0, 255, 255, 0.3);
    border-color: rgba(0, 255, 255, 0.8);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  isOpen,
  onClose,
  selectedCategory,
  isEditing,
  questionId,
  questionData,
}) => {
  const [createQuestion, { isLoading }] = useCreateQuestionMutation()
  const [updateQuestion, { isLoading: updateLoading }] = useUpdateQuestionMutation()

  const [questionText, setQuestionText] = useState("")
  const [options, setOptions] = useState(["", "", "", ""])
  const [answer, setAnswer] = useState("")
const [time, setTime] = useState<number>()

  useEffect(() => {
    if (isEditing && questionData) {
      setQuestionText(questionData.questionText)
      setOptions(questionData.options)
      setAnswer(questionData.answer)
      setTime(questionData.timeLimit)
    }
  }, [isEditing, questionData])

  if (!isOpen) return null

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setTime(0);
    } else {
      const parsedValue = Number(value);

      if (!isNaN(parsedValue)) {
        setTime(parsedValue);
      }
    }
  };

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options]
    updated[index] = value
    setOptions(updated)
  }

  const handleSubmit = async () => {
    if (!questionText.trim() || options.some((opt) => !opt.trim()) || !answer.trim()) {
      toast.error("Please fill all fields")
      return
    }

    const questionPayload = {
      questionText,
      options,
      answer,
      timeLimit: Number(time),
    }

    try {
      const payload = {
        category: selectedCategory,
        questionData: questionPayload,
      }

      if (questionId) {
        await updateQuestion({ id: questionId, questionData: questionPayload }).unwrap()
        toast.success("Question updated successfully ✅")
      } else {
        await createQuestion(payload).unwrap()
        toast.success("Question added successfully ✅")
      }

      setQuestionText("")
      setOptions(["", "", "", ""])
      setAnswer("")
      onClose()
    } catch (error: any) {
      console.error("Error creating or updating question:", error)
      toast.error(error?.data?.message || "Failed to process question ❌")
    }
  }

  return (
    <Overlay>
      <Container>
        <Title>{isEditing ? 'Edit Question' : 'Add New Question'}</Title>

        <FormField>
          <Label>Enter Question</Label>
          <Textarea
            placeholder="Enter your question here..."
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            rows={4}
          />
        </FormField>

        <OptionsWrapper>
          {options.map((opt, index) => (
            <FormField key={index}>
              <Label>Option {index + 1}</Label>
              <Input
                placeholder={`Enter option ${index + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
            </FormField>
          ))}
        </OptionsWrapper>

        <FormField>
          <Label>Correct Answer</Label>
          <Input
            placeholder="Enter the correct answer..."
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
        </FormField>

        <FormField>
          <Label>Time Limit (in seconds)</Label>
          <Input
            placeholder="Enter a time for this question in seconds..."
            type="number"
            value={time === 0 ? '' : time}
            onChange={handleChange}
          />
        </FormField>

        <ButtonGroup>
          <Button color="red" variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button
            color="green"
            variant="primary"
            onClick={handleSubmit}
            disabled={isLoading || updateLoading}
          >
            {isLoading || updateLoading
              ? 'Processing...'
              : isEditing
                ? 'Update Question'
                : 'Add Question'}
          </Button>
        </ButtonGroup>
      </Container>
    </Overlay>
  )
}

export default AddQuestionModal
