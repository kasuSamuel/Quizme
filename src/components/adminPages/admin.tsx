import { useEffect } from 'react'
import { FaHome, FaListAlt, FaQuestionCircle, FaSignOutAlt } from 'react-icons/fa'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

const DashboardWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
  overflow: hidden;
`

const Sidebar = styled.div`
  width: 15%;
  background: linear-gradient(180deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 2rem 1.5rem;
  box-shadow: 4px 0 30px rgba(0, 0, 0, 0.5);
  border-right: 2px solid #00d4ff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 212, 255, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: #00d4ff;
    border-radius: 4px;

    &:hover {
      background: #00a8cc;
    }
  }
`

const glow = keyframes`
  0%, 100% { text-shadow: 0 0 10px #00d4ff, 0 0 20px #00d4ff; }
  50% { text-shadow: 0 0 20px #00d4ff, 0 0 30px #00d4ff, 0 0 40px #00d4ff; }
`

const SidebarTitle = styled.h2`
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

const NavItem = styled.div<{ $active?: boolean }>`
  padding: 1rem 1.5rem;
  margin: 0.8rem 0;
  border-radius: 8px;
  cursor: pointer;
  background: ${(props) =>
    props.$active ? 'linear-gradient(90deg, #00d4ff, #0099cc)' : 'transparent'};
  transition: all 0.3s ease;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.95rem;
  border: 2px solid ${(props) => (props.$active ? '#00d4ff' : 'transparent')};
  color: ${(props) => (props.$active ? '#fff' : '#b0b0b0')};

  &:hover {
    background: ${(props) =>
      props.$active ? 'linear-gradient(90deg, #00d4ff, #0099cc)' : 'rgba(0, 212, 255, 0.1)'};
    color: #00d4ff;
    transform: translateX(8px);
    border-color: #00d4ff;
  }

  svg {
    font-size: 1.2rem;
  }
`

const MainContent = styled.div`
  width: 85%;
  padding: 2rem 3rem;
  overflow-y: auto;
  background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 212, 255, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: #00d4ff;
    border-radius: 5px;

    &:hover {
      background: #00a8cc;
    }
  }
`

const Admin = () => {
  const navigate = useNavigate()
  const location = useLocation()

  // Redirect to /admin/dashboard if at /admin
  useEffect(() => {
    if (location.pathname === '/admin') {
      navigate('/admin/dashboard')
    }
  }, [location.pathname, navigate])

  return (
    <DashboardWrapper>
      <Sidebar>
        <SidebarTitle>Quiz-Me</SidebarTitle>

        <NavItem
          onClick={() => navigate('/admin/dashboard')}
          $active={location.pathname === '/admin/dashboard'}
        >
          <FaHome /> Dashboard
        </NavItem>

        <NavItem
          onClick={() => navigate('/admin/categories')}
          $active={location.pathname === '/admin/categories'}
        >
          <FaListAlt /> Categories
        </NavItem>

        <NavItem
          onClick={() => navigate('/admin/questions')}
          $active={location.pathname === '/admin/questions'}
        >
          <FaQuestionCircle /> Questions
        </NavItem>

        <NavItem onClick={() => navigate('/')} style={{ marginTop: 'auto' }}>
          <FaSignOutAlt /> Logout
        </NavItem>
      </Sidebar>

      <MainContent>
        <Outlet />
      </MainContent>
    </DashboardWrapper>
  )
}

export default Admin
