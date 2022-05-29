
export default function BookCard({Title, Author, Page, User, Users}) {
    return(
        <div className="w-1/4 flex flex-row hover:shadow-md hover:scale-105 transition-all duration-700 hover:cursor-pointer">
            <div className="h-48 w-32 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-sm shadow-md">
                
            </div>
            <div className="grow p-2 pl-6 flex flex-col">
                <div className="text-xl text-gray-700'">
                    {Title}
                </div>
                <div className='text-gray-500'>
                    {Author}
                </div>
                
            </div>
        </div>
    )
}