import React from 'react'

const HighlightText = ({ text }) => {
  return (
    <span className='font-bold text-amber-500 dark:text-yellow-50'>
      {text}
    </span>
  )
}

export default HighlightText
