import React, { memo, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Payload, AnswersPayload, AnswerData } from 'qna-types'

import AnswerContext from '../context/AnswerContext'
import { Header, AnswerForm, AnswerList } from '../components'
import { useDataApi } from '../hooks'

export function AnswersContainer() {
  const { questionId } = useParams<{ questionId: string }>()
  const payload = useDataApi<AnswersPayload>(`/api/questions/${questionId}`)
  const [answers, setAnswers] = useState<AnswerData[]>()

  /*
  // uncomment for debugging
  console.count('render count')
  useEffect(() => {
    console.log(`the value of answers is ${JSON.stringify(answers, null, 2)}`)
    console.log(`the value of payload is ${JSON.stringify(payload, null, 2)}`)
  }, [payload, answers])
  */

  const displayAnswers = (payload: Payload<AnswersPayload>) => {
    if (payload.error) return <div className='cardBody py-4 error mt-1'>{payload.error}</div>
    if (!payload.data) return <></>

    const NoAnswers = () => (
      <div className='cardBody py-4'>
        No answers yet! Be the first to answer by using the form below.
      </div>
    )

    if (answers) {
      return (answers.length > 0)
        ? <AnswerList answers={answers} />
        : NoAnswers()
    }
    
    return (payload.data.answers.length > 0)
      ? <AnswerList answers={payload.data?.answers} />
      : NoAnswers()
  }

  return (
    <>
      <Header />
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card' style={{ border: 'none' }}>
              <div className='card-header'>
                {payload.isLoading ? '' : payload.data?.description}
              </div>
              {displayAnswers(payload)}
            </div>
            <AnswerContext.Provider value={{ answers, setAnswers }}>
              <AnswerForm questionId={Number(questionId)} />
            </AnswerContext.Provider>
          </div>
        </div>
      </div>
    </>
  )
}