import axios from "axios"
import { useSession, getSession, getCsrfToken } from 'next-auth/react'
import Image from "next/image"
import { useState } from 'react'
import imageCompression from 'browser-image-compression';

const Questionnaire = () => {
    const { data: session } = useSession()
    const [name, changeName] = useState('')
    const [img, changeImage] = useState('')
    const [message, changeMessage] = useState('')

    // const uploadImage = (e) => {
    //     console.log(e)
    //     const file = e.target.files[0]
    //     console.log(file)
    // }
    const reloadSession = () => {
        const event = new Event("visibilitychange");
        document.dispatchEvent(event);
    };
    const updateUser = (e) => {
        e.preventDefault()
        let fin = new Buffer(img, 'base64')
        axios.post('/api/users/update', {
            id:session.user.id,
            name: name,
            image: fin
        }).then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        reloadSession()
    }

    const blobToBase64 = blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(resolve => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
        });
      };

    async function handleImageUpload(event) {

        const imageFile = event.target.files[0];
        console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
      
        const options = {
          maxSizeMB: 0.005,
          maxWidthOrHeight: 80,
          useWebWorker: true
        }
        try {
          const compressedFile = await imageCompression(imageFile, options);
          console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
          console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
          blobToBase64(compressedFile).then(res => {
            // do what you wanna do
            console.log(res); // res is base64 now
            changeImage(res);
            });
        } catch (error) {
          console.log(error);
        }
      
      }
    return (
        <div className='flex flex-col space-y-4 items-center'>
            <h1 className='text-5xl'>Bookshelf</h1>
            <form className='flex flex-col space-y-4' method='post'>
                <label className='block text-grey-darker text-sm font-bold mb-2'>
                    Name
                    <input onChange={e => changeName(e.target.value)} value={name} className='shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker' name="username" type="text" />
                </label>
                <label className='flex flex-col text-grey-darker text-sm font-bold mb-2'>
                    Picture
                    <input type="file" accept="image/*" onChange={handleImageUpload.bind(this)}></input>
                </label>
                {img.length != 0 && <Image src={img} alt="" layout="fixed" width={100} height={100} className='rounded-full'/>}
                <button onClick={() => {updateUser}} className='text-red' type="submit" >
                    <p className='text-red'>
                        Finish account registration
                    </p>
                </button>
            </form>
            <div>
                {message}
            </div>
            {/* <div className={img.length === 0 ? : 'hidden ' : }> */}

            {/* </div> */}
            {/* <input type='file' onChange={e => uploadImage(e)}/> */}
        </div>
    );
}
export async function getServerSideProps(context) {
    const session = await getSession(context)
    if(!session){
        return {
            redirect:{destination:'/'}
        }
    }
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    }
}
export default Questionnaire;