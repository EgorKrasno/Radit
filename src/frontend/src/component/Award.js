
const Award = ({award, handleAwardClick}) => {
    return (
        <div
            onClick={()=>{
                handleAwardClick(award);
            }}
            className={`hover:bg-${award.color}-50 rounded-xl p-3 group cursor-pointer ring-1 ring-gray-200 shadow self-end m-2`}>
            <div className="flex flex-col justify-center items-center">
                {award.icon()}
                <p className="text-sm">{award.name}</p>
                <p className="text-xs text-gray-600">${award.price}</p>
            </div>
        </div>
    );
}


export default Award;
