import {Menu, Transition} from "@headlessui/react";
import {Fragment} from "react";
import {BiDotsHorizontalRounded, BiTrash} from "react-icons/all";

const PostMenu = ({handleDelete}) => {

    return(
        <Menu as="div" className="relative">
            <Menu.Button as="div" className="cursor-pointer"><BiDotsHorizontalRounded
                className="text-gray-600 hover:text-red-500 focus-outline-none"
                size={24}/></Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="bg-white absolute right-0 mt-1 origin-top-right divide-y divide-gray-300 divide-opacity-75 rounded-lg shadow-md focus:outline-none border border-gray-300 border-opacity-75">
                    <Menu.Item as="div">
                        {({active}) => (
                            <button
                                onClick={handleDelete}
                                className={`${
                                    active ? 'bg-gray-100 rounded-t-none' : ''
                                } px-4 group flex rounded-md items-center w-full py-2.5 text-base`}
                            >
                                <BiTrash className="mr-3 text-red-500"/>
                                Delete
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>

        </Menu>
    );
}

export default PostMenu;