import React from 'react'

function ErrorMessage(props) {
  return (
    <div>
      <i className='font-bold p-2.5 flex text-xl justify-center'>Failed to load user data{props.error}</i>
    </div>
  )
}

export default ErrorMessage