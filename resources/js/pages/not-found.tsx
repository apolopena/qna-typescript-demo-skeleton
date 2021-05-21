import React from 'react'
import  { useHistory } from 'react-router-dom'

export default function NotFound() {
  const history = useHistory()
  return (
    <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
      <h1>404</h1>
      <p>We could not find the page you were looking for...</p>
      <button className="btn btn-primary" onClick={() => {history.push('/')}}>Go Home</button>
    </div>
  )
}