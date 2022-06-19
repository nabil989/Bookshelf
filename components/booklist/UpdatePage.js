import { useState, useEffect} from "react"
import axios from "axios"

export default function UpdatePage ({toggle, book, id, update, timer, toggleInterval}) {
    
    const submit = () =>{
        const page = document.getElementById('page').value;
        if(page > parseInt(book.pages)){
            page = parseInt(book.pages);
        }
        axios.post('../api/lists/books/editPage', {bookIndex:book.index, id:id,page:page}).then(res => {
            console.log(res);
            toggle();
            update();
            toggleInterval();
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
                You have been reading for {Math.floor(timer/60)} minutes and {timer%60} seconds and stopped on page
                <input type='number' id = 'page' className="p-2 rounded-md border-gray-200 border-2 ml-2"></input>
            </div>
            
            <button onClick={submit} className = 'p-2 bg-fuchsia-200 rounded-md'>submit</button>
        </div>
    )
}