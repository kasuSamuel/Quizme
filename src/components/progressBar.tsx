import styled, { keyframes } from 'styled-components'

const glowEffect = keyframes`
  0%, 100% {
    box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
  }
  50% {
    box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, 0 0 60px #00ffff;
  }
`

const Container = styled.div`
  width: 100%;
  background: #1a1a3e;
  border-radius: 8px;
  height: 10px;
  overflow: hidden;
`

const Progress = styled.div<{ width: string }>`
  width: ${({ width }) => width};
  height: 100%;
  background: linear-gradient(135deg, #00ff00, #0099ff);
  border-radius: 8px;
  transition: width 0.3s ease;
  animation: ${glowEffect} 1.5s ease-in-out infinite;
  box-shadow: 0 0 15px rgba(0, 255, 255, 0.7);
`

const ProgressBar = ({ current, total }: { current: number; total: number }) => {
  const width = ((current + 1) / total) * 100

  return (
    <Container>
      <Progress width={`${width}%`} />
    </Container>
  )
}

export default ProgressBar
