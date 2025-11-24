import styled, { keyframes } from 'styled-components'
import { useGetCategoriesQuery } from '../store/GameSlice'

const Header = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`

const PageTitle = styled.h1`
  font-size: 3rem;
  color: #00d4ff;
  font-family: 'Fredoka One', sans-serif;
  font-weight: bold;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.5);
  margin-bottom: 0.5rem;
  letter-spacing: 1px;
`

const Subtitle = styled.p`
  color: #b0b0b0;
  font-size: 1.1rem;
  letter-spacing: 0.5px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2.5rem;
  animation: fadeIn 0.6s ease-in;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`

const Card = styled.div`
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  padding: 2.5rem;
  border: 2px solid #00d4ff;
  box-shadow:
    0 0 20px rgba(0, 212, 255, 0.2),
    inset 0 0 20px rgba(0, 212, 255, 0.05);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

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
    transform: translateY(-10px);
    box-shadow:
      0 0 40px rgba(0, 212, 255, 0.4),
      inset 0 0 20px rgba(0, 212, 255, 0.1);
    border-color: #00ffff;

    &::before {
      opacity: 1;
    }
  }

  h3 {
    color: #00d4ff;
    font-size: 1.1rem;
    margin-bottom: 1.5rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: 'Fredoka One', sans-serif;
  }

  h2 {
    font-size: 4rem;
    font-weight: bold;
    background: linear-gradient(135deg, #00d4ff, #00ffff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin: 0;
    animation: ${pulse} 2s infinite;
  }
`

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff; }
  50% { text-shadow: 0 0 20px #00d4ff, 0 0 30px #00d4ff, 0 0 40px #00d4ff; }
`
export const Loading = styled.h2`
  font-size: 1.8rem;
  text-align: center;
  color: #00d4ff;
  font-family: 'Fredoka One', 'Arcade', sans-serif;
  font-weight: bold;
  margin-bottom: 2rem;
  animation: ${glow} 2s infinite;
  letter-spacing: 2px;
  text-transform: uppercase;
`


const Dashboard = () => {
  const { data: category = [], isLoading } = useGetCategoriesQuery('')

  if (isLoading) return <Loading>Loading...</Loading>

  const totalQuestions = category.reduce((acc, c) => acc + c.totalQuestions, 0)

  return (
    <>
      <Header>
        <PageTitle>Welcome, Admin!</PageTitle>
        <Subtitle>Manage your quiz empire with power and precision</Subtitle>
      </Header>

      <Grid>
        <Card>
          <h3>Total Categories</h3>
          <h2>{category.length}</h2>
        </Card>
        <Card>
          <h3>Total Questions</h3>
          <h2>{totalQuestions}</h2>
        </Card>
        <Card>
          <h3>Status</h3>
          <h2 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Active</h2>
        </Card>
      </Grid>
    </>
  )
}

export default Dashboard
