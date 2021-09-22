import {Dialog, Transition} from "@headlessui/react";
import {Fragment, useState} from "react";
import {createPost} from "../service/service";

const LoginModal = ({closeModal, isOpen, handleLogin}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            handleLogin({username, password});
        } catch (e) {
            console.log(e);
        }
        setUsername("");
        setPassword("");
        closeModal();
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-10 overflow-y-auto"
                onClose={closeModal}
            >
                <div className="min-h-screen px-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-70 transition-opacity"/>
                    </Transition.Child>
                    <span
                        className="inline-block h-screen align-middle"
                        aria-hidden="true"
                    >
              &#8203;
            </span>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <div
                            className="inline-block w-full max-w-lg px-8 py-6 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <Dialog.Title
                                as="h3"
                                className="text-lg font-medium text-center text-gray-900 pb-3"
                            >
                               Login
                            </Dialog.Title>
                            <div className="mt-2 space-y-6">
                                <input type="text"
                                       className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                       placeholder="Username"
                                       onChange={e => setUsername(e.target.value)}
                                />
                                <input type="password"
                                       className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-gray-800 focus:border-transparent"
                                       placeholder="Password"
                                       onChange={e => setPassword(e.target.value)}
                                />
                            </div>


                            <div className="mt-4">
                                <button onClick={submitHandler}
                                        className="w-full cursor-pointer rounded-lg text-white focus:outline-none font-semibold p-2 bg-gradient-to-r from-red-600 to-yellow-500">
                                    Login 🚀
                                </button>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default LoginModal;

