import React, {useState} from "react";
import { NavLink, useHistory } from "react-router-dom";
import signin from "../images/signin1.jpg"


const Login = () =>{

    const history = useHistory();
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");

    const userLogin = async (e) =>{
        e.preventDefault();

        const res = await fetch('/signin',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({
                email,password
            })
        });

        const data = res.json();
        console.log(data);

        if(res.status===401) {
            window.alert(" invalid pass")
        } else if(res.status===400 || !data){
            window.alert("invalid data")
        } else if(res.status===402) {
            window.alert(" invalid email")
        } else{
            window.alert(" login successfully")
            history.push("/")
        }
    }

    return <>
         <section className="sign-in">
            <div className="container mt-5">
                <div className="signin-content">
                     <div className="signin-image">
                    <figure>
                    <img src={signin} alt="this is not available this time" />
                    </figure>
                    <NavLink to="/signup" className="signup-image-link" >Create an Account</NavLink>
                    </div>
                    <div className="signin-form">
                        <h2 className="form-title">Sign In</h2>
                        <form methos="POST" className="register-form" id="register-form">
                         
                            <div className="form-group">
                                <label htmlFor="email">
                                    <i class="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type="text" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Your Email" autoComplete="off" />
                            </div>
                          
                            <div className="form-group">
                                <label htmlFor="password">
                                    <i class="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Your Password" autoComplete="off" />
                            </div>
                            
                            <div className="form-button">
                                <input type="submit" name="signin" id="signin" className="form-submit" value="Login" onClick={userLogin} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Login