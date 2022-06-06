import Link from "next/link"
export default function BookCard({Title, Author, Page, addedBy, Users, onClick, image, link}) {
    return(
        <div className="w-1/4 flex flex-row hover:shadow-md hover:scale-105 transition-all duration-500 hover:cursor-pointer" onClick={onClick}>
            <img src={image} className = "h-48 w-32 object-contain rounded-md shadow-md"/>
            <div className="grow p-2 pl-6 flex flex-col space-y-2">
                <div className="text-xl text-gray-700'">
                    {Title}
                </div>
                <div className='text-gray-600'>
                    {Author}
                </div>
                <a href={link} target="_blank">
                <button className=" bg-indigo-200 rounded-sm text-gray-900 w-auto float-left hover:shadow-md hover:bg-indigo-600  transition-all duration-500 hover:text-white px-4"   
                    >Continue from pg {Page}
                    </button>
                </a>
            </div>
        </div>
    )
}