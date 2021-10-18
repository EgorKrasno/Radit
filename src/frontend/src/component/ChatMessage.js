import {GiChicken} from "react-icons/all";

const ChatMessage = ({message, user}) => {

    return (
        <>
            {message.recipient !== user ?
                <div className=" flex mr-3 mt-1.5 mb-1.5 self-end">
                    <div
                        className="dark:bg-blue-500 dark:ring-gray-800 border-transparent text-sm ring-1 ring-gray-200 ring-opacity-75 rounded-2xl ml-20 mr-1.5 mb-0.5 mt-1 px-3 py-1.5 shadow-md">
                        <p className="rounded-2xl dark:text-white text-gray-900">{message['message']}</p>
                    </div>
                    <div
                        className="bg-green-500 shadow-md rounded-full flex items-center justify-center self-end p-1">
                        <GiChicken className="text-white w-6 h-6"/>
                    </div>
                </div>
                :
                <div className="flex ml-3 mt-1.5 mb-1.5 self-start">
                    <div
                        className="bg-red-500 shadow-md rounded-full flex items-center justify-center self-end p-1">
                        <GiChicken className="text-white w-6 h-6"/>
                    </div>
                    <div
                        className="border-transparent text-sm ring-1 dark:ring-gray-400 ring-gray-200 ring-opacity-75 rounded-2xl mr-20 ml-1.5 mb-0.5 mt-1 px-3 py-1.5 shadow-md">
                        <p className="rounded-2xl dark:text-gray-100 text-gray-900">{message['message']}</p>
                    </div>
                </div>
            }
        </>
    )
}

export default ChatMessage;




