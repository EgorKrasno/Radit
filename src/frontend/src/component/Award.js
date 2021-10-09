
const Award = ({award, handleAwardClick}) => {
    return (
        <div
            onClick={()=>{
                handleAwardClick(award);
            }}
            className={`${award.color} rounded-xl group p-3 cursor-pointer ring-1 dark:ring-gray-700 ring-gray-200 shadow self-end m-2`}>
            <div className="flex flex-col justify-center items-center">
                {award.icon(false)}
                <p className="text-sm dark:text-gray-100 text-gray-900">{award.name}</p>
                <p className="text-xs dark:text-gray-500 text-gray-600">${award.price}</p>
            </div>
        </div>
    );
}

export default Award;
