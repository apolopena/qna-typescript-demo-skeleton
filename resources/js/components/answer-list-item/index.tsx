import React from 'react'
import { AnswerData } from 'qna-types'

type Props = {
  item: AnswerData
}

const AnswerListItem = ({ item }: Props) => (
  <div className='row'>
    <div className='col-sm-9'>
      <h5>{item.description}</h5>
    </div>
  </div>
)
export default AnswerListItem