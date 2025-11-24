'use client'

import type React from 'react'
import { useState } from 'react'
import styled, { keyframes } from 'styled-components'

// Props
interface CategoryFormProps {
  categoryName: string
  categoryImage: string
  isEditing: boolean
  onCancel: () => void
  onSubmit: (title: string, imageSrc: string | File) => void
}

// Animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const zoomIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 255, 0.4), inset 0 0 10px rgba(0, 255, 255, 0.1); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.6), inset 0 0 15px rgba(0, 255, 255, 0.15); }
`

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.8) 0%, rgba(10, 20, 40, 0.9) 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: ${fadeIn} 0.3s ease;
  backdrop-filter: blur(5px);
`

const FormContainer = styled.form`
  background: linear-gradient(135deg, #0a1428 0%, #1a2d4d 100%);
  padding: 30px;
  border-radius: 12px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 2px solid rgba(0, 255, 255, 0.3);
  animation:
    ${zoomIn} 0.3s ease,
    ${glowPulse} 3s ease-in-out infinite;
  box-sizing: border-box;
  box-shadow:
    0 0 30px rgba(0, 255, 255, 0.2),
    inset 0 0 20px rgba(0, 255, 255, 0.05);
`

const FormTitle = styled.h4`
  font-size: 20px;
  color: #00ffff;
  margin-bottom: 20px;
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.6);
  letter-spacing: 1px;
  font-weight: 600;
`

const FormField = styled.div`
  width: 100%;
  margin-bottom: 18px;
`

const Label = styled.label`
  display: block;
  color: #00ffff;
  margin-bottom: 6px;
  font-size: 13px;
  text-shadow: 0 0 5px rgba(0, 255, 255, 0.4);
  letter-spacing: 0.5px;
`

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border-radius: 6px;
  border: 2px solid rgba(0, 255, 255, 0.3);
  background-color: rgba(10, 30, 60, 0.6);
  color: #00ffff;
  outline: none;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(0, 255, 255, 0.4);
  }

  &:focus {
    border-color: #00ffff;
    box-shadow:
      0 0 15px rgba(0, 255, 255, 0.5),
      inset 0 0 10px rgba(0, 255, 255, 0.1);
    background-color: rgba(10, 30, 60, 0.8);
  }
`

const HelperText = styled.p`
  font-size: 12px;
  color: rgba(0, 255, 255, 0.6);
  margin-top: 6px;
  text-shadow: 0 0 3px rgba(0, 255, 255, 0.3);
`

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 15px;
  margin-top: 20px;
`

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.5);
  }

  &:active {
    transform: translateY(-1px);
  }
`

const CancelButton = styled(Button)`
  background: linear-gradient(135deg, #ff0040 0%, #cc0033 100%);
  color: white;
  border: 2px solid rgba(255, 0, 64, 0.5);
  box-shadow: 0 0 15px rgba(255, 0, 64, 0.3);

  &:hover {
    box-shadow: 0 0 25px rgba(255, 0, 64, 0.6);
    border-color: rgba(255, 0, 64, 0.8);
  }
`

const SubmitButton = styled(Button)`
  background: linear-gradient(135deg, #00ff88 0%, #00cc66 100%);
  color: #000;
  border: 2px solid rgba(0, 255, 136, 0.5);
  box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);

  &:hover {
    box-shadow: 0 0 25px rgba(0, 255, 136, 0.6);
    border-color: rgba(0, 255, 136, 0.8);
  }
`

const ErrorText = styled.p`
  color: #ff4444;
  font-size: 12px;
  margin-top: -8px;
  text-shadow: 0 0 5px rgba(255, 68, 68, 0.5);
`

const ImagePreview = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid rgba(0, 255, 255, 0.5);
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.3);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 0 25px rgba(0, 255, 255, 0.5);
  }
`

const CategoryForm: React.FC<CategoryFormProps> = ({
  categoryName,
  categoryImage,
  isEditing,
  onCancel,
  onSubmit,
}) => {
  const [name, setName] = useState(categoryName)
  const [imagePreview, setImagePreview] = useState(categoryImage)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim()) {
      setError('Please enter a category name.')
      return
    }

    // Allow empty image only when editing (use existing image)
    if (!imageFile && !isEditing) {
      setError('Please select an image.')
      return
    }

    setError('')
    // Send imageFile if selected, otherwise send the existing imagePreview string
    onSubmit(name, imageFile || imagePreview)
  }

  return (
    <ModalOverlay>
      <FormContainer onSubmit={handleSubmit}>
        <FormTitle>{isEditing ? 'Edit Category' : 'Add Category'}</FormTitle>

        {/* Name */}
        <FormField>
          <Label>Category Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
          />
        </FormField>

        {/* Image Upload */}
        <FormField>
          <Label>Category Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                setImageFile(file)
                setImagePreview(URL.createObjectURL(file))
              }
            }}
          />
          {isEditing && <HelperText>Leave empty to keep existing image</HelperText>}
        </FormField>

        {/* Preview */}
        {imagePreview && <ImagePreview src={imagePreview || '/placeholder.svg'} alt="Preview" />}

        {/* Error */}
        {error && <ErrorText>{error}</ErrorText>}

        {/* Actions */}
        <Actions>
          <CancelButton type="button" onClick={onCancel}>
            Cancel
          </CancelButton>
          <SubmitButton type="submit">{isEditing ? 'Save Changes' : 'Add Category'}</SubmitButton>
        </Actions>
      </FormContainer>
    </ModalOverlay>
  )
}

export default CategoryForm
