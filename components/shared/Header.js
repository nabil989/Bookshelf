import Profile from './Profile'
export default function Header({title}) {
  return (
    <div className='w-full flex flex-row justify-between py-4'>
        <div className='text-5xl font-bold text-gray-700'>
            {title}
        </div>
        <Profile/>
    </div>
  )
}
