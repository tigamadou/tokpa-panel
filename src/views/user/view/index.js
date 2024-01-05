// ** React Imports
import { useParams, Link, useLocation } from 'react-router-dom'

// ** Reactstrap Imports
import { Row, Col, Alert } from 'reactstrap'

// ** User View Components
import UserTabs from './Tabs'
import PlanCard from './PlanCard'
import UserInfoCard from './UserInfoCard'
import UserStatsCard from './UserStatsCard'

// ** Styles
import '@styles/react/apps/app-users.scss'

const UserView = () => {
  // ** Store Vars
  const location = useLocation()
  const { state } = location
  // ** Hooks
  const { id } = useParams()

  // ** Get suer on mount

  // const [active, setActive] = useState('1')

  // const toggleTab = tab => {
  //   if (active !== tab) {
  //     setActive(tab)
  //   }
  // }

  const getRandomValue = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const randomStats = {
    number_of_published_articles: getRandomValue(100, 1000),
    number_of_views: getRandomValue(10000, 50000),
    number_of_comments: getRandomValue(500, 2000),
    number_of_shares: getRandomValue(200, 1000),
    number_of_favorites: getRandomValue(100, 500),
    average_views_per_article: getRandomValue(1000, 5000),
    average_comments_per_article: getRandomValue(50, 200),
    average_shares_per_article: getRandomValue(20, 100),
    average_favorites_per_article: getRandomValue(10, 50),
    registration_date: "15 Janvier 2023 à 6h03",
    last_activity: "21 Septembre à 21h10",
    followers: getRandomValue(500, 2000),
    reputation: getRandomValue(999, 1700),
    expertise_level: "Intermediate",
    number_of_words_written: getRandomValue(100000, 500000),
    bounce_rate: getRandomValue(10, 60),
    average_session_duration: getRandomValue(30, 120)
  }

  return state !== null && state !== undefined ? (
    <div className='app-user-view'>
      <Row>
        {/* Colonne UserInfoCard */}
        <Col xl='5' lg='6' >
          <UserInfoCard key={state.id} selectedUser={state} />
        </Col>

        {/* Colonne UserStatsCard */}
        <Col xl='7' lg='6' >
          <UserStatsCard userStats={randomStats} />
        </Col>
      </Row>
    </div>
  ) : (
    <Alert color='danger'>
      <h4 className='alert-heading'>User not found</h4>
      <div className='alert-body'>
        User with id: {id} doesn't exist. Check list of all Users: <Link to='/user/list'>Users List</Link>
      </div>
    </Alert>
  )
}
export default UserView
