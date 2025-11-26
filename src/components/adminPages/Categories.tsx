'use client'

import { useState} from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { FaEdit, FaEye, FaPlus, FaTrash } from 'react-icons/fa'
import styled from 'styled-components'
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
  type CategoryResponse,
} from '../../store/GameSlice'
import Button from '../button'
import CategoryForm from '../catForm'
import Modal from '../modal'
import AddQuestionModal from '../addQuestionModal'
import { Loading } from '../Dashboard'

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  gap: 1.5rem;
`

const PageTitle = styled.h1`
  font-size: 2.8rem;
  color: #00d4ff;
  font-family: 'Fredoka One', sans-serif;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  letter-spacing: 1px;
  margin: 0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
`

const Card = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 2rem;
  border: 2px solid #00d4ff;
  box-shadow:
    0 0 20px rgba(0, 212, 255, 0.2),
    inset 0 0 20px rgba(0, 212, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-12px);
    box-shadow:
      0 0 40px rgba(0, 212, 255, 0.4),
      inset 0 0 20px rgba(0, 212, 255, 0.1);
    border-color: #00ffff;
  }
`

const CategoryHeader = styled.div`
  display: flex;
  gap: 1.5rem;
  align-items: center;
  margin-bottom: 1.5rem;
`

const ImageContainer = styled.div`
  width: 70px;
  height: 70px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  flex-shrink: 0;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const TextContent = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 0.5rem 0;
    color: #00d4ff;
    font-size: 1.3rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Fredoka One', sans-serif;
  }

  p {
    margin: 0;
    color: #b0b0b0;
    font-size: 0.95rem;
  }
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: auto;
  flex-wrap: wrap;
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
  z-index: 10;
  &:hover {
    background: ${(p) => p.$color};
    color: #1a1a2e;
    transform: scale(1.08);
    box-shadow: 0 0 15px ${(p) => p.$color}80;
  }
`



const Categories = () => {
  const navigate = useNavigate()
  const { data: categories = [], isLoading } = useGetCategoriesQuery('')
  const [deleteCategory] = useDeleteCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [createCategory] = useCreateCategoryMutation()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isAddEditOpen, setIsAddEditOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryTime, setCategoryTime] = useState(0)
  const [categoryImage, setCategoryImage] = useState('')
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  if (isLoading) return <Loading>Loading...</Loading>

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory({ id: categoryToDelete })
        toast.success('Category deleted successfully!')
        setIsModalOpen(false)
      } catch (error) {
        toast.error('Failed to delete category!')
      }
    }
  }

  const confirmDeleteCategory = (id: number) => {
    setCategoryToDelete(id)
    setIsModalOpen(true)
  }

  const cancelDeleteCategory = () => {
    setIsModalOpen(false)
    setCategoryToDelete(null)
  }

  const handleAddCategory = () => {
    setIsEditing(false)
    setEditingCategoryId(null)
    setCategoryName('')
    setCategoryImage('')
    setCategoryTime(0)
    setIsAddEditOpen(true)
  }

  const handleEditCategory = (cat: CategoryResponse) => {
    setIsEditing(true)
    setEditingCategoryId(cat.id)
    setCategoryName(cat.title)
    setCategoryImage(cat.imgSrc)
    setCategoryTime(cat.defaultTimeLimit)
    setIsAddEditOpen(true)
  }

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  const handleSubmit = async (title: string, imageSrc: string | File, categoryTime: number) => {
    try {
      const imgUrl = typeof imageSrc === 'string' ? imageSrc : await fileToBase64(imageSrc)

      if (isEditing && editingCategoryId !== null) {
        await updateCategory({ id: editingCategoryId, title, imgSrc: imgUrl, defaultTimeLimit: categoryTime })
        toast.success('Category updated successfully!')
      } else {
        await createCategory({ title, imgSrc: imgUrl, defaultTimeLimit: categoryTime })
        toast.success('Category added successfully!')
      }
      setIsAddEditOpen(false)
      setEditingCategoryId
      setEditingCategoryId(null)
    } catch (error) {
      toast.error('Failed to process image!')
    }
  }

  const handleAddQuestion = (category: string) => {
    setSelectedCategory(category)
    setIsQuestionModalOpen(true)
  }

  return (
    <>
      <Header>
        <PageTitle>Manage Categories</PageTitle>
        <Button label="+ Add New Category" onClick={handleAddCategory} />
      </Header>

      <Grid>
        {categories.map((cat) => (
          <Card key={cat.id}>
            <CategoryHeader>
              <ImageContainer>
                <Image
                  loading="lazy"
                  src={cat.imgSrc || '/placeholder.svg'}
                  alt={`${cat.title} Icon`}
                />
              </ImageContainer>
              <TextContent>
                <h3>{cat.title}</h3>
                <p>{cat.totalQuestions} Questions</p>
              </TextContent>
            </CategoryHeader>

            <ActionButtons>
              <ActionButton $color="#00d4ff" onClick={() => handleEditCategory(cat)}>
                <FaEdit />
              </ActionButton>

              <ActionButton
                $color="#10b981"
                onClick={() => {
                  navigate('/admin/questions', {
                    state: { category: cat.title.toLowerCase() },
                  })
                }}
              >
                <FaEye />
              </ActionButton>

              <ActionButton $color="#ef4444" onClick={() => confirmDeleteCategory(cat.id)}>
                <FaTrash />
              </ActionButton>

              <ActionButton $color="#8b5cf6" onClick={() => handleAddQuestion(cat.title)}>
                <FaPlus />
              </ActionButton>
            </ActionButtons>
          </Card>
        ))}
      </Grid>

      <Modal
        isOpen={isModalOpen}
        message="Are you sure you want to delete this category? This action cannot be undone."
        onConfirm={handleDeleteCategory}
        onCancel={cancelDeleteCategory}
      />

      <AddQuestionModal
        isOpen={isQuestionModalOpen}
        onClose={() => setIsQuestionModalOpen(false)}
        selectedCategory={selectedCategory}
        isEditing={false}
        editingQuestion={null}
      />

      {isAddEditOpen && (
        <div>
          <CategoryForm
            categoryName={categoryName}
            categoryImage={categoryImage}
            categoryTime={categoryTime}
            isEditing={isEditing}
            onCancel={() => setIsAddEditOpen(false)}
            onSubmit={handleSubmit}
          />
        </div>
      )}
    </>
  )
}

export default Categories
