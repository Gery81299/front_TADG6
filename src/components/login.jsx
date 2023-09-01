import React, {useState} from "react";



export const Login = () => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    return(
        <>
        <div className="auth-form-contaniner"> 
        <h2>LOGIN</h2>
        <form className="login-form">
            <label for="email">email</label>
            <input type="email" placeholder="test@email.com" id="email" name="email"/>

            <label for="password">contraseña</label>
            <input type="password" placeholder="********" id="password" name="password"/>
            
        </form>
        <button >Ingresar</button>
        </div>
        
        </>
    )
        
    
}