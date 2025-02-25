const Button = ({title,activeClass, _callback}) => {
    return (
        <button className={activeClass} onClick={_callback} style={{fontFamily:"Montserrat,serif"}}>{title}</button>
      )
}
export default Button