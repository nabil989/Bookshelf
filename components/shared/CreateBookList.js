import React, {useState} from 'react'
import axios from 'axios'
import Router, { useRouter } from "next/router"
export default function CreateBookList({toggle, update}) {
    const router = useRouter();
    const [error, setError] = useState(false);
    const submit = () => {
        let name = document.getElementById('listname').value;
        axios.post('/api/lists/create', {name:name}).then(data => {
            console.log(data);
            update();
            toggle();
        }).catch(err => {
            console.log(err.data)
        })
    }

    const join = () => {
        let code = document.getElementById('code').value;
        axios.post('../api/lists/join', {code:code}).then(res => {
            router.push(`/booklist/${res.data.id}`)
        }).catch( err => {
            console.log(err)
            setError(true)
            }
        );
    }

    return (
        <div className="flex flex-col h-full">
            <div className="flex flex-col space-y-4 h-1/2">
                <div className="text-3xl font-bold text-gray-700">
                Create
                </div>
                <div className="text-xl">
                    Booklist Name:
                </div>
                <input type={"text"} id = 'listname' className = "w-auto p-2 border-2 border-gray-400 rounded-md"></input>
                <button className = "bg-indigo-200 rounded-sm text-gray-900 w-auto float-left hover:shadow-md hover:bg-indigo-600 transition-all duration-500 hover:text-white" onClick={submit}>Create</button>
            </div>
            <div className="flex flex-col space-y-4 h-1/2">
                <div className="text-3xl font-bold text-gray-700">
                Join
                </div>
                <div className="text-xl">
                    Booklist Code:
                </div>
                <input type={"text"} id = 'code' className = "w-auto p-2 border-2 border-gray-400 rounded-md"></input>
                <button className = "bg-indigo-200 rounded-sm text-gray-900 w-auto float-left hover:shadow-md hover:bg-indigo-600 transition-all duration-500 hover:text-white" onClick={join}>Join</button>
                {error && 
                    <div className='p-2 bg-red-200 rounded-sm'>
                        Invalid bookList code
                    </div>}
            </div>
        </div>
    )
}