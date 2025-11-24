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

const glowEffect = keyframes`
  0%, 100% {
    text-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 20px #00ffff;
  }
  50% {
    text-shadow: 0 0 15px #00ffff, 0 0 25px #00ffff, 0 0 40px #00ffff;
  }
`

const Card = styled.button<{ isCorrect?: boolean; isWrong?: boolean }>`
  background: #1a1a3e; /* Dark background for contrast */
  font-family: 'Fredoka One', cursive;
  border-radius: 12px;
  padding: 14px 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  font-size: 1rem;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  position: relative;
  backdrop-filter: blur(10px);
  box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);

  ${({ isCorrect }) =>
    isCorrect &&
    `
    border: 2px solid #00ff00;
    color: #00ff00;
  `}

  ${({ isWrong }) =>
    isWrong &&
    `
    border: 2px solid #ff0055;
    color: #ff0055;
  `}

  &:hover, &:focus {
    box-shadow: 0 0 8px rgba(170, 50, 255, 0.5);
    transform: translateY(-5px);
    animation: ${glowEffect} 1.5s ease-in-out infinite;
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
  color: #1a1a3e;
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
    color: #00ffff;
  }
  p:last-child {
    color: #00ffff;
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
