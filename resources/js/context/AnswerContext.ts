import React from 'react'
import { AnswerContextT } from 'qna-types'

const AnswerContext = React.createContext<Partial<AnswerContextT>>({})

export default AnswerContext