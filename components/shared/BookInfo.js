import ReaderStatus from "../booklist/ReaderStatus"

export default function BookInfo({toggle, book, read, users, open}){
    return (
        <div className="flex flex-row">
            {book.imageURL !== "none" ? 
            <img  src={book.imageURL} className="flex-shrink-0 h-80 w-56 object-cover rounded-sm shadow-md"/>
           
            :
            <div className="flex-shrink-0 h-80 w-56 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-sm shadow-md">
            </div>
            }
            <div className="px-4 pl-8 flex flex-col grow">
                <div className="text-3xl font-bold text-gray-700">
                    {book.title}
                </div>
                <div className="text-xl text-gray-500 font-bold">
                    {book.author} | {`${book.pages} pages`}
                </div>
                <div className="py-4">
                    {book.description}
                </div>
                <a href={book.link} target="_blank">
                    <button className="bg-indigo-200 rounded-sm text-gray-900 w-auto float-left hover:shadow-md hover:bg-indigo-600  transition-all duration-500 hover:text-white"
                    onClick={read}>
                        Continue from pg {book.page}
                    </button>
                </a>
                <div className="text-gray-900 my-4">
                    Added by {book.addedBy}
                </div>
                <ReaderStatus users={users} book = {book} open = {open}></ReaderStatus>
            </div>
        </div>
    )
}