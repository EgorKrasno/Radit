import {useState} from "react";

const Admin = ({client}) => {
    const [globalMessage, setGlobalMessage] = useState('');
    const [privateMessage, setPrivateMessage] = useState('');
    const [recipient, setRecipient] = useState('');

    const sendPrivateMessage = (e) => {
        e.preventDefault();
        client.current.sendMessage('/app/sendPrivateMessage', JSON.stringify({
            recipient: recipient,
            message: privateMessage,
        }));
        setPrivateMessage('');
    }

    const blastEm = (e) => {
        e.preventDefault();
        client.current.sendMessage('/app/blastAll', globalMessage)
        setGlobalMessage('');
    };

    return (
        <div className="dark:bg-gray-900 bg-gray-200 flex-1">
            <div className="flex flex-col">
                <div className="dark:bg-gray-800 bg-white w-80 m-6 p-4 rounded-xl shadow-md">
                    <h1 className="dark:text-gray-100 text-gray-900 text-center font-bold text-xl pb-1">Everyone</h1>
                    <form className="mt-2 space-y-4 w-full" onSubmit={blastEm}>
                        <input
                            className="flex-1  rounded-lg border-transparent flex-1 appearance-none w-full py-2.5 px-3 dark:bg-gray-800 bg-white dark:text-gray-100 text-gray-700 dark:placeholder-gray-500 placeholder-gray-400 shadow text-base focus:outline-none focus:ring-2 ring-1 dark:ring-gray-700 ring-gray-200 dark:focus:ring-yellow-500 focus:ring-yellow-500"
                            placeholder="Global message"
                            value={globalMessage}
                            onChange={e => setGlobalMessage(e.target.value)}
                        />
                        <button
                            className={`'opacity-75 cursor-default'} shadow-md w-full cursor-pointer rounded-full text-white focus:outline-none font-bold text-lg p-1.5 bg-gradient-to-r from-red-600 to-yellow-500`}>
                            Global Send
                        </button>
                    </form>
                </div>

                <div className="dark:bg-gray-800 bg-white w-80 m-6 p-4 rounded-xl shadow-md">
                    <h1 className="dark:text-gray-100 text-gray-900 text-center font-bold text-xl pb-1">Private</h1>
                    <form className="mt-2 space-y-4 w-full" onSubmit={sendPrivateMessage}>
                        <input
                            className="flex-1  rounded-lg border-transparent flex-1 appearance-none w-full py-2.5 px-3 dark:bg-gray-800 bg-white dark:text-gray-100 text-gray-700 dark:placeholder-gray-500 placeholder-gray-400 shadow text-base focus:outline-none focus:ring-2 ring-1 dark:ring-gray-700 ring-gray-200 dark:focus:ring-yellow-500 focus:ring-yellow-500"
                            placeholder="User"
                            value={recipient}
                            onChange={e => setRecipient(e.target.value)}
                        />
                        <input
                            className="flex-1 rounded-lg border-transparent flex-1 appearance-none w-full py-2.5 px-3 dark:bg-gray-800 bg-white dark:text-gray-100 text-gray-700 dark:placeholder-gray-500 placeholder-gray-400 shadow text-base focus:outline-none focus:ring-2 ring-1 dark:ring-gray-700 ring-gray-200 dark:focus:ring-yellow-500 focus:ring-yellow-500"
                            placeholder="Private message"
                            value={privateMessage}
                            onChange={e => setPrivateMessage(e.target.value)}
                        />
                        <button
                            className={`'opacity-75 cursor-default'} shadow-md w-full cursor-pointer rounded-full text-white focus:outline-none font-bold text-lg p-1.5 bg-gradient-to-r from-red-600 to-yellow-500`}>
                            Private Send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Admin;