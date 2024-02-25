import React from 'react'

const Message = () => {
  return (
    <div className='chat chat-end'>
<div className='chat-image avatar'>
  <div className='w-10 rounded-full'>
<img 
alt='talwind CSS chat bubble component'
src={'https://avatar.iran.liara.run/public/boy?userName=johndoe3@gmail.com'}
/>
  </div>
</div>
<div className={'chat-bubble text-white bg-blue-500'}>hey hi, whatsupp?</div>
<div className={'chat-footer opacity-50 text-xs flex gap-1 items-center'}>12:50</div>
    </div>
  )
}

export default Message