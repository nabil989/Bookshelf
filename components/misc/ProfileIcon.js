import Image from 'next/image'
import { useSession } from'next-auth/react'
import axios from 'axios'
import { useState, useEffect } from 'react'
const ProfileIcon = () => {
    const { data: session } = useSession()
    const [ imgSrc, changeSrc ] = useState('')
    const [src,setSrc] = useState('');
    // console.log(session.user)
    // console.log(session.user.id)
    // console.log('aaa')
    
    const getIcon = () => {
        axios.get(`/api/users/${session.user.id}`)
        .then(function (response) {
            // handle success
            // console.log("orange")
            // console.log(response.data.image)
            // data = response.data.image
            // const b64 = Buffer.from(rest.Body).toString('base64');
            console.log(response);
            changeSrc(Buffer.from(response.data.image).toString('base64'))
            let text = 'data:image/jpeg;base64,' + Buffer.from(response.data.image).toString('base64').slice(20);
            console.log(text);
            setSrc(text);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }
   
    useEffect(() => {
        getIcon();
    }, [])

    // console.log(imgSrc)
    
    // console.log(imgSrc)
    // console.log(src)
    // getIcon()
    if(imgSrc === ''){
        return (
            <div className='w-10 h-10 bg-blue-300 rounded-full'>
                
            </div>
        )
    }
    return (
        // {src.length != 0 && <Image src={img} layout="fixed" width={100} height={100} className='rounded-full'/>}
        <div>
            <Image src={src} height='50' width='50' className='rounded-full ml-4'/>
        </div>
    )
}

export default ProfileIcon;