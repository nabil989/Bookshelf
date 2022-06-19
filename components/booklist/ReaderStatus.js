import UserIconSM from "../misc/UserIconSM";
export default function ReaderStatus({users, book, open}) {
    //const colors = ['red','amber','teal','indigo', 'fuchsia'];
    const colors = ['#fbc9ca', '#f4f5c5', '#94f3e4', '#b9e6fd', '#eacefd'];
    return (
        book.users && <div className="mt-4">
            {book.users[0] ? 
                <div>
                    {book.users.map((user, id) => {
                        return <div key = {id} className = 'flex flex-row mb-4 items-center'>
                                <UserIconSM image = {users.find(x => x.id === user.id).image} name = {users.find(x => x.id === user.id).name}></UserIconSM>
                                <div className="grow ml-2 h-10 bg-gray-50 rounded-xl items-center">
                                    <div className={` transition-all duration-1000 h-full rounded-md`} 
                                    style={{width:open ? `${user.page*100 / book.pages}%` : 0, 
                                            backgroundColor: user.page >= book.pages ? "#b3f2d1" : colors[Math.floor(Math.random()*colors.length)]
                                        }}>

                                    </div>
                                    <div className=" h-10 flex flex-col justify-center ml-4 -translate-y-10">
                                        {user.page >= book.pages ? 
                                        <div>Finished!</div>
                                        :
                                        <div>{user.page} / {book.pages}</div>
                                        }
                                    </div>
                                    
                                    
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