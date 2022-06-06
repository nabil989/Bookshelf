import Link from "next/link";
export default function BookListCard({text, list}) {
    return(
        <Link href = {{pathname: 'booklist/[id]', query : {id:list._id}}}>
         <div className="mr-10 w-1/4 h-48 border-gray-200 border-2 rounded-md flex flex-col items-center justify-center align-middle hover:shadow-md hover:scale-105 transition-all duration-500 hover:cursor-pointer" 
            >   
                <div className="text-2xl text-gray-500">           
                    {text}
                </div>
            </div>
            </Link>
   
    )
}