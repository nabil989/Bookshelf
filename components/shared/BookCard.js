import Image from 'next/image'
export default function BookCard({book, onClick, read, page, signedIn}) {
    return(
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-row hover:shadow-md hover:scale-105 transition-all duration-500 hover:cursor-pointer mb-10" onClick={onClick}>
            {book.imageURL !== "none" ? <Image src={book.imageURL} className = "h-48 w-32 object-cover rounded-md shadow-md"/>
            : 
            <div className = " bg-gradient-to-b from-indigo-300 via-purple-300 to-pink-300 h-48 w-32 object-cover rounded-md shadow-md"/>
            }
            
            <div className="grow p-2 pl-6 flex flex-col space-y-2">
                <div className="text-xl text-gray-700 break-all">
                    {book.title.slice(0,50)}
                </div>
                <div className='text-gray-600'>
                    {book.author}
                </div>
                {signedIn && <a href={book.link} target="_blank" rel="noreferrer">
                    <button className=" bg-indigo-200 rounded-sm text-gray-900 w-auto float-left hover:shadow-md hover:bg-indigo-600  transition-all duration-500 hover:text-white px-4"   
                     onClick={read}>
                        {page ? 
                            parseInt(page) >= parseInt(book.pages) ? "Finished!":
                        `Continue from pg ${page}` 
                        : "Start reading"}
                    </button>
                </a>}
                
            </div>
            <div className="md:w-10">

            </div>
        </div>
    )
}