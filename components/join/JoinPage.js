import Popup from "../shared/Popup"
import { useRouter } from 'next/router'
import react, {useState, useEffect} from 'react'
import axios, { Axios } from 'axios'
import Link from "next/link"
import JoinMsg from "./JoinMsg"
import { useSession} from "next-auth/react"

export default function joinPage(){
    const { data: session } = useSession()
    const router = useRouter()
    const [loading,setLoading] = useState(true);
    const [joinCode,setCode] = useState("");
    const [bookListInfo, setBookListInfo] = useState({});
    const [open, setOpen] = useState(false);
    useEffect(()=> {
        if(!router.isReady) return;
        const { code } = router.query;
        console.log(code);
        setCode(code);
        axios.post('../api/lists/getInfoFromCode', {join:code}).then(res => {
            if(res.data){
                console.log(res.data.data);
                setBookListInfo(res.data.data);
                //check if user is already in booklist
            }

            setLoading(false);
            setTimeout(() => {setOpen(true);}, 50);
            
        }).catch(err => {
            console.log(err)
            setLoading(false);
        }    
        )
        
    },[router.isReady])

    return (
        loading ? <div></div> :
        bookListInfo._id ? 
            <div>
                <Popup open={open} Child = {<JoinMsg bookList={bookListInfo}/>}></Popup>
            </div>
        :
            <div className="h-screen flex flex-col items-center justify-center align-middle space-y-4 bg-gray-50">
                <div className="text-xl text-gray-500">Error or Invalid Code</div>
                <Link href={'/'}>
                    <button className="text-gray-600 p-2 bg-fuchsia-200 rounded-xl">Return Home</button>
                </Link>
            </div>
    )
}