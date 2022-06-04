
export default function AddCard({onClick}) {
    return(
            <div className="h-48 w-32 border-gray-200 border-2 rounded-md flex flex-col items-center justify-center align-middle hover:shadow-md hover:scale-105 transition-all duration-500 hover:cursor-pointer" onClick={onClick}>   
                <div className="text-2xl text-gray-500 font-bold">+</div>
            </div>
    )
}