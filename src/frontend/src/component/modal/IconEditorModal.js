import {Fragment} from "react";
import {Dialog, RadioGroup, Transition} from "@headlessui/react";
import {GiChicken, IoClose} from "react-icons/all";


const IconEditorModal = ({isOpen, closeModal}) => {

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
                            className="inline-block w-3/4 h-96 overflow-hidden align-middle transition-all transform dark:bg-gray-900 ring-1 dark:ring-gray-700 bg-white shadow-xl rounded-2xl divide-y dark:divide-gray-700 divide-gray-200">
                            <div className="flex mx-3 mt-3 mb-3 items-center justify-between">
                                <IoClose onClick={closeModal}
                                         className=" h-7 w-7 dark:text-gray-100 text-gray-900 cursor-pointer"/>

                                <Dialog.Title
                                    as="h3"
                                    className=" text-2xl font-bold text-center dark:text-gray-100 text-gray-900"
                                >
                                    Icon Editor
                                </Dialog.Title>
                                <div className="h-7 w-7 invisible"/>


                            </div>
                            <div className="flex flex-col">
                                <div className="flex justify-center pt-4">
                                    <div
                                        className="flex items-center justify-center w-28 h-28 bg-green-500 rounded-full relative shadow-lg">
                                        <GiChicken className="text-white w-18 h-18" size={80}/>
                                    </div>
                                </div>
                                <div>
                                    <h1 className="text-gray-900 pt-4 font-bold text-xl">Icon</h1>
                                    <RadioGroup as="div" className="flex flex justify-center"
                                                value={"test"}
                                                onChange={() => console.log("Test")}>
                                        <RadioGroup.Option
                                            value={"test"}
                                        >
                                            {({checked}) => (
                                                <div
                                                    className={`cursor-pointer flex items-center px-3 py-3`}>
                                                    <div className="relative">
                                                        <div
                                                            className="bg-gray-700 shadow rounded-full flex items-center justify-center p-2">
                                                            <GiChicken className="text-white w-16 h-16"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </RadioGroup.Option>
                                    </RadioGroup>
                                </div>
                            </div>


                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition>
    );
}

export default IconEditorModal;