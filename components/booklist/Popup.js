import BookInfo from "./BookInfo"
export default function Popup({open, toggle, Child}){
    return (
        <div className={`w-screen h-screen bg-gray-300/25 absolute left-0 top-0
            ${open ? " translate-y-0 opacity-100 pointer-events-auto" : "opacity-0 -translate-y-5 pointer-events-none"} 
            transition-all duration-700 z-10`} 
            >
            
            <div className="w-full h-full flex flex-row items-center justify-center">
            
                <div className={`bg-white w-1/2 h-2/3 rounded-md shadow-md p-10 z-10 overflow-auto`} >
                    {Child}
                </div>
                <div className="w-screen h-screen absolute left-0 top-0" onClick={toggle}></div>
            </div>
            
        </div>
    )
}