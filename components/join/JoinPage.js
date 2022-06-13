import Popup from "../shared/Popup"
import { useRouter } from 'next/router'
import react, {useState, useEffect} from 'react'
import axios, { Axios } from 'axios'
import Link from "next/link"
import JoinMsg from "./JoinMsg"
import { useSession} from "next-auth/react"
import NotFound from "../shared/NotFound"

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
        
            console.log(res);
            setBookListInfo(res.data.data);
            if(res.data.msg === "Already in List"){
                router.push(`/booklist/${res.data.data._id}`)
            }
            //check if user is already in booklist
        

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
        <NotFound msg = {"Error or Invalid Code"}></NotFound>
    )
}