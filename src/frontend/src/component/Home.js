import Board from "./Board";

const Home = ({page, loggedIn, setPage, setIsLoginModalOpen, sort, section, refresh, user}) => {


    return (
        <div
            className="flex flex-1 overflow-y-auto bg-gray-200 pb-8 w-full justify-center space-x-4 sm:space-x-6 pt-4 sm:pt-6 sm:px-6">
            <div className="max-w-screen-md w-full">
                <Board
                    loggedIn={loggedIn}
                    user={user}
                    refreshBoard={refresh}
                    sort={sort}
                    section={section}
                    page={page}
                    setPage={setPage}
                    setIsLoginModalOpen={() => setIsLoginModalOpen(true)}/>
            </div>
            <div className="hidden tablet:inline-block w-64 space-y-6">
                <div className="h-72 w-full bg-white rounded-xl shadow-md">
                    <div className="p-3">
                        <h1 className="text-center text-xl font-bold">Top</h1>
                    </div>
                </div>
                <div className="h-72 w-full bg-white rounded-xl shadow-md">
                    <div className="p-3">
                        <h1 className="text-center text-xl font-bold">Buy Peppers</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;