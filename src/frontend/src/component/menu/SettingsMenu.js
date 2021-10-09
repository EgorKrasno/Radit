import {Menu, Transition} from "@headlessui/react";
import {FiLogOut, RiAccountCircleFill, FiUser} from "react-icons/all";
import {Fragment} from "react";
import {Link} from "react-router-dom";

const SettingsMenu = ({handleLogout, userData}) => {
    return (
        <Menu as="div" className="relative">
            <Menu.Button as="div" className="cursor-pointer"><RiAccountCircleFill
                className="text-yellow-500 hover:text-red-500 focus-outline-none"
                size={36}/></Menu.Button>
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
                    className="dark:bg-gray-800 bg-white absolute right-0 w-52 mt-3 origin-top-right divide-y dark:divide-gray-700 divide-gray-300 divide-opacity-75 rounded-lg shadow-md focus:outline-none border dark:border-gray-700 border-gray-300 border-opacity-75">

                    <Menu.Item as="div">
                        {({active}) => (
                            <Link className="capitalize"
                                  to={`/user/${userData.username}`}>
                            <button
                                className={`${
                                    active ? 'dark:bg-gray-700 bg-gray-100 rounded-b-none' : ''
                                } px-4 group flex rounded-md items-center w-full py-2 dark:text-gray-100 text-gray-900 text-base`}
                            >
                                <FiUser className="mr-3"/>
                                My Profile
                            </button>
                            </Link>
                        )}
                    </Menu.Item>
                    <Menu.Item as="div">
                        {({active}) => (
                            <button
                                onClick={handleLogout}
                                className={`${
                                    active ? 'dark:bg-gray-700 bg-gray-100 rounded-t-none' : ''
                                } px-4 group flex rounded-md items-center w-full py-2.5 dark:text-gray-100 text-gray-900 text-base`}
                            >
                                <FiLogOut className="mr-3"/>
                                Logout
                            </button>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>

        </Menu>
    );
}

export default SettingsMenu;