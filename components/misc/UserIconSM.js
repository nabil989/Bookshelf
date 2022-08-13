import Image from 'next/image'
export default function UserIconSM ({name, image }) {
    let img = image ? 'data:image/jpeg;base64,' + Buffer.from(image).toString('base64').slice(20) : "";
    return image ? 
    <img src={img} className= "w-10 h-10 rounded-full" title={name} ></Image>
    :
    <div className= "w-10 h-10 rounded-full bg-blue-300" title={name}></div>
}