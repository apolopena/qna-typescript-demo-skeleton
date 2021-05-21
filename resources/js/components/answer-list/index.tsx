import React from 'react'

import './styles.css'
import { AnswerData, AnswerListProps } from 'qna-types'
import { AnswerListItem } from '../../components'

const AnswerList = ({ answers, isLoading }: AnswerListProps) => (
  <div className='card'>
    <div className='card-body'>
      {
        answers.map( (item: AnswerData) => (
          <React.Fragment key={item.id}>
            <AnswerListItem item={item} />
            <hr />
          </React.Fragment>
        ))
      }
      {isLoading ? <p>'Loading data...</p> : null}
    </div>
  </div>
)

export default AnswerList