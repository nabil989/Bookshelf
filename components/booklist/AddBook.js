import react, {useState} from 'react'
import axios, { Axios } from 'axios'

export default function AddBook() {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(true);
    const findBook = () => {
        setLoading(true);
        let text = document.getElementById('search').value;
        axios.get(`https://www.googleapis.com/books/v1/volumes?q=${text}&maxResults=1`).then(data => {
            setLoading(false);
            if(data.data.items){
                setBook(data.data.items[0]);
                console.log(data.data.items[0]);
            }
            
          
        }).catch(error => {
            console.log(error);
        })
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            findBook();
        }
    }
    return (
        <div className="flex flex-col space-y-4">
            <div className="text-3xl font-bold text-gray-700">
                    Add Book
            </div>
            <div className="text-2xl text-gray-700">
                    Search By Title: 
            </div>
            <input type={"text"} id="search" placeholder="Search" className="w-auto p-2 border-2 border-gray-400 rounded-md" onKeyDown = {handleKeyDown}></input>
            <div>
                {loading ? 
                    <div>Loading</div> 
                : 
                    <div className='flex flex-row space-x-4'>
                    <img src={book.volumeInfo.imageLinks.thumbnail}/>
                    <div>
                         <div className="text-3xl font-bold text-gray-700">
                         {book.volumeInfo.title}
                        </div>
                        <div className="text-xl text-gray-500 font-bold">
                        {book.volumeInfo.authors[0]}
                        </div>
                        <div className="py-2">
                            {book.volumeInfo.description.slice(0,500) + ' ...'}
                        </div>  
                    </div>
                    </div>
                }
                
            </div>
        </div>
    )
}