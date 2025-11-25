'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import toast from 'react-hot-toast'
import { FaEdit, FaTrash } from 'react-icons/fa'
import AddQuestionModal from '../addQuestionModal'
import Modal from '../modal'
import { useDeleteQuestionMutation, useGetQuestionsByCategoryQuery, type Question } from '../../store/GameSlice'
import { useLocation } from 'react-router-dom'
import { Loading } from '../Dashboard'

const Header = styled.div`
  margin-bottom: 3rem;
`

const PageTitle = styled.h1`
  font-size: 2.8rem;
  color: #00d4ff;
  font-family: 'Fredoka One', sans-serif;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  letter-spacing: 1px;
  margin: 0;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #b0b0b0;
  font-size: 1.2rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
`

const Card = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid #00d4ff;
  box-shadow: 0 0 20px rgba(0, 212, 255, 0.2), inset 0 0 20px rgba(0, 212, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0, 212, 255, 0.1) 0%, rgba(0, 212, 255, 0) 50%);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 0 40px rgba(0, 212, 255, 0.4), inset 0 0 20px rgba(0, 212, 255, 0.1);
    border-color: #00ffff;

    &::before {
      opacity: 1;
    }
  }

  h3 {
    color: #00d4ff;
    margin: 0 0 1.5rem 0;
    font-size: 1.2rem;
    line-height: 1.5;
    font-family: 'Fredoka One', sans-serif;
  }
`

const OptionsContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  background: rgba(0, 212, 255, 0.05);
  border-radius: 8px;
  padding: 1rem;

  li {
    padding: 0.7rem 1rem;
    margin-bottom: 0.5rem;
    border-radius: 6px;
    border-left: 3px solid #00d4ff;
    background: rgba(0, 212, 255, 0.1);
    color: #b0b0b0;
    transition: all 0.2s ease;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      background: rgba(0, 212, 255, 0.15);
      transform: translateX(4px);
    }
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: auto;
  z-index: 10;
`

const ActionButton = styled.button<{ $color: string }>`
  padding: 0.6rem 1.2rem;
  border: 2px solid ${(p) => p.$color};
  border-radius: 8px;
  background: transparent;
  color: ${(p) => p.$color};
  cursor: pointer;
  font-weight: 600;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Fredoka One', sans-serif;
  flex: 1;
  justify-content: center;

  &:hover {
    background: ${(p) => p.$color};
    color: #1a1a2e;
    transform: scale(1.05);
    box-shadow: 0 0 15px ${(p) => p.$color}80;
  }
`

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #00ffff;
  font-style: italic;
  text-shadow:
    0 0 10px #00ffff,
    0 0 20px #00ffff;
`

interface QuestionsProps {
  selectedCategory?: string
}

const QuestionList = ({ selectedCategory: propCategory }: QuestionsProps) => {
  const location = useLocation()
  const [selectedCategory, setSelectedCategory] = useState(propCategory || '')
  const [deleteQuestion] = useDeleteQuestionMutation()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null)
  const [editingQuestion, setEditingQuestion] = useState<number | null>(null)
  const [isEditing, setIsEditing] = useState(true)

  const { data: questions = [], isLoading: questionsLoading } = useGetQuestionsByCategoryQuery(
    selectedCategory,
    {
      skip: !selectedCategory,
    },
  )

  useEffect(() => {
    if (!selectedCategory && location.state?.category) {
      setSelectedCategory(location.state.category)
    }
  }, [location.state, selectedCategory])

  const handleDeleteQuestion = async () => {
    if (questionToDelete == null) return

    try {
      await deleteQuestion
      await deleteQuestion({
        id: questionToDelete,
      }).unwrap()

      toast.success('Question deleted successfully!')
      setIsDeleteModalOpen(false)
    } catch (error) {
      toast.error('Failed to delete question!')
      setIsDeleteModalOpen(false)
    }
  }

  const cancelDeleteQuestion = () => {
    setIsDeleteModalOpen(false)
    setQuestionToDelete(null)
  }

  const handleEditQuestion = (question: Question) => {
    setIsEditing(true)
    setEditingQuestion(question.id)
    setIsQuestionModalOpen(true)
  }


  if (questionsLoading) return <Loading>Loading...</Loading>

  if (!selectedCategory) {
    return (
      <EmptyState>
        <h2>Please select a category from the Categories page first</h2>
      </EmptyState>
    )

  }

  return (
    <>
      <Header>
        <PageTitle>Questions in "{selectedCategory}"</PageTitle>
      </Header>

      {questions.length === 0 ? (
        <EmptyState>
          <h2>No questions found for this category.</h2>
          <p>Create your first question to get started!</p>
        </EmptyState>
      ) : (
        <Grid>
          {questions.map((q) => (
            <Card key={q.id}>
              <h3>{q.questionText}</h3>

              <OptionsContainer>
                {q.options.map((opt, index: number) => (
                  <li
                    key={index}
                    style={{
                      borderLeftColor: opt === q.answer ? '#10b981' : '#00d4ff',
                      background:
                        opt === q.answer ? 'rgba(16, 185, 129, 0.15)' : 'rgba(0, 212, 255, 0.1)',
                      color: opt === q.answer ? '#10b981' : '#b0b0b0',
                      fontWeight: opt === q.answer ? '700' : '500',
                    }}
                  >
                    {opt === q.answer && '✓ '} {opt}
                  </li>
                ))}
              </OptionsContainer>
              <Subtitle>
                <strong>Time Limit:</strong> {q.timeLimit} seconds
              </Subtitle>

              <ActionButtons>
                <ActionButton $color="#3b82f6" onClick={() => handleEditQuestion(q)}>
                  <FaEdit /> Edit
                </ActionButton>

                <ActionButton
                  $color="#ef4444"
                  onClick={() => {
                    setQuestionToDelete(q.id)
                    setIsDeleteModalOpen(true)
                  }}
                >
                  <FaTrash /> Delete
                </ActionButton>
              </ActionButtons>
            </Card>
          ))}
        </Grid>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        message="Are you sure you want to delete this question? This action cannot be undone."
        onConfirm={handleDeleteQuestion}
        onCancel={cancelDeleteQuestion}
      />

      <AddQuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        selectedCategory={selectedCategory}
        isEditing={isEditing}
        editingQuestion={editingQuestion}
        questionId={questions.find((q) => q.id === editingQuestion)?.id}
        questionData={editingQuestion ? questions.find((q) => q.id === editingQuestion) : undefined}
      />
    </>
  )
}

export default QuestionList
