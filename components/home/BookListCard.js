import Link from "next/link";
export default function BookListCard({text, list}) {
    return(
        <Link href = {{pathname: 'booklist/[id]', query : {id:list._id}}}>
         <div className="lg:w-1/4 md:w-1/2 w-full h-48 mb-10"  > 
            <div className="border-gray-200 border-2 rounded-md flex flex-row mr-10 h-full hover:shadow-md hover:scale-105 transition-all duration-500 hover:cursor-pointer">
                <div className="w-1/3 h-full flex flex-col">
                    <div className="w-full flex flex-row h-1/2">
                        <div className="w-1/2 h-full bg-blue-50">
                            {list.books[0] && <img src={list.books[0].imageURL} className = 'object-cover w-full h-full'/>}
                        </div>
                        <div className="w-1/2 h-full bg-fuchsia-100"> 
                            {list.books[1] && <img src={list.books[1].imageURL} className = 'object-cover w-full h-full'/>}
                        </div>
                    </div>
                    <div className="w-full flex flex-row h-1/2">
                        <div className="w-1/2 h-full bg-fuchsia-50">
                            {list.books[2] && <img src={list.books[2].imageURL} className = 'object-cover w-full h-full'/>}
                        </div>
                        <div className="w-1/2 h-full bg-blue-50">
                            {list.books[3] && <img src={list.books[3].imageURL} className = 'object-cover w-full h-full'/>}
                        </div>
                    </div>
                </div>
                <div className="text-2xl text-gray-700 p-2">           
                    {text}
                </div>
            </div>
            
        </div>
        </Link>  
   
    )
}