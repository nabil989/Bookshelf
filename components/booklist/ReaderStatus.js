import UserIconSM from "../misc/UserIconSM";
export default function ReaderStatus({users, book}) {
    const colors = ['red','amber','teal','indigo', 'fuchsia'];
    return (
        book.users && <div className="mt-4">
            {book.users[0] ? 
                <div>
                    {book.users.map((user, id) => {
                        return <div key = {id} className = 'flex flex-row mb-4 items-center'>
                                <UserIconSM image = {users.find(x => x.id === user.id).image} name = {users.find(x => x.id === user.id).name}></UserIconSM>
                                <div className="grow ml-2 h-10 bg-gray-50 rounded-xl items-center">
                                    <div className="absolute h-10 flex flex-col justify-center ml-4">
                                        {user.page === book.pages ? 
                                        <div>Finished!</div>
                                        :
                                        <div>{user.page} / {book.pages}</div>
                                        }
                                        
                                    </div>
                                    <div className={`bg-${user.page === book.pages ? "green" : colors[Math.floor(Math.random()*colors.length)]}-100 h-full rounded-md`} style={{width:`${user.page*100 / book.pages}%`}}></div>
                                </div>
                                
                                
                            </div>
                    })}
                </div> 
            :
                <div>Be the first to start this book!</div>
            }
        </div>
        
    )
}