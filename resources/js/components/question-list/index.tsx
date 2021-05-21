import React from 'react'
import { Link } from 'react-router-dom';

import './styles.css'
import { QuestionData, QuestionListProps } from 'qna-types'
import { QuestionListItem } from '../../components'


const QuestionList = ({ payload, isLoading }: QuestionListProps) => {
  return (
    <div className='card'>
      <div className='card-header'>Questions</div>
      <div className='card-body'>
        { isLoading ? <p>'Loading data...</p> : null }
        {
          payload.data?.map(( item: QuestionData ) => (
            <React.Fragment key={item.id}>
              <Link to={`/answers/${item.id}`}>
                <QuestionListItem item={item} />
              </Link>
              <hr />
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}
export default QuestionList