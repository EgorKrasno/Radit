import {
    AiFillWechat,
    BiMessageSquareAdd,
    FiSettings,
    GiChicken,
    IoCloseOutline,
    IoSend
} from "react-icons/all";
import ChatMessage from "./ChatMessage";
import {useEffect, useRef, useState} from "react";
import {RadioGroup} from "@headlessui/react";
import {createNewConversation, getAllUsers, getConversations, getMessages, viewConversation} from "../service/service";
import toast from "react-hot-toast";

const Chat = ({client, newMessage, user, closeChat}) => {
    const bottomMarker = useRef(null);
    const [conversations, setConversations] = useState([]);
    const [allUsers, setAllUsers] = useState([]);
    const [createConversationMode, setCreateConversationMode] = useState(false);
    const [activeConversation, setActiveConversation] = useState(null);
    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [selected, setSelected] = useState(null);

    //Scroll down when a new web socket message is received
    useEffect(() => {
        executeScroll();
    }, [messages]);

    useEffect(() => {
        if (Object.keys(newMessage).length === 0) return;

        //No conversations yet and received a message
        if (conversations.length === 0) {
            async function fetchData() {
                try {
                    const response = await getConversations(user);
                    setConversations(response.data);
                    console.log(response.data);
                    setActiveConversation(response.data[0]);
                } catch (e) {
                    console.log('Failed to get conversations');
                }
            }

            fetchData();
            return;
        }

        // Conversations List is not empty
        let conversation = conversations.find((item) => item.id === newMessage.conversationId);

        //Received new message in current active conversation
        if (newMessage.conversationId === activeConversation.id) {
            setMessages((prev) => {
                setMessages([...prev, newMessage]);
            })
            async function handleView() {
                try {
                    await viewConversation(activeConversation.id);
                    console.log("Sending " + activeConversation.id);
                } catch (e) {
                    console.log("Failed to view notification");
                }
            }
            handleView();

        } else if (conversation === undefined) { //Other user intiated a new conversation, reload conversations
            async function fetchData() {
                try {
                    const response = await getConversations(user);
                    console.log(response.data);
                    setConversations(response.data);

                } catch (e) {
                    console.log('Failed to get conversations');
                }
            }

            fetchData();
        } else {
            turnOnNotification(newMessage.conversationId);
        }
    }, [newMessage])

    //Creation conversation mode swap
    useEffect(() => {
        if (!user) return;
        console.log("Create Conversation Hook Activated");

        async function fetchData() {
            if (createConversationMode) {
                try {
                    const response = await getAllUsers();

                    let allUsers = response.data;
                    const usersInConversation = conversations.map((c) => c.user);

                    setAllUsers(allUsers.filter((u) => !usersInConversation.includes(u) && u !== user));
                } catch (e) {
                    console.log("Failed to get user list");
                }
            } else {
                try {
                    const response = await getConversations(user);
                    setConversations(response.data);
                    setActiveConversation(response.data[0]);
                    setSelected(response.data[0].user);
                    await handleNewActiveConversation(response.data[0])
                } catch (e) {
                    console.log('Failed to get conversations');
                }
            }
        }

        fetchData();
    }, [createConversationMode]);


    const handleNewActiveConversation = async (conversation) => {
        if (!activeConversation) {
            setSelected(conversation.user);
        }

        try {
            const response = await getMessages(conversation.id);
            setMessages(response.data);

            // Because the spread operator does not preserve the order, sad
            setConversations(async (prev) => {
                let newConversations = [];
                for (let item of prev) {
                    if (item.id === conversation.id) {
                        newConversations.push({...item, viewed: true});
                        await handleViewConversation(conversation.id);
                    } else {
                        newConversations.push(item);
                    }
                }
                setConversations(newConversations);
            })
        } catch (e) {
            toast.error("Failed to get messages");
        }
    }

    const createConversation = async (userToAdd) => {
        try {
            const response = await createNewConversation(userToAdd);
            setConversations(response.data);
        } catch (e) {
            console.log("Failed to create new conversation");
        }
    }

    const executeScroll = () => {
        if (bottomMarker !== null) {
            bottomMarker.current.scrollIntoView({block: 'end'});
        }
    }

    const sendPrivateMessage = (e) => {
        e.preventDefault();
        client.current.sendMessage('/app/sendPrivateMessage', JSON.stringify({
            type: 'message',
            recipient: activeConversation.user,
            conversationId: activeConversation.id,
            message: currentMessage,
        }));

        //Add just sent message to list
        setMessages((prev) => {
            setMessages([...prev, {
                type: 'message',
                recipient: activeConversation.user,
                message: currentMessage,
            }]);
        })
        setCurrentMessage('');
    }

    const handleViewConversation = async (id) => {
        try {
            await viewConversation(id);
        } catch (e) {
            console.log("Failed to view notification");
        }
    }

    const turnOnNotification = (id) => {
        setConversations((prev) => {
            let newConversations = [];
            for (let item of prev) {
                if (item.id === id) {
                    newConversations.push({...item, viewed: false});
                } else {
                    newConversations.push(item);
                }
            }
            setConversations(newConversations);
        })
    }

    return (
        <div className="absolute bottom-0 right-12">
            <div className="h-450 w-550 dark:bg-gray-800 shadow-xl bg-white rounded-t-2xl">
                <div className="flex h-full">

                    {/* Conversation List / Creation Mode */}
                    <div
                        className="flex h-full bg-gray-50 w-2/6 rounded-tl-2xl border-r dark:bg-gray-700 dark:border-gray-500 border-gray-200">
                        <div className="flex flex-col w-full">
                            <div className="pl-4 pr-2 py-2 flex items-center justify-between">
                                <h1 className="text-lg font-bold dark:text-gray-100 text-gray-900">{createConversationMode ? "Add to Chat" : "Chat"}</h1>
                                <div
                                    onClick={() => {
                                        setCreateConversationMode(!createConversationMode);
                                    }}
                                    className="rounded-full p-2 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer">
                                    {!createConversationMode ?
                                        <BiMessageSquareAdd className="text-blue-500" size={22}/> :
                                        <AiFillWechat className="text-blue-500" size={22}/>}

                                </div>
                            </div>
                            {createConversationMode ?
                                <>
                                    <div className="overflow-y-auto comments">
                                        {(allUsers !== null && allUsers.length > 0) &&
                                        allUsers.map((username) => <div
                                            key={username}
                                            onClick={async () => {
                                                await createConversation(username);
                                                setCreateConversationMode(false);
                                            }}
                                            className={`dark:bg-gray-700 bg-gray-50 dark:hover:bg-gray-600 hover:bg-gray-200 cursor-pointer flex items-center px-3 py-3 space-x-1.5`}>
                                            <div
                                                className="bg-green-500 shadow rounded-full flex items-center justify-center p-1">
                                                <GiChicken className="text-white w-6 h-6"/>
                                            </div>
                                            <div
                                                className="dark:text-gray-100 text-gray-900 flex w-full cursor-pointer capitalize">
                                                {username}
                                            </div>
                                        </div>)
                                        }</div>
                                </>
                                :
                                <RadioGroup as="div" className="flex flex-col"
                                            value={selected}
                                            onChange={setSelected}>
                                    {(conversations && conversations.length > 0) &&
                                    conversations.map((conversation) =>
                                        <RadioGroup.Option
                                            key={conversation.id}
                                            value={conversation.user}>
                                            {({checked}) => (
                                                <div
                                                    onClick={async () => {
                                                        setActiveConversation(conversation);
                                                        await handleNewActiveConversation(conversation);
                                                    }}
                                                    className={`${checked ? 'dark:bg-gray-600 bg-gray-200' : 'dark:bg-gray-700  bg-gray-50'} dark:hover:bg-gray-500 hover:bg-gray-200 cursor-pointer bg-gray-50 flex items-center px-3 py-3 space-x-1.5`}>
                                                    <div className="relative">
                                                        {!conversation.viewed && <div>
                                                            <div
                                                                className="absolute h-3 w-3 bg-red-500 left-6 rounded-full"/>
                                                            <div
                                                                className="animate-ping absolute h-3 w-3 bg-red-500 left-6 rounded-full opacity-75"/>
                                                        </div>}
                                                        <div
                                                            className=" bg-green-500 shadow rounded-full flex items-center justify-center p-1">
                                                            <GiChicken className="text-white w-6 h-6"/>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className="dark:text-gray-100 text-gray-900 flex w-full cursor-pointer capitalize">
                                                        {conversation.user}
                                                    </div>
                                                </div>
                                            )}
                                        </RadioGroup.Option>)
                                    }
                                </RadioGroup>
                            }
                        </div>
                    </div>

                    {/* Chat box */}
                    <div className="flex w-4/6 flex-col flex-1 rounded-tr-2xl h-full">

                        {/* Chat box navbar */}
                        <div
                            className="w-full border-b dark:border-gray-500 border-gray-200 flex items-center px-4">
                            <div className="flex w-full justify-between items-center h-full">
                                <div className="flex h-12 items-center">
                                    <p className="dark:text-gray-100 text-sm font-bold cursor-pointer capitalize">{activeConversation && activeConversation.user}</p>
                                </div>
                                <div className="flex text-gray-400 items-center space-x-1">
                                    <FiSettings className="cursor-pointer" size={18}/>
                                    <IoCloseOutline
                                        onClick={closeChat}
                                        className="cursor-pointer" size={28}/>
                                </div>
                            </div>
                        </div>
                        <div className="dark:bg-gray-800 bg-white flex flex-col overflow-y-hidden h-full">
                            <div
                                className="dark:bg-gray-800 overflow-y-auto bg-white flex flex-col comments mr-0.5 mt-0.5 h-full">
                                <div className="flex flex-grow"/>

                                {(activeConversation && messages) &&
                                messages.map((m) => <ChatMessage message={m} user={user}/>
                                )}
                                <div className="flex-none" ref={bottomMarker}/>

                            </div>
                            <form
                                onSubmit={sendPrivateMessage}
                                className="flex items-center h-12 pl-2 pb-3 pr-4 mt-4">
                                <input
                                    type="text"
                                    className={`rounded-full text-sm border-transparent flex-1 appearance-none mr-3 py-2.5 px-5 dark:bg-gray-700 bg-gray-100 dark:text-gray-100 text-gray-700 dark:placeholder-gray-500 placeholder-gray-400 focus:outline-none`}
                                    autoComplete="off"
                                    autoFocus
                                    placeholder="Message"
                                    value={currentMessage}
                                    onChange={(e) => setCurrentMessage(e.target.value)}
                                />
                                <button type="submit">
                                    <IoSend
                                        className={`${currentMessage.trim().length > 0 ? "text-blue-500 cursor-pointer" : "dark:text-blue-900 text-blue-200 cursor-default"} transition duration-500`}
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