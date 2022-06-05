import React, {useState} from 'react'
import axios from 'axios'

export default function CreateBookList({toggle, update}) {
    
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

    return (
        <div div className="flex flex-col space-y-4">
            <div className="text-3xl font-bold text-gray-700">
                Create Booklist
            </div>
            <div className="text-xl">
                Booklist Name:
            </div>
            <input type={"text"} id = 'listname' className = "w-auto p-2 border-2 border-gray-400 rounded-md"></input>
            <button className = "bg-indigo-200 rounded-sm text-gray-900 w-auto float-left hover:shadow-md hover:bg-indigo-600  transition-all duration-500 hover:text-white" onClick={submit}>Create</button>
        </div>
    )
}