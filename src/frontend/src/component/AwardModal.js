import {Fragment, useEffect, useState} from "react";
import {Dialog, Transition} from "@headlessui/react";
import {IoArrowBack, IoClose} from "react-icons/all";
import Award from "./Award";
import {awards} from "../data/Awards";
import Checkout from "./Checkout";

const AwardModal = ({isOpen, closeModal}) => {
    const [awardSelected, setAwardSelected] = useState(null);

    useEffect(() => {
        if (isOpen) setAwardSelected(null);
    }, [isOpen]);

    const handleAwardClick = (award) => {
        setAwardSelected(award);
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={() => {
                    closeModal();
                }}
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
                            className="inline-block max-w-lg overflow-hidden align-middle transition-all transform bg-white shadow-xl rounded-2xl divide-y divide-gray-200">
                            <div className="flex mx-3 mt-3 mb-3 items-center justify-between">
                                {awardSelected ?
                                    <IoArrowBack onClick={()=>setAwardSelected(null)}
                                                 className=" h-7 w-7 text-gray-900 cursor-pointer"/>
                                    :
                                    <IoClose onClick={closeModal} className=" h-7 w-7 text-gray-900 cursor-pointer"/>
                                }

                                <Dialog.Title
                                    as="h3"
                                    className=" text-2xl font-bold text-center text-gray-900"
                                >
                                    Awards
                                </Dialog.Title>
                                <div className="h-7 w-7 invisible"/>
                            </div>
                            {awardSelected !== null ?
                                <div className="flex flex-col justify-center items-center p-5 w-72">
                                    <div className="flex flex-col items-center">
                                        {awardSelected.icon()}
                                        <p className="text">{awardSelected.name}</p>
                                        <p className="text-sm text-gray-600">${awardSelected.price}</p>
                                    </div>
                                    <div className="w-full"><Checkout name={awardSelected.name}
                                                                      handleClose={closeModal}
                                                                      amount={awardSelected.cents}
                                                                      awardId={awardSelected.key}/></div>
                                </div>
                                :
                                <div className="flex flex-wrap items-start justify-center my-3">
                                    {awards.map((a) => <Award key={a.key} handleAwardClick={handleAwardClick}
                                                              award={a}/>)}
                                </div>
                            }
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>

    );
}

export default AwardModal;