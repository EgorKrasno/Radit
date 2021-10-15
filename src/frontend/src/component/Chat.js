import {BiMessageSquareAdd, FiSettings, GiChicken, IoClose, IoCloseOutline, IoSend} from "react-icons/all";
import ChatMessage from "./ChatMessage";
import {useState} from "react";

const Chat = ({client, messages, setMessages, user}) => {
    const [currentMessage, setCurrentMessage] = useState('');
    const [recipient, setRecipient] = useState('');

    const sendPrivateMessage = (e) => {
        console.log(recipient);
        e.preventDefault();
        client.current.sendMessage('/app/sendPrivateMessage', JSON.stringify({
            type: 'message',
            recipient: recipient,
            message: currentMessage,
        }));

        setMessages((prev) => {
            setMessages([...prev, {
                type: 'message',
                recipient: recipient,
                message: currentMessage,
            }]);
        })
        setCurrentMessage('');
    }

    return (
        <div className="absolute bottom-0 right-12">
            <div className="h-450 w-550 dark:bg-gray-800 shadow-xl bg-white rounded-t-2xl">
                <div className="flex h-full">
                    {/* Users */}
                    <div
                        className="flex h-full bg-gray-50 w-48 rounded-tl-2xl border-r dark:bg-gray-700 dark:border-gray-500 border-gray-200">
                        <div className="flex flex-col w-full">
                            <div className="px-4 py-3 flex items-center justify-between">
                                <h1 className="text-lg font-bold">Chat</h1>
                                <BiMessageSquareAdd className="text-blue-500 cursor-pointer" size={22}/>
                            </div>
                            <div
                                className="flex flex-col">
                                <div
                                    onClick={() => setRecipient('admin')}
                                    className="flex items-center bg-gray-200 px-3 py-3 space-x-1.5">
                                    <div className="bg-green-500 shadow rounded-full flex items-center justify-center p-1">
                                        <GiChicken className="text-white w-6 h-6"/>
                                    </div>
                                    <div className="flex w-full cursor-pointer">
                                        Admin
                                    </div>
                                </div>
                                <div
                                    onClick={() => setRecipient('user69')}
                                    className="flex items-center bg-gray-200 px-3 py-3 space-x-1.5">
                                    <div className="bg-green-500 shadow rounded-full flex items-center justify-center p-1">
                                        <GiChicken className="text-white w-6 h-6"/>
                                    </div>
                                    <div className="flex w-full cursor-pointer">
                                        User69
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Chat box */}
                    <div className="flex flex-col flex-1 rounded-tr-2xl h-full">
                        {/* Chat box navbar */}
                        <div
                            className="w-full border-b dark:border-gray-500 border-gray-200 flex items-center px-4">
                            <div className="flex w-full justify-between items-center h-full">
                                <div className="flex h-12 items-center">
                                    <p className="dark:text-gray-100 text-sm font-bold cursor-pointer">Username</p>
                                </div>
                                <div className="flex text-gray-400 items-center space-x-1">
                                    <FiSettings className="cursor-pointer" size={18}/>
                                    <IoCloseOutline className="cursor-pointer" size={28}/>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col overflow-y-hidden h-full">
                            <div className="overflow-y-auto bg-white flex flex-col comments mr-0.5 mt-0.5 h-full">
                                <div className="flex flex-grow"/>

                                {(messages !== null && messages.length > 0) &&
                                messages.map((m) => <ChatMessage
                                    message={m} user={user}/>)}

                            </div>
                            <form
                                onSubmit={sendPrivateMessage}
                                className="flex items-center h-12 pl-2 pb-3 pr-4 mt-4">
                                <input
                                    type="text"
                                    className={`rounded-full text-sm border-transparent flex-1 appearance-none mr-3 py-2.5 px-5 dark:bg-gray-800 bg-gray-100 dark:text-gray-100 text-gray-700 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none`}
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="Message"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                />
                                <button type="submit">
                                    <IoSend
                                        className={`${currentMessage.trim().length > 0 ? "text-blue-500 cursor-pointer" : "text-blue-200 cursor-default"} transition duration-500`}
                                        size={24}/>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;