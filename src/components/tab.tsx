import styled, { keyframes } from 'styled-components'
import React from 'react'

export interface TabProps {
  type?: 'area' | 'answer'
  title?: string
  totalQuestions?: number
  imgSrc?: string
  option?: string
  optionIndex?: number
  isCorrect?: boolean
  isSelected?: boolean
  isWrong?: boolean
  onClicked?: () => void
}

const fadeInUp = keyframes`
  from { opacity: 0; transform: translate3d(0, 20px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
`

const Card = styled.button<{ isCorrect?: boolean; isWrong?: boolean }>`
  background: #fff;
  font-family: 'Fredoka One', cursive;
  border-radius: 12px;
  padding: 14px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
  font-size: 1rem;
  color: #555;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  position: relative;

  ${({ isCorrect }) =>
    isCorrect &&
    `
    border: 2px solid #2ecc71;
    box-shadow: 0px 0px 10px #2ecc7188;
    color: green;
  `}

  ${({ isWrong }) =>
    isWrong &&
    `
    border: 2px solid #e74c3c;
    box-shadow: 0px 0px 10px #e74c3c88;
    color: red;
  `}

  &:hover, &:focus {
    box-shadow: 0 0 8px rgba(170, 50, 255, 0.5);
    transform: translateY(-5px);
  }
`

const BgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  width: 50px;
  height: 50px;
`

const Image = styled.img`
  width: 30px;
  height: 30px;
  object-fit: cover;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  animation: ${fadeInUp} 0.5s ease forwards;
  p {
    margin: 0;
  }
  p:first-child {
    font-weight: 600;
    font-size: 1.1rem;
    color: #1a202c;
  }
  p:last-child {
    color: #888;
    font-size: 0.9rem;
  }
`

const Tab: React.FC<TabProps> = ({
  type = 'area',
  title,
  totalQuestions,
  imgSrc,
  option,
  optionIndex,
  isCorrect,
  isWrong,
  onClicked,
}) => {
  const letter = optionIndex !== undefined ? String.fromCharCode(65 + optionIndex) : ''

  return (
    <Card onClick={onClicked} isCorrect={isCorrect} isWrong={isWrong}>
      {type === 'area' ? (
        <>
          {imgSrc && (
            <BgContainer>
              <Image loading="lazy" src={imgSrc} alt={`${title} Icon`} />
            </BgContainer>
          )}
          <TextContainer>
            <p>{title}</p>
            <p>{totalQuestions} Questions</p>
          </TextContainer>
        </>
      ) : (
        <>
          <BgContainer>{letter}</BgContainer>
          <TextContainer>
            <p>{option}</p>
          </TextContainer>
          {isCorrect ? '✓' : isWrong ? '✗' : ''}
        </>
      )}
    </Card>
  )
}

export default Tab
