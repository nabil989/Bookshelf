import Profile from './Profile'
import UserIconSM from '../misc/UserIconSM'
export default function Header({title, users}) {
  return (
    <div className='w-full flex flex-row justify-between py-4'>
      <div className='flex flex-row space-x-1 items-baseline'>
         <div className='text-5xl font-bold text-gray-700 mr-10'>
            {title} 
        </div>
        {users && Object.keys(users).map((i) => {
            return <UserIconSM key = {i} name = {users[i].name} image = {users[i].image}></UserIconSM>
        })}
      </div>
       
        
        <Profile/>
    </div>
  )
}
