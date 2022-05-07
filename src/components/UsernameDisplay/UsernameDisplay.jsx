export default function UsernameDisplay({user}){
    return (
        <div>
            <img src={user.avatar} alt='profile image' />
            <h1>{user.username}</h1>
        </div>
    )
}