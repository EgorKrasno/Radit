import {useParams} from "react-router-dom";
import {
    AiOutlineComment,
    GiAbstract047,
    GiBackstab,
    GiBadGnome, GiBindle, GiChicken,
    GiChiliPepper,
    GiCircularSaw, GiGoldBar,
    GiQueenCrown
} from "react-icons/all";

const UserPage = () => {
    const {username} = useParams();
    return (
        <div className="flex-1 bg-gray-200 overflow-y-auto flex justify-center">
            <div className="max-w-screen-md w-full bg-white h-1/3 m-8 p-8 rounded-xl shadow-md">
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
                        <p className="font-bold">Score</p>
                        <div className="flex items-center justify-center">
                            <GiGoldBar className="text-red-500 mr-1" size={28}/>
                            <p className="text-gray-600">25</p>
                        </div>
                    </div>

                    <div className="flex items-center flex-col">
                        <p className="font-bold">Spicys</p>
                        <div className="flex items-center justify-center">
                            <GiChiliPepper className="text-red-500 mr-1" size={28}/>
                            <p className="text-gray-600">25</p>
                        </div>
                    </div>

                    <div className="flex items-center flex-col">
                        <p className="font-bold">Comments</p>
                        <div className="flex items-center justify-center">
                            <AiOutlineComment className="text-red-500 mr-1" size={28}/>
                            <p className="text-gray-600">25</p>
                        </div>
                    </div>

                    <div className="flex items-center flex-col">
                        <p className="font-bold">Date Joined</p>
                        <div className="flex items-center justify-center">
                            <GiBindle className="text-red-500 mr-1" size={28}/>
                            <p className="text-gray-600">September 24, 2021</p>
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default UserPage;