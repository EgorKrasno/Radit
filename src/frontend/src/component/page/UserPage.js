import {useParams} from "react-router-dom";
import {
    AiOutlineComment, FiSettings,
    GiBindle, GiChicken, GiChiliPepper,
    IoIosImages,
} from "react-icons/all";
import {useEffect, useState} from "react";
import {getUserData} from "../../service/service";
import toast from "react-hot-toast";
import IconEditorModal from "../modal/IconEditorModal";

const UserPage = () => {
    const {username} = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [iconEditorModal, setIconEditorModal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getUserData(username);
                setData(response.data);
            } catch (ex) {
                toast.error("Failed to get profile");
            }
            setLoading(false);
        }
        fetchData();
    }, []);


    return (
        <>
            <div className="bg-gray-200 dark:bg-gray-900 overflow-y-auto flex-1">
                <div className="flex my-6 pt-2 justify-center">
                    <div className="w-96 dark:bg-gray-800 bg-white rounded-xl shadow-md p-6">
                        {!loading ?
                            <>
                            <span className="flex justify-end"><FiSettings
                                className="cursor-pointer dark:text-gray-400 text-gray-500 h-5 w-5"/></span>


                                <div className="space-y-4 flex flex-col items-center">
                                    <div
                                        className="flex items-center justify-center w-28 h-28 bg-green-500 rounded-full relative shadow-lg">
                                        <GiChicken className="text-white w-18 h-18" size={80}/>
                                    </div>
                                    <p className="dark:text-gray-100 text-gray-900 font-bold text-3xl capitalize">{username}</p>
                                </div>
                                <div className="mx-16 flex flex-col justify-center space-y-6 pt-2">
                                    <div className="flex items-center flex-col">
                                        <p className="dark:text-gray-100 font-bold">Spiciness</p>
                                        <div className="flex items-center justify-center">
                                            <GiChiliPepper className="text-red-500 mr-1" size={28}/>
                                            <p className="dark:text-gray-400 text-gray-600">{data.voteCount}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center flex-col">
                                        <p className="dark:text-gray-100 font-bold">Posts</p>
                                        <div className="flex items-center justify-center">
                                            <IoIosImages className="text-red-500 mr-1" size={28}/>
                                            <p className="dark:text-gray-400 text-gray-600">{data.postCount}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center flex-col">
                                        <p className="dark:text-gray-100 font-bold">Comments</p>
                                        <div className="flex items-center justify-center">
                                            <AiOutlineComment className="text-red-500 mr-1" size={28}/>
                                            <p className="dark:text-gray-400 text-gray-600">{data.commentCount}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center flex-col">
                                        <p className="dark:text-gray-100 font-bold">Date Joined</p>
                                        <div className="flex items-center justify-center">
                                            <GiBindle className="text-red-500 mr-1" size={28}/>
                                            <p className="dark:text-gray-400 text-gray-600">{data.dateCreated}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                            : <p>Loading</p>}
                    </div>
                    <div className="w-96 dark:bg-gray-800 bg-white mx-6 rounded-xl shadow-md">
                        <div className="m-8 space-y-6">
                            <button
                                onClick={(() => setIconEditorModal(true))}
                                className='shadow-md w-full cursor-pointer rounded-full text-white focus:outline-none font-bold text-lg p-1.5 bg-gradient-to-r from-red-600 to-yellow-500'>
                                Edit Icon
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <IconEditorModal isOpen={iconEditorModal}
                       closeModal={() => setIconEditorModal(false)}/>
        </>
    );
}

export default UserPage;