import axios from "axios"
import Image from "next/image"
import { useState } from 'react'
import FileBase64 from 'react-file-base64';

const Questionnaire = () => {
    const [name, changeName] = useState('')
    const [img, changeImage] = useState('')
    const [message, changeMessage] = useState('')
    const saveImg = (e) => {
        // console.log(test)
        console.log(e)
        changeImage(e.base64)
        console.log(img)
    }
    // const uploadImage = (e) => {
    //     console.log(e)
    //     const file = e.target.files[0]
    //     console.log(file)
    // }
    return (
        <div className='flex flex-col space-y-4 items-center'>
            <h1 className='text-5xl'>Bookshelf</h1>
            <form className='flex flex-col space-y-4' method='post'>
                <label className='block text-grey-darker text-sm font-bold mb-2'>
                    Name
                    <input onChange={e => changeName(e.target.value)} value={name} className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' name="username" type="text" />
                </label>
                <label className='block text-grey-darker text-sm font-bold mb-2'>
                    Name
                    <input onChange={e => changeImage(e.target.files[0])} id="the-file" name="file" type="file" className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' />
                </label>
                <button className='text-red' type="submit" >
                    <p className='text-red'>
                        Finish account registration
                    </p>
                </button>
            </form>
            <FileBase64 multiple={false} onDone={saveImg.bind(this)}/>
            <div>
                {message}
            </div>
            {/* <div className={img.length === 0 ? : 'hidden ' : }> */}
            {img.length != 0 && <Image src={img} width="500" height="500"/>}

            {/* </div> */}
            {/* <input type='file' onChange={e => uploadImage(e)}/> */}
        </div>
    );
}
 
export default Questionnaire;