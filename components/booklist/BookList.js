import react, {useState} from 'react'
import Header from '../shared/Header'
import BookCard from '../shared/BookCard'
import Popup from '../shared/Popup'
import { useRouter } from 'next/router'
import BookInfo from '../shared/BookInfo'
import AddBook from './AddBook'
import AddCard from '../shared/AddCard'
export default function BookList() {
    const router = useRouter()
    const { pid } = router.query
    const [open, toggleOpen] = useState(false);
    const [popup, changePopup] = useState(0);
    const bookinfo = {
        title: "Thinking Fast and Slow",
        author: "Daniel Khanerman",
        page: 120,
        added: 4,
        users: [1,3,4,5,6],
    }
   
    const toggle = () => {
        console.log("hello");
        toggleOpen(!open);
    }

    const showBookinfo = () => {
        changePopup(0);
        toggle();
    }

    const showAddBook = () => {
        changePopup(1);
        toggle();
    }
    
    const popupOptions = [<BookInfo toggle={toggle} book = {bookinfo}/>, <AddBook toggle={toggle} book = {bookinfo}/>]

    
    
    return (
        <div className='px-28 pt-10 flex flex-col space-y-8'>
            
            <Popup open = {open} toggle = {toggle} Child = {popupOptions[popup]}></Popup>
            
            <Header title = {`Bookshelf ${pid}`}></Header>
            <div className='text-3xl font-bold text-gray-700 pt-8'>
                Continue Reading
            </div>
            <div className='flex flex-row space-x-20' >
                <BookCard Title={bookinfo.title} Author = {bookinfo.author} 
                Page = {bookinfo.page} Added = {bookinfo.added} Users = {bookinfo.users} onClick = {showBookinfo}>
                </BookCard>
               <AddCard onClick = {showAddBook}></AddCard>
            </div>
            
        </div>
    )
}
