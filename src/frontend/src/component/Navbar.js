import {
    AiFillHome,
    FiChevronDown, GiChiliPepper, GiCoffeeBeans, GiDespair, GiFossil, GiNewShoot,
    GiPerspectiveDiceSixFacesRandom,
    GiTechnoHeart, GoFlame,
    RiHomeHeartFill
} from "react-icons/all";
import SettingsMenu from "./SettingsMenu";
import {Popover, RadioGroup, Transition} from '@headlessui/react'
import {Fragment, useEffect, useState} from 'react'
import {Link, useLocation} from "react-router-dom";
import {sections} from "../data/Data";

const Navbar = ({
                    loggedIn,
                    logout,
                    setIsPostModalOpen,
                    setIsRegisterModalOpen,
                    setIsLoginModalOpen,
                    sort,
                    setSort,
                    setPage,
                    loadPosts
                }) => {
    const [section, setSection] = useState(sections[0]);
    let location = useLocation();

    useEffect(() => {
        const url = location.pathname.slice(1);
        sections.forEach((x) => {
            if (x['name'] === url) setSection(x);
        });

        if (url === null || url === '') {
            setSection(sections[0]);
        }
    }, [location]);


    return (
        <div className="flex w-screen bg-white shadow-sm items-center justify-between h-14 px-8 z-20">
            <div className="flex">
                <div className="cursor-pointer flex items-center text-3xl text-red-500 space-x-1">
                    <GiChiliPepper size={34} className={"text-red-500"}/>
                    <p className="hidden sm:inline-block font-custom">Spicy</p>
                </div>


                <div className="w-full ml-12 border border-gray-200 rounded-lg">
                    <Popover className="relative">
                        <>
                            <Popover.Button
                                className="px-3 py-2">
                                <div className="flex items-center w-56 justify-between">
                                    <div className="flex items-center">
                                        {section.icon()}
                                        <p className="text-gray-900 text-sm">{section.name}</p>
                                    </div>
                                    <FiChevronDown size={18} className="text-gray-900"/>
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
                                    className="absolute z-10 w-full max-w-sm mt-3 transform -translate-x-1/2 left-1/2">
                                    {({close}) => (
                                        <div
                                            className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                            <div className="relative grid gap-8 bg-white p-7">
                                                {sections.map((item) => (
                                                    <Link
                                                        onClick={() => {
                                                            loadPosts(0, "voteCount", item['name']);
                                                            setPage(0);
                                                            setSort('voteCount');
                                                            close();
                                                        }}
                                                        key={item.name}
                                                        to={item.href}
                                                        className="flex items-center py-1 px-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                                    >
                                                        <div
                                                            className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white sm:h-8">
                                                            <item.icon/>
                                                        </div>
                                                        <div className="ml-2">
                                                            <p className="text-sm font-base text-gray-900">
                                                                {item.name}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </Popover.Panel>
                            </Transition>
                        </>

                    </Popover>
                </div>
                <RadioGroup as="div" className="flex items-center" value={sort} onChange={async (e) => {
                    setSort(e);
                    setPage(0);
                    await loadPosts(0, e, section.name);
                }}>
                    <div className="flex flex-row ml-4 space-x-3">
                        <RadioGroup.Option value="voteCount">
                            {({checked}) => (
                                <div
                                    className={`${checked ? 'bg-gradient-to-r from-red-600 to-yellow-500' : 'text-gray-800 border-2 border-yellow-500'} flex items-center cursor-pointer rounded-full text-white font-semibold px-5 h-8`}>
                                    <GoFlame className="mr-1" size={20}/>
                                    <p className="font-custom text-lg">Hot</p>
                                </div>
                            )}
                        </RadioGroup.Option>
                        <RadioGroup.Option value="createdDate">
                            {({checked}) => (
                                <div
                                    className={`${checked ? 'bg-gradient-to-r from-red-600 to-yellow-500' : 'text-gray-800 border-2 border-yellow-500'} flex items-center cursor-pointer rounded-full text-white font-semibold px-5 h-8`}>
                                    <GiNewShoot className="mr-1"/>
                                    <p className='font-bold text-lg'>New</p>
                                </div>
                            )}
                        </RadioGroup.Option>
                    </div>
                </RadioGroup>


            </div>
            <div className="space-x-2">
                {loggedIn ?
                    <div className="flex space-x-4 items-center">
                        <button onClick={() => setIsPostModalOpen(true)}
                                className="cursor-pointer rounded-lg text-white font-semibold py-1.5 px-4 bg-gradient-to-r from-red-600 to-yellow-500">
                            Post 🚀
                        </button>
                        <SettingsMenu handleLogout={logout}/>
                    </div>
                    :
                    <>
                        <button onClick={setIsRegisterModalOpen}
                                className="cursor-pointer rounded-full text-gray-900 font-semibold py-1.5 px-4 border-2 border-red-500">
                            Register
                        </button>

                        <button onClick={setIsLoginModalOpen}
                                className="cursor-pointer rounded-full text-gray-900 font-semibold py-1.5 px-4 border-2 border-red-500">
                            Login
                        </button>
                    </>
                }
            </div>
        </div>);
}

export default Navbar;