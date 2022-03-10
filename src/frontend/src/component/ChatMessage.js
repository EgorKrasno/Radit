import {GiChicken} from "react-icons/all";

const ChatMessage = ({message, user}) => {

    return (
        <>
            {message.recipient !== user ?

                <div className="flex self-end mt-2 mb-1 mr-1 space-x-1.5">
                    <div
                        className="flex items-center bg-blue-500 dark:ring-gray-800 border-transparent text-sm ring-1 ring-gray-200 ring-opacity-75 rounded-2xl shadow-md px-3 py-1.5">
                        <p className="rounded-2xl text-white break-words" style={{maxWidth:'275px'}}>{message['message']}</p>
                    </div>
                    <div
                        className="bg-green-500 shadow-md rounded-full flex items-center justify-center self-end p-1">
                        <GiChicken className="text-white w-6 h-6"/>
                    </div>
                </div>
                :
                <div className="flex self-start mt-2 mb-1 ml-2 space-x-1.5">
                    <div
                        className="bg-red-500 shadow-md rounded-full flex items-center justify-center self-end p-1">
                        <GiChicken className="text-white w-6 h-6"/>
                    </div>
                    <div
                        className="flex items-center dark:bg-gray-700 border-transparent text-sm ring-1 dark:ring-gray-700 ring-gray-200 ring-opacity-75 rounded-2xl shadow-md px-3 py-1.5">
                        <p className="rounded-2xl dark:text-white text-gray-900 break-words" style={{maxWidth:'275px'}}>{message['message']}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default ChatMessage;




