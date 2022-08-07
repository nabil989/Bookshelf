import react, {useState, useEffect} from 'react'
import Header from '../shared/Header'
import BookCard from '../shared/BookCard'
import Popup from '../shared/Popup'
import { useRouter } from 'next/router'
import BookInfo from '../shared/BookInfo'
import AddBook from './AddBook'
import AddCard from '../shared/AddCard'
import axios, { Axios } from 'axios'
import NotFound from '../shared/NotFound'
import UpdatePage from './UpdatePage'
import { useSession} from "next-auth/react"

export default function BookList() {
    const { data: session } = useSession()
    const router = useRouter()
    const [listId, setListId] = useState("")
    const [bookListInfo, setBookListInfo] = useState({})
    const [currentBook, setCurrentBook] = useState({});
    const [users,setUsers] = useState([]);
    const [loading,setLoading] = useState(true);
    const [timer, setTimer] = useState(0);
    const [intervalId, setIntervalId] = useState(0);

    const toggleInterval = () => {
        if (intervalId) {
          clearInterval(intervalId);
          setIntervalId(0);
          setTimer(0);
          return;
        }
    
        const newIntervalId = setInterval(() => {
            setTimer(timer => timer + 1);
        }, 1000);
        setIntervalId(newIntervalId);
      };

    const update = () => {
        axios.post('../api/lists/getOne', {id:listId}).then(res => {
            console.log(res);
            setBookListInfo(res.data.data.list);
            console.log(res.data.users.ret);
            setUsers(res.data.users.ret);
        }).catch(err => console.log(err))
    }

    useEffect(()=> {
        if(!router.isReady) return;
        const { id } = router.query;
        setListId(id);
        axios.post('../api/lists/getOne', {id:id}).then(res => {
            console.log(res);
            setBookListInfo(res.data.data.list);
            console.log(res.data.users.ret);
            setUsers(res.data.users.ret);
            setLoading(false);
        }).catch(err => {console.log(err); setLoading(false)})
    },[router.isReady])
    
    const [open, toggleOpen] = useState(false);
    const [popup, changePopup] = useState(0);
   
    const toggle = () => {
        if(intervalId){
            toggleInterval();
        }
        toggleOpen(!open);
    }

    const showBookinfo = (book, i) => {
        book["index"] = i;
        setCurrentBook(book);
        changePopup(0);
        toggle();
    }

    const showAddBook = () => {
        changePopup(1);
        toggle();
    }


    const showUpdatePage = (book, e, i) => {
        e.stopPropagation();
        book["index"] = i;
        setCurrentBook(book);
        changePopup(2);
        toggle();
        toggleInterval();
    }

    const showUpdatePageFromPopup = (book) => {
        setCurrentBook(book);
        changePopup(2);
        toggleInterval();
    }
  
    
    const popupOptions = 
    [
        <BookInfo toggle={toggle} book = {currentBook} read = {() => showUpdatePageFromPopup(currentBook)} users = {users} open = {open} id={session ? session.user.id : ""}/>, 
        <AddBook toggle={toggle} listId = {listId} update = {update}/>,
        <UpdatePage toggle={toggle} book = {currentBook} id = {listId} update = {update} timer={timer} toggleInterval = {toggleInterval}/>
    ]

    
    
    return (
        <div className={`${loading ? 'opacity-0' : 'opacity-100'} transition-all duration-500`}>
            {bookListInfo.name ? 
            <div className='px-28 pt-10 flex flex-col space-y-8'>
            
            <Popup open = {open} toggle = {toggle} Child = {popupOptions[popup]}></Popup>
            
            <Header title = {`${bookListInfo.name}`} users = {users}></Header>
            {session ? 
                <div className='bg-fuchsia-200 p-2 rounded-md'> {`Invite friends to join this list using code ${bookListInfo.join}`} </div>
                :
                <div className='bg-fuchsia-200 p-2 rounded-md'> Sign in or sign up to join this booklist! </div>
            }
            
            <div className='text-3xl font-bold text-gray-700 pt-8'>
                Books
            </div>
            <div className='flex flex-row flex-wrap' >
                {bookListInfo.books && bookListInfo.books.map((book, id) => 
                    <BookCard book={book} key ={id} 
                    onClick = {() => showBookinfo(book, id)}
                    read = {(e) => showUpdatePage(book, e, id)}
                    page = {session ? book.users.find(x => x.id === session.user.id)?.page : ""}
                    signedIn = {session ? true : false}
                    >
                    </BookCard>
                )}   

            
            {session && <AddCard onClick = {showAddBook}></AddCard>}
            </div>
        </div>
        :
        <NotFound msg={"No Booklist Found"}></NotFound>
    }
            
        </div>
        
    )
}
