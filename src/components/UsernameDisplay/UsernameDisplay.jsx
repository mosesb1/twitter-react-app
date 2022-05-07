export default function UsernameDisplay({user}){
    return (
        <div>
            <img className='avatar' src={user.avatar} alt='profile image' />
            <h1>{user.username}</h1>
        </div>
    )
}