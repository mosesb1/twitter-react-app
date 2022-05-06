export default function Message({text, classNames}){
    return (
        <div className={classNames.join(" ")}>
            {text}
        </div>
    )
}