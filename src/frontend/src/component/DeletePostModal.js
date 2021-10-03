import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {BiTrash} from "react-icons/all";

const DeletePostModal = ({isOpen, closeModal, handleDelete}) => {

    return (<Transition appear show={isOpen} as={Fragment}>
        <Dialog
            as="div"
            className="fixed inset-0 z-50 overflow-y-auto"
            onClose={closeModal}
        >
            <div className="px-4 text-center">
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
                        className="inline-block max-w-lg px-12 py-6 overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">

                        <BiTrash className="self-center w-full w-20 h-20 text-red-500 mb-3" />
                        <Dialog.Title
                            as="h3"
                            className="text-3xl font-bold text-center text-gray-900 pb-3"
                        >
                            Delete the spicy?
                        </Dialog.Title>
                        <div className="flex justify-between space-x-6 mt-3">
                            <button
                                onClick={closeModal}
                                className="text-gray-600 shadow-md w-24 cursor-pointer rounded-full focus:outline-none text ring-2 ring-gray-300">
                                Cancel
                            </button>
                            <button
                                onClick={()=>{
                                    handleDelete();
                                    closeModal();
                                }}
                                className="shadow-md w-24 cursor-pointer rounded-full text-white focus:outline-none text p-1.5 bg-gradient-to-r from-red-600 to-yellow-500">
                                Delete
                            </button>
                        </div>

                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>);
}

export default DeletePostModal;