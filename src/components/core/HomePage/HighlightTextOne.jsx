import React from 'react'

const HighlightTextOne = ({text}) => {
  return (
    <span className='text-transparent bg-clip-text bg-gradient-to-r from-[#1E90FF] to-[#00CFFF] font-bold '>
        {" "}
        {text}
    </span>
  )
}

export default HighlightTextOne
