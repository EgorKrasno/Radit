import {Fragment} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {BiTrash, GiChicken, GiCobra, GiCupcake, GiHolyGrail, GiTrashCan, IoClose, RiAliensFill} from "react-icons/all";

function GiAlie(props) {
    return null;
}

const AwardModal = ({isOpen, closeModal}) => {

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
                        className="inline-block max-w-lg overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                        <IoClose className="m-3 h-8 w-8 text-gray-900 cursor-pointer"/>
                        <div className="px-8 pb-5">

                            {/*<BiTrash className="self-center w-full w-20 h-20 text-red-500 mb-3" />*/}
                            <Dialog.Title
                                as="h3"
                                className="text-3xl font-bold text-center text-gray-900 font-custom"
                            >
                                Award
                            </Dialog.Title>
                            <div className="flex space-x-1">

                                <div className="hover:bg-yellow-50 rounded-xl p-3 group cursor-pointer">
                                    <div className="flex flex-col justify-center items-center">
                                        <GiHolyGrail className="text-yellow-400 group-hover:animate-award" size={50}/>
                                        <p className="text-sm">Holy Grail</p>
                                        <p className="text-xs text-gray-600">$0.99</p>
                                    </div>
                                </div>

                                <div className="hover:bg-pink-50 rounded-xl p-3 group cursor-pointer">
                                    <div className="flex flex-col justify-center items-center">
                                        <GiCupcake className="text-pink-500 group-hover:animate-award" size={50}/>
                                        <p className="text-sm">Cupcake</p>
                                        <p className="text-xs text-gray-600">$0.99</p>
                                    </div>
                                </div>

                                <div className="hover:bg-yellow-50 rounded-xl p-3 group cursor-pointer">
                                    <div className="flex flex-col justify-center items-center">
                                        <GiTrashCan className="text-yellow-800 group-hover:animate-award" size={50}/>
                                        <p className="text-sm">Trash</p>
                                        <p className="text-xs text-gray-600">$0.99</p>
                                    </div>
                                </div>
                                <div className="hover:bg-purple-50 rounded-xl p-3 group cursor-pointer">
                                    <div className="flex flex-col justify-center items-center">
                                        <RiAliensFill className="text-purple-800 group-hover:animate-award" size={50}/>
                                        <p className="text-sm">Zucked</p>
                                        <p className="text-xs text-gray-600">$5.99</p>
                                    </div>
                                </div>


                            </div>
                            <div className="flex justify-between space-x-6 mt-3">
                                {/*<button*/}
                                {/*    onClick={closeModal}*/}
                                {/*    className="text-gray-600 shadow-md w-24 cursor-pointer rounded-full focus:outline-none text ring-2 ring-gray-300">*/}
                                {/*    Cancel*/}
                                {/*</button>*/}
                                <button
                                    onClick={() => {
                                        // handleDelete();
                                        console.log("Clicked Award Ok");
                                        closeModal();
                                    }}
                                    className="shadow-md w-full cursor-pointer rounded-full text-white focus:outline-none text p-1.5 bg-gradient-to-r from-red-600 to-yellow-500">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    </Transition>);
}

export default AwardModal;