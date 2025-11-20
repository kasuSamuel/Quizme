import { useEffect, useState } from 'react'
import styled from 'styled-components'

type TimerProps = {
  duration?: number
  onTimeUp: () => void
}

const TimerWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
`

const Circle = styled.svg`
  transform: rotate(-90deg);
`

const Number = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: bold;
  color: #2d3748;
`

const Timer: React.FC<TimerProps> = ({ duration = 10, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp() //
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, onTimeUp])

  const progress = (timeLeft / duration) * 283

  return (
    <TimerWrapper>
      <Circle width="120" height="120">
        <circle cx="60" cy="60" r="45" stroke="#E2E8F0" strokeWidth="10" fill="none" />
        <circle
          cx="60"
          cy="60"
          r="45"
          stroke="#805AD5"
          strokeWidth="10"
          fill="none"
          strokeDasharray="283"
          strokeDashoffset={283 - progress}
          style={{ transition: 'stroke-dashoffset 1s linear' }}
        />
      </Circle>
      <Number>{timeLeft}</Number>
    </TimerWrapper>
  )
}

export default Timer
