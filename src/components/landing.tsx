"use client"

import styled, { keyframes } from "styled-components"
import { useNavigate } from "react-router-dom"
import Button from "./button"

const LandingWrapper = styled.div`
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  text-align: center;
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle at 20% 50%, rgba(0, 255, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 80%, rgba(0, 255, 200, 0.1) 0%, transparent 50%);
    pointer-events: none;
  }
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
    text-shadow:
      0 0 10px #00ffff,

  }
  40% {
    transform: translateY(-30px);
    text-shadow:
      0 0 20px #00ffff,

  }
  60% {
    transform: translateY(-15px);
    text-shadow:
      0 0 15px #00ffff,
  }
`

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 900;
  margin: 0;
  color: #00ffff;
  font-family: 'Fredoka One', sans-serif;
  display: inline-block;
  animation: ${bounce} 2s infinite;
  letter-spacing: 2px;
  z-index: 10;
  position: relative;
`

const Subtitle = styled.p`
  font-size: 0.9rem;
  margin-bottom: 3rem;
  color: #00ffff;
  font-style: italic;
  max-width: 600px;
  text-shadow:
    0 0 10px #00ffff,
    0 0 20px #00ffff;
  z-index: 10;
  position: relative;
  font-weight: 500;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  z-index: 10;
  position: relative;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
    max-width: 300px;
  }
`

const pulseGlow = keyframes`
  0%, 100% {
    box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff, 0 0 15px #0099ff, inset 0 0 5px rgba(0, 255, 255, 0.2);
  }
  50% {
    box-shadow: 0 0 15px #00ffff, 0 0 25px #00ffff, 0 0 35px #0099ff, inset 0 0 10px rgba(0, 255, 255, 0.3);
  }
`

const FloatingShape = styled.div`
  position: absolute;
  opacity: 0.15;
  font-size: 8rem;
  pointer-events: none;
  animation: float 20s infinite linear;
  filter: drop-shadow(0 0 10px #00ffff) drop-shadow(0 0 20px #0099ff);
  z-index: 1;

  @keyframes float {
    0% {
      transform: translateY(0) translateX(0) rotate(0deg);
    }
    50% {
      transform: translateY(-100px) translateX(100px) rotate(180deg);
    }
    100% {
      transform: translateY(0) translateX(0) rotate(360deg);
    }
  }
`

const GridBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  pointer-events: none;
  z-index: 0;
`

const LandingPage = () => {
  const navigate = useNavigate()

  return (
    <LandingWrapper>
      <GridBackground />

      {/* Decorative floating shapes with neon glow */}
      <FloatingShape style={{ top: "10%", left: "10%" }}>✨</FloatingShape>
      <FloatingShape style={{ bottom: "20%", right: "15%" }}>🎮</FloatingShape>
      <FloatingShape style={{ top: "50%", left: "5%" }}>⚡</FloatingShape>

      <Title>Quiz-me</Title>
      <Subtitle>Test your knowledge, track your progress, and master any topic with fun and engaging quizzes!</Subtitle>

      <ButtonGroup>
        <Button label="I'm a Student" onClick={() => navigate("/topics")} />
        <Button label="I'm an Admin" onClick={() => navigate("/admin")} />
      </ButtonGroup>
    </LandingWrapper>
  )
}

export default LandingPage
