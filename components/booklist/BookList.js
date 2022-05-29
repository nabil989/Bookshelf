import Header from './Header'
import BookCard from './BookCard'
export default function BookList() {
    const bookinfo = {
        title: "Thinking Fast and Slow",
        author: "Daniel Khanerman",
        page: 120,
        added: 4,
        users: [1,3,4,5,6],
    }

    return (
        <div className='px-28 pt-10 flex flex-col space-y-8'>
            <Header></Header>
            <div className='text-3xl font-bold text-gray-700 pt-8'>
                Continue Reading
            </div>
            <div className='flex flex-row space-x-20'>
                <BookCard Title={bookinfo.title} Author = {bookinfo.author} 
                Page = {bookinfo.page} Added = {bookinfo.added} Users = {bookinfo.users}>
                </BookCard>
                <BookCard Title={bookinfo.title} Author = {bookinfo.author} 
                Page = {bookinfo.page} Added = {bookinfo.added} Users = {bookinfo.users}>
                </BookCard>
                <BookCard Title={bookinfo.title} Author = {bookinfo.author} 
                Page = {bookinfo.page} Added = {bookinfo.added} Users = {bookinfo.users}>
                </BookCard>
                <BookCard Title={bookinfo.title} Author = {bookinfo.author} 
                Page = {bookinfo.page} Added = {bookinfo.added} Users = {bookinfo.users}>
                </BookCard>
            </div>
        </div>
    )
}
