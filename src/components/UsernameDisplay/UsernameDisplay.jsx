export default function UsernameDisplay({user}){
    return (
        <div className='user-display'>
            <img className='avatar' src={user.avatar} alt='profile image' />
            <h1>{user.username}</h1>
        </div>
    )
}