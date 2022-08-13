import axios, { Axios } from "axios"
import { useRouter } from "next/router"
export default function JoinMsg({bookList}){
    const router = useRouter();
    const Join = () => {
        axios.post('../api/lists/join', {code:bookList.join}).then(res => {
            router.push(`/booklist/${bookList._id}`)
        }).catch(err => console.log(err));
    }

    return(
        <div className="flex flex-col space-y-10 items-start">
            <div className="text-3xl font-bold text-gray-700">
                You&apos;ve Been Invited To Join {bookList.name}
            </div>
            <button className="p-2 bg-fuchsia-300 rounded-md" onClick={Join}>Accept</button>
        </div>
    )
}