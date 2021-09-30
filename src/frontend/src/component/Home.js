import Board from "./Board";

const Home = ({loadPosts, page, loggedIn, setPage, setIsLoginModalOpen, loading, data}) => {
    return (
        <div className="flex-1 overflow-y-auto bg-gray-200 pb-8 w-full">
            {!(loading || data === null) &&
            <Board data={data}
                   loggedIn={loggedIn}
                   loadPosts={loadPosts}
                   page={page}
                   setPage={setPage}
                   setIsLoginModalOpen={() => setIsLoginModalOpen(true)}/>}
        </div>
    )
}

export default Home;