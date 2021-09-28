import {GiTechnoHeart} from "react-icons/all";
import SettingsMenu from "./SettingsMenu";

const Navbar = ({loggedIn, logout, setIsPostModalOpen, setIsRegisterModalOpen, setIsLoginModalOpen}) => {

    return (
        <div className="flex w-screen bg-white shadow-sm items-center justify-between h-14 px-8 z-20">
        <div className="cursor-pointer flex items-center font-bold text-2xl text-red-500 space-x-2">
            <GiTechnoHeart size={34} className={"text-red-500"}/>
            <p className="hidden sm:inline-block">Radit</p>
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