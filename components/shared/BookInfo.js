//fetch additional book data from google books api
export default function BookInfo({toggle, book}){
    return (
        <div className="flex flex-row">
            <div className="flex-shrink-0 h-80 w-56 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 rounded-sm shadow-md">
            </div>
            <div className="px-4 pl-8 flex flex-col grow">
                <div className="text-3xl font-bold text-gray-700">
                    {book.title}
                </div>
                <div className="text-xl text-gray-500 font-bold">
                    {book.author} | 230 pages
                </div>
                <div className="py-4">
                    In the highly anticipated Thinking, Fast and Slow, Kahneman takes us on a groundbreaking tour of the mind and explains the two systems that drive the way we think. System 1 is fast, intuitive, and emotional; System 2 is slower, more deliberative, and more logical. Kahneman exposes the extraordinary capabilities—and also the faults and biases—of fast thinking, and reveals...
                </div>
                <button className="bg-blue-200 rounded-sm text-gray-900 w-auto float-left hover:shadow-md hover:bg-blue-400 transition-all duration-500">Continue from pg {book.page}</button>
                <div className="text-gray-900 my-4">
                    Added by {book.added}
                </div>
            </div>
        </div>
    )
}