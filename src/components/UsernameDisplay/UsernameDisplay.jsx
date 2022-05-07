export default function UsernameDisplay({user}){
    return (
        <div className='user-display'>
            <img className='avatar' src={user.avatar} alt='profile image' />
            <h3>{user.username}</h3>
        </div>
    )
}