import Board from "./Board";
import Leaderboard from "../Leaderboard";

const Home = ({loggedIn, setIsLoginModalOpen, user, setIsPostModalOpen}) => {

    return (
        <div
            className="flex flex-1 main-scrollbar overflow-y-auto dark:bg-gray-900 bg-gray-200 pb-8 w-full justify-center space-x-4 sm:space-x-6 sm:px-6 relative">
            <div className="max-w-screen-md w-full">
                <Board
                    loggedIn={loggedIn}
                    user={user}
                    setIsLoginModalOpen={() => setIsLoginModalOpen(true)}/>
            </div>
            <div className="hidden tablet:inline-block w-80 space-y-6 sticky top-0 pt-2 sm:pt-6">
                <div className="w-full dark:bg-gray-800 bg-white rounded-xl shadow-md h-16 flex items-center justify-center px-4">
                    <button onClick={() => setIsPostModalOpen(true)}
                            className="shadow text-lg w-full cursor-pointer rounded-full dark:text-gray-100 text-white font-bold py-1 px-4 bg-gradient-to-r from-red-600 to-yellow-500">
                        Create a post
                    </button>
                </div>
                <Leaderboard user={user}/>

                {/*<div className="h-72 w-full bg-white rounded-xl shadow-md">*/}
                {/*    <div className="p-3">*/}
                {/*        <h1 className="text-center text-xl font-custom font-bold text-3xl">Give me your Money</h1>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}

export default Home;