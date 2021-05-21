import React, { useState, useEffect } from 'react'

import { QuestionData } from 'qna-types'

import { Header, QuestionForm, QuestionList } from '../components'
import { useDataApi } from '../hooks'

export function QuestionsContainer() {
  const [waiting, setWaiting] = useState(true);
  const payload = useDataApi<QuestionData[]>('/api/questions')

  useEffect( () => {
    let loadTimer = setTimeout(() => setWaiting(false), 250);
    return () => {
      clearTimeout(loadTimer);
    };
  }, [payload])
  
  return (
    <>
      <Header />
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-xs-12 col-md-8 col-xl-6'>
            { <QuestionForm /> }
            <p />
            {
              (payload.isLoading && !waiting) && <p className='text-center'>Loading data...</p> || 
              payload.error && (
                <div className='text-center error'>
                    {`Internal Error ${payload.error}`}
                </div> ) || 
              <QuestionList payload={payload} /> 
            }
          </div>
        </div>
      </div>
    </>
  )
}