import { useState } from "react"
import axios from "axios"

export default function UpdatePage ({toggle, book, id, update}) {
    const submit = () =>{
        const page = document.getElementById('page').value;
        if(page > parseInt(book.pages)){
            page = parseInt(book.pages);
        }
        axios.post('../api/lists/books/editPage', {bookIndex:book.index, id:id,page:page}).then(res => {
            console.log(res);
            toggle();
            update();
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <div className="flex flex-col space-y-10 items-start">
            <div className="text-3xl font-bold text-gray-700">
                Nice Reading!
            </div>
            <div>
                Youve been reading for 
            </div>
            <input type='number' id = 'page' className="p-2 rounded-md border-gray-200 border-2"></input>
            <button onClick={submit}>submit</button>
        </div>
    )
}