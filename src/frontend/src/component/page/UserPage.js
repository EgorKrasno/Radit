import {useParams} from "react-router-dom";
import {
    AiOutlineComment,
    GiBindle, GiChicken, GiChiliPepper,
    IoIosImages,
} from "react-icons/all";
import {useEffect, useState} from "react";
import {getUserData} from "../../service/service";
import toast from "react-hot-toast";
import ThemeSwitch from "../ThemeSwitch";


const UserPage = () => {
    const {username} = useParams();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();


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
        <div className="flex-1 bg-gray-200 overflow-y-auto flex justify-center">
            <div className="max-w-screen-md w-full bg-white m-8 p-8 rounded-xl shadow-md">
                {!loading ?
                    <>
                        <div className="m-4 space-y-4 flex flex-col items-center">
                    <span
                        className="w-28 h-28 bg-green-500 rounded-full relative shadow-lg">
                        <div className="absolute top-14 left-14" style={{transform: 'translate(-50%, -50%)',}}>
                            <GiChicken className="text-white" size={80}/>
                        </div>
                    </span>
                            <p className="text-gray-900 font-bold text-3xl capitalize">{username}</p>
                        </div>
                        <div className="mx-16 flex justify-around">
                            <div className="flex items-center flex-col">
                                <p className="font-bold">Spiciness</p>
                                <div className="flex items-center justify-center">
                                    <GiChiliPepper className="text-red-500 mr-1" size={28}/>
                                    <p className="text-gray-600">{data.voteCount}</p>
                                </div>
                            </div>

                            <div className="flex items-center flex-col">
                                <p className="font-bold">Posts</p>
                                <div className="flex items-center justify-center">
                                    <IoIosImages className="text-red-500 mr-1" size={28}/>
                                    <p className="text-gray-600">{data.postCount}</p>
                                </div>
                            </div>

                            <div className="flex items-center flex-col">
                                <p className="font-bold">Comments</p>
                                <div className="flex items-center justify-center">
                                    <AiOutlineComment className="text-red-500 mr-1" size={28}/>
                                    <p className="text-gray-600">{data.commentCount}</p>
                                </div>
                            </div>

                            <div className="flex items-center flex-col">
                                <p className="font-bold">Date Joined</p>
                                <div className="flex items-center justify-center">
                                    <GiBindle className="text-red-500 mr-1" size={28}/>
                                    <p className="text-gray-600">{data.dateCreated}</p>
                                </div>
                            </div>
                        </div>
                        <p className="text-center py-16 text-5xl font-bold text-red-500 animate-bounce">Under Construction</p>
                        <p className="text-center py-16 text-5xl font-bold text-red-500 animate-spin">Go Away</p>
                    </>
                    : <p>Loading</p>}
            </div>
        </div>
    );
}

export default UserPage;