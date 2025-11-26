import styled, { keyframes } from 'styled-components'
import Tab from './tab'
import { Navigate, useNavigate } from 'react-router-dom'
import LoadingScreen from './loading'
import { useGetCategoriesQuery } from '../store/GameSlice'

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-30px); }
  60% { transform: translateY(-15px); }
`

const Background = styled.div`
  width: 60%;
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  color: #1b1b1b;
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
  cursor: pointer;
`

const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 50%;
`

const RightSide = styled.div`
  width: 50%;
`

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #00ffff;
  animation: ${fadeIn} 1.2s ease-in-out;
  font-style: italic;
  text-shadow:
    0 0 10px #00ffff,
    0 0 20px #00ffff;
`

const TabList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 2rem;
`

const Topics = () => {
  const { data: category = [], isLoading } = useGetCategoriesQuery('')
  const navigate = useNavigate()

  if (isLoading) return <LoadingScreen />


const handleTabClick = (title: string) => {
  navigate(`/note/${title}`)
}

  return (
    <Background>
      <LeftSide>
        <Title onClick={()=>
          navigate('/')
        }>Quiz-me</Title>
        <Subtitle>Discover your potential with Quiz-me!</Subtitle>
      </LeftSide>

      <RightSide>
        <TabList>
          {category.map((tab, index) => (
            <Tab
              onClicked={() => handleTabClick(tab?.title ?? '')}
              key={index}
              type="area"
title={tab.title.toUpperCase()}
              totalQuestions={tab.totalQuestions}
              imgSrc={tab.imgSrc}
            />
          ))}
        </TabList>
      </RightSide>
    </Background>
  )
}

export default Topics
