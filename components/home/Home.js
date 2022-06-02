import react, {useState} from 'react'
import Header from '../shared/Header'
import BookCard from '../shared/BookCard'
import Popup from '../shared/Popup'
import BookInfo from '../shared/BookInfo'
import {useSession} from "next-auth/react"
export default function BookList() {
    const { data: session } = useSession()
    const [open, toggleOpen] = useState(false);
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
    if (session) {
    return (
        <div className='px-28 pt-10 flex flex-col space-y-8'>
            
            <Popup open = {open} toggle = {toggle} Child = {<BookInfo toggle={toggle} book = {bookinfo}/>}></Popup>
            
            <Header title = {`Welcome ${session.user.name}`}></Header>
            <div className='text-3xl font-bold text-gray-700 pt-8'>
                Continue Reading
            </div>
            <div className='flex flex-row space-x-20' >
                <BookCard Title={bookinfo.title} Author = {bookinfo.author} 
                Page = {bookinfo.page} Added = {bookinfo.added} Users = {bookinfo.users} onClick = {toggle}>
                </BookCard>
               
            </div>
            
        </div>
    )
    }
    return (
        <div>Not Logged In</div>
    )
}
