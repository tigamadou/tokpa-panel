import { Fragment } from 'react'

import { Card, CardBody } from 'reactstrap'

import { useTranslation } from 'react-i18next'

import '@styles/react/libs/react-select/_react-select.scss'

const UserStatsCard = ({ userStats }) => {
  const { t } = useTranslation()

  const getSticker = (value) => {
    if (value >= 800) {
      return `${value} 🚀`
    } else if (value >= 400) {
      return `${value} 👌`
    } else {
      return `${value} 🔻`
    }
  }

  return (
    <Fragment>
      <Card>
        <CardBody>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>{t('title.activity')}</h4>
          <div className='info-container'>
            {userStats !== null ? (
              <ul className='list-unstyled'>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('statistics.last_activity')}:</span>
                  <span>{userStats.last_activity}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('statistics.registration_date')}:</span>
                  <span>{userStats.registration_date}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('statistics.expertise_level')}:</span>
                  <span>{userStats.expertise_level}</span>
                </li>
                <li className='mb-75'>
                  <span className='fw-bolder me-25'>{t('statistics.average_session_duration')}:</span>
                  <span>{userStats.average_session_duration}</span>
                </li>
              </ul>
            ) : null}
          </div>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <h4 className='fw-bolder border-bottom pb-50 mb-1'>{t('title.statistics')}</h4>
          <div className='info-container'>
            {userStats !== null ? (
              <div className="row">
                <div className="col-md-6">
                  <ul className='list-unstyled'>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>{t('statistics.followers')}:</span>
                      <span>{getSticker(userStats.followers)}</span>
                    </li>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>{t('statistics.number_of_words_written')}:</span>
                      <span>{getSticker(userStats.number_of_words_written)}</span>
                    </li>

                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>{t('statistics.number_of_published_articles')}:</span>
                      <span>{getSticker(userStats.number_of_published_articles)}</span>
                    </li>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>{t('statistics.number_of_views')}:</span>
                      <span>{getSticker(userStats.number_of_views)}</span>
                    </li>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>{t('statistics.number_of_comments')}:</span>
                      <span>{getSticker(userStats.number_of_comments)}</span>
                    </li>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>{t('statistics.number_of_shares')}:</span>
                      <span>{getSticker(userStats.number_of_shares)}</span>
                    </li>
                    <li className='mb-75'>
                      <span className='fw-bolder me-25'>{t('statistics.number_of_favorites')}:</span>
                      <span>{getSticker(userStats.number_of_favorites)}</span>
                    </li>
                  </ul>
                </div>
              </div>

            ) : null}
          </div>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default UserStatsCard
