import React from 'react'
import {useAuthContext} from '../../context/AuthContext';
import useConversation from '../../zustand/useConversation';
import { extractTime } from '../../utils/extractTimme';
const Message = ({message}) => {

   const {authUser}=useAuthContext();
   const {selectedConversation}=useConversation();
   const fromMe = message.senderId == authUser._id;
   const formattedTime = extractTime(message.createdAt);
   const chatClassName = fromMe? 'chat-end':'chat-start';
   const profilePicture = fromMe? authUser.profilePicture: selectedConversation.profilePicture;
   const bgBubbleColor = fromMe? 'bg-blue-500': ''; //setting message backgroud color;
   const shakeClass = message.shouldShake ? 'shake' : "";
   
  return (
    <div className={`chat ${chatClassName}`}>
<div className='chat-image avatar'>
  <div className='w-10 rounded-full'>
<img 
alt='talwind CSS chat bubble component'
src={profilePicture}
/>
  </div>
</div>
<div className={`chat-bubble text-white ${bgBubbleColor} ${shakeClass} pb-2`}>{message.message}</div>
<div className={'chat-footer opacity-50 text-xs flex gap-1 items-center'}>{formattedTime}</div>
    </div>
  )
}

export default Message