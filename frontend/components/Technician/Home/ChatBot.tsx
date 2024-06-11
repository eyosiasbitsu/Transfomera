import {useState} from 'react'
import { useChatMutation } from '@/app/GlobalRedux/Features/chat/chatApi'
import Image from 'next/image'

const ChatBot = () => {
  const[sendMessage, { isLoading, isError}] = useChatMutation()
  const [message, setMessage] = useState<string>('')
  const [responseMessage, setResponseMessage] = useState<string | null>() 
  const [request, setRequest] = useState<string>("Hello, How can i assist you today?")

  const handleMessage = async ()=>{
      setRequest(message)
      const mess = message
      setMessage("")
      const response = await sendMessage({request:mess})
      console.log(response)
      setResponseMessage(response.data? response.data.response : 'no result')
  }

  const handleKeyDown = (e:React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key === 'Enter'){
      handleMessage()
    }
  }

  return (
    <div className="bg-white p-4 rounded-xl flex flex-col gap-4">
        <div className="flex gap-2 items-center">
                    <div className="p-2 rounded-full border-[1px] border-slate-200">
                        <Image src="/images/Technician/chatIcon.svg" width={30} height={30} alt="chat icon"/>
                    </div>

                    <div className="flex flex-col">
                      <h1 className="text-slate-500">Chatbot</h1>
                      <p className="text-slate-400">Support Agent</p>
                    </div>
         </div>


         <div className="flex flex-col border-t-[1px] p-4 gap-4 border-b-[1px] border-slate-200 h-96 overflow-y-auto">
            {request && (
              <p className="px-4 py-2 border-slate-200 border-2 self-end rounded-md max-w-xs break-words">
                {request}
              </p>
            )}
            {isLoading ? (
              <p className="bg-gray-500 text-white px-4 py-2 rounded-md self-start max-w-xs break-words">...</p>
            ) : isError ? (
              <p className="bg-red-500 text-white px-4 py-2 rounded-md self-start max-w-xs break-words">Something went wrong</p>
            ) : (
              responseMessage && (
                <p className="bg-blue-500 text-white px-4 py-2 rounded-md self-start max-w-xs break-words">
                  {responseMessage}
                </p>
              )
            )}
      </div>

                <div className="flex gap-4 w-full items-center py-1">
                    <input 
                    placeholder="Write your message"
                    className="p-1 border-none focus:outline-none"
                    onChange={(e)=>setMessage(e.target.value)}
                    value={message}
                    onKeyDown={(e)=>handleKeyDown(e)}
                    />
                    <button className="px-2" onClick={handleMessage}>
                      <Image src="/images/Technician/sendMessage.svg" width={30} height={30} alt="send message icon"/>
                    </button>
                </div>
                
      </div>
  )
}

export default ChatBot