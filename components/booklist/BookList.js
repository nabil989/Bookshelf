import react, {useState, useEffect} from 'react'
import Header from '../shared/Header'
import BookCard from '../shared/BookCard'
import Popup from '../shared/Popup'
import { useRouter } from 'next/router'
import BookInfo from '../shared/BookInfo'
import AddBook from './AddBook'
import AddCard from '../shared/AddCard'
import axios, { Axios } from 'axios'

export default function BookList() {
    const router = useRouter()
    const [listId, setListId] = useState("")
    const [bookListInfo, setBookListInfo] = useState({})

    useEffect(()=> {
        if(!router.isReady) return;
        const { id } = router.query;
        setListId(id);
        axios.post('../api/lists/getOne', {id:id}).then(res => {
            console.log(res.data.data);
            setBookListInfo(res.data.data);
        }).catch(err => console.log(err))
    },[router.isReady])
    
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

    const update = () => {
        axios.post('../api/lists/getOne', {id:listId}).then(res => {
            console.log(res.data.data);
            setBookListInfo(res.data.data);
        }).catch(err => console.log(err))
    }
    
    const popupOptions = [
                            <BookInfo toggle={toggle} book = {bookinfo}/>, 
                            <AddBook toggle={toggle} listId = {listId} update = {update}/>
                        ]

    
    
    return (
        <div className='px-28 pt-10 flex flex-col space-y-8'>
            
            <Popup open = {open} toggle = {toggle} Child = {popupOptions[popup]}></Popup>
            
            <Header title = {`${bookListInfo.name}`}></Header>
            <div className='text-3xl font-bold text-gray-700 pt-8'>
                Continue Reading
            </div>
            <div className='flex flex-row flex-wrap' >
                {bookListInfo.books && bookListInfo.books.map((book, id) => 
                    <BookCard Title={book.title.slice(0,50)} Author = {book.author} key ={id} 
                    Page = {0} Added = {book.addedBy} Users = {book.users} image = {book.imageURL} onClick = {showBookinfo} link = {book.link}>
                    </BookCard>
                )}
                
               <AddCard onClick = {showAddBook}></AddCard>
            </div>
            
        </div>
    )
}
