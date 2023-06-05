
type UserProps ={
    userName : string,
    function : (msg : any)=> string;
}

export const User =(props : UserProps) =>{
    return(
        <div  onClick={()=>{let string = props.function("Hiii"); console.log(string)}} >
            {props.userName}
        </div>
    )
}   