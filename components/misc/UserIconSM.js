import Image from 'next/image'
export default function UserIconSM ({name, image }) {
    let img = image ? 'data:image/jpeg;base64,' + Buffer.from(image).toString('base64').slice(20) : "";
    console.log(image)
    return img.length > 30 ? 
    <img src={img} className= "w-10 h-10 rounded-full" title={name} ></img>
    :
    <div className= "w-10 h-10 rounded-full bg-blue-300 flex flex-row items-center justify-center" title={name}>
        <div>a</div>
    </div>
}