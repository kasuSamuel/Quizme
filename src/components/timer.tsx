import { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import toast from 'react-hot-toast'

const Wrapper = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 100px;
  height: 100px;
`

const Dial = styled.svg`
  width: 100px;
  height: 100px;
  transform: rotate(-90deg);
`

const TimeDisplay = styled.div`
  position: absolute;
  font-size: 1rem;
  font-weight: 700;
  color: #00ffff;
`

interface TimerProps {
  duration?: number
  onExpire?: () => void
}

const Timer = ({ duration = 10, onExpire }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState(duration)
  const toastShownRef = useRef(false)

  const radius = 54
  const circumference = 2 * Math.PI * radius

  useEffect(() => {
    setTimeLeft(duration)
    toastShownRef.current = false
  }, [duration])

  useEffect(() => {
    if (timeLeft === 0) {
      onExpire?.()
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timeLeft, onExpire])

  // Separate effect for the toast notification
  useEffect(() => {
    if (timeLeft === 5 && !toastShownRef.current) {
      toast('Moving to the next question soon!', {
        icon: '🚨',
        duration: 2000,
      })
      toastShownRef.current = true
    }
  }, [timeLeft])

  const dashOffset = circumference * (1 - timeLeft / duration)

  // Format mm:ss
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')

  return (
    <Wrapper>
      <Dial viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} fill="none" stroke="white" strokeWidth={8} />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#00ffff"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.2s linear' }}
        />
      </Dial>

      <TimeDisplay>
        {mm}:{ss}
      </TimeDisplay>
    </Wrapper>
  )
}

export default Timer
