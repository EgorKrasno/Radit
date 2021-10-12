import {
    AiOutlinePlus,
    FiChevronDown, GiChiliPepper, GiNewShoot,
    GoFlame, GrUserAdmin, RiAdminLine,
} from "react-icons/all";
import SettingsMenu from "./SettingsMenu";
import {Popover, RadioGroup, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {Link, useHistory, useLocation} from "react-router-dom";
import {sections} from "../../data/Data";
import ThemeSwitch from "../ThemeSwitch";

const Navbar = ({
                    loggedIn,
                    logout,
                    setIsPostModalOpen,
                    setIsRegisterModalOpen,
                    setIsLoginModalOpen,
                    userData,
                }) => {

    let location = useLocation();
    let history = useHistory();
    const [selected, setSelected] = useState("voteCount")
    const [section, setSection] = useState(sections.filter(s => s.name === location.pathname.substring(3))[0] || sections[0]);

    //Weird hack to handle the back button
    useEffect(() => {
        setSection(sections.filter(s => s.name === location.pathname.substring(3))[0] || sections[0]);
        setSelected(location.search.split('=')[1] || 'voteCount')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [location])

    return (
        <div className="flex w-screen dark:bg-gray-800 bg-white shadow-sm items-center justify-between h-14 px-2 lg:px-4 z-20">
            <div className="flex">
                <Link
                    to="/"
                    className="cursor-pointer flex items-center text-3xl text-red-500 space-x-1">
                    <GiChiliPepper size={34} className="text-red-500"/>
                    <p className="hidden sm:inline-block font-custom ">Spicy</p>
                </Link>


                <div className="w-full ml-3 lg:ml-12 border dark:border-gray-600 border-gray-200 rounded-lg">
                    <Popover className="relative">
                        <>
                            <Popover.Button
                                className="px-3 py-2">
                                <div className="flex items-center w-12 md:w-56 justify-between">
                                    <div className="flex items-center">
                                        {section !== null ? section.icon() : sections[0].icon()}
                                        <p className="hidden md:inline-block dark:text-gray-100 text-gray-900 text-sm">{section !== null ? section.name : sections[0].name}</p>
                                    </div>
                                    <FiChevronDown size={18} className="dark:text-gray-100 text-gray-900"/>
                                </div>
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel
                                    className="absolute z-10 w-40 md:w-full max-w-sm mt-3 transform -translate-x-1/2 left-1/2">
                                    {({close}) => (
                                        <div
                                            className="overflow-hidden rounded-lg shadow-lg ring-1 dark:ring-gray-700 ring-black ring-opacity-5 ">
                                            <div className="relative grid gap-8 dark:bg-gray-800 bg-white p-3 md:p-7">
                                                {sections.map((item) => (
                                                    <button
                                                        key={item.name}
                                                        onClick={() => {
                                                            if (section === item.name) {
                                                                return
                                                            }
                                                            history.push({
                                                                pathname: `/j/${item.name}`,
                                                                search: `?sortBy=voteCount`
                                                            });
                                                            setSection(item);
                                                            setSelected('voteCount');
                                                            close();
                                                        }}

                                                        className="flex items-center py-1 px-1 md:px-2 -m-3 transition duration-150 ease-in-out rounded-lg dark:hover:bg-gray-700 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                    >
                                                        <div
                                                            className="flex items-center justify-center flex-shrink-0 w-10 h-10 md:h-8">
                                                            <item.icon/>
                                                        </div>
                                                        <div className="md:ml-2">
                                                            <p className="text-md font-base dark:text-gray-100 text-gray-900">
                                                                {item.name}
                                                            </p>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </Popover.Panel>
                            </Transition>
                        </>

                    </Popover>
                </div>
                <RadioGroup as="div" className="flex items-center" value={selected} onChange={async (v) => {
                    history.push({
                        pathname: `/j/${section.name}`,
                        search: `?sortBy=${v}`
                    })
                    setSelected(v);
                }}>
                    <div className="flex flex-row items-center justify-center ml-4 space-x-3">
                        <RadioGroup.Option value="voteCount">
                            {({checked}) => (
                                <div
                                    className={`${checked ? 'bg-gradient-to-r from-red-600 to-yellow-500 dark:text-gray-50' : 'dark:text-white text-gray-800 border-2 border-yellow-500'} items-center justify-center shadow flex items-center cursor-pointer rounded-full text-white font-bold w-9 sm:w-24 h-9`}>
                                    <GoFlame className="sm:mr-1" size={20}/>
                                    <p className="font-custom text-lg hidden sm:inline-block">Hot</p>
                                </div>
                            )}
                        </RadioGroup.Option>
                        <RadioGroup.Option value="createdDate">
                            {({checked}) => (
                                <div
                                    className={`${checked ? 'bg-gradient-to-r from-red-600 to-yellow-500 dark:text-gray-50' : 'dark:text-white text-gray-900 border-2 border-yellow-500'} items-center justify-center shadow flex items-center cursor-pointer rounded-full text-white font-bold  w-9 sm:w-24 h-9`}>
                                    <GiNewShoot className="sm:mr-1"/>
                                    <p className='font-bold text-lg hidden sm:inline-block'>New</p>
                                </div>
                            )}
                        </RadioGroup.Option>
                    </div>
                </RadioGroup>


            </div>
            <div className="space-x-2">
                {loggedIn ?
                    <div className="flex items-center">
                        <ThemeSwitch/>
                        <div onClick={() => setIsPostModalOpen(true)}
                                className="text-yellow-500 h-8 w-8 border-2 border-yellow-500 rounded-full flex items-center justify-center cursor-pointer mx-3 hover:border-red-500 hover:text-red-500">
                            <AiOutlinePlus className="h-6 w-6"/>
                        </div>
                        <SettingsMenu userData={userData} handleLogout={logout}/>
                    </div>

                    :
                    <>
                        <button onClick={setIsRegisterModalOpen}
                                className="cursor-pointer rounded-full dark:text-gray-100 text-gray-900 font-semibold py-1.5 px-4 border-2 border-yellow-500">
                            Register
                        </button>

                        <button onClick={setIsLoginModalOpen}
                                className="cursor-pointer rounded-full dark:text-gray-100 text-gray-900 font-semibold py-1.5 px-4 border-2 border-yellow-500">
                            Login
                        </button>
                    </>
                }
            </div>
        </div>);
}

export default Navbar;