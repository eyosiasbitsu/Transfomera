import React from 'react'
import Image from 'next/image'
const ChatBot = () => {
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


                <div className="flex flex-col border-t-[1px] p-4 gap-4 border-b-[1px] border-slate-200 h-96">
                  <p className="px-4 p-2 border-slate-200 border-2 self-end rounded-md">Ask me anything</p>
                  <p className="bg-blue-500 text-white px-4 p-2 rounded-md self-start">Hello There </p>
                </div>

                <div className="flex gap-4 w-full items-center py-1">
                    <input 
                    placeholder="Write your message"
                    className="p-1 border-none focus:outline-none"
                    />
                    <button className="px-2">
                      <Image src="/images/Technician/sendMessage.svg" width={30} height={30} alt="send message icon"/>
                    </button>
                </div>
                
            </div>
  )
}

export default ChatBot