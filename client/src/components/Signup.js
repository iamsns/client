import React, {useState} from "react";
import { NavLink, useHistory } from "react-router-dom";
import signup from "../images/signup.jpg"


const Signup = () => {

    const history  = useHistory();
    const [user, setUser] = useState({
        name:"", email:"", phone:"", work:"", password:"",cpassword:""
    });

    let name, value;

    const handleInputs =(event)=>{
        name=event.target.name;
        value = event.target.value;

        setUser({...user, [name]:value});
    }

    const postData = async (e) =>{
        e.preventDefault();
        const { name,  email,  phone,  work,  password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers : {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,  email,  phone,  work,  password, cpassword
            })
        });
        const data = await res.json();

        if(data.status === 422 || !name || !email || !phone || !work || !password || !cpassword || password !== cpassword){
            window.alert("invalid registeration")
            console.log("invalid registeration");
        } else{
            window.alert("successfully registeration")
            console.log("successfully registeration");
            history.push("/login");
        }
    };



    return <>
        <section className="signup">
            <div className="container mt-5">
                <div className="signup-content">
                    <div className="signup-form">
                        <h2 className="form-title">Sign up</h2>
                        <form method="POST" className="register-form" id="register-form">
                            <div className="form-group">
                                <label htmlFor="name">
                                    <i className="zmdi zmdi-account material-icons-name"></i>
                                </label>
                                <input type="text" name="name" id="name" placeholder="Your Name" autoComplete="off" value={user.name} onChange={handleInputs} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">
                                    <i className="zmdi zmdi-email material-icons-name"></i>
                                </label>
                                <input type="text" name="email" id="email" placeholder="Your Email" autoComplete="off" value={user.email} onChange={handleInputs} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">
                                    <i className="zmdi zmdi-phone-in-talk material-icons-name"></i>
                                </label>
                                <input type="number" name="phone" id="phone" placeholder="Your Number" autoComplete="off" value={user.phone} onChange={handleInputs} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="work">
                                    <i className="zmdi zmdi-slideshow material-icons-name"></i>
                                </label>
                                <input type="text" name="work" id="work" placeholder="Your Profession" autoComplete="off" value={user.work} onChange={handleInputs} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">
                                    <i className="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="password" id="password" placeholder="Your Password" autoComplete="off" value={user.password} onChange={handleInputs} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cpassword">
                                    <i className="zmdi zmdi-lock material-icons-name"></i>
                                </label>
                                <input type="password" name="cpassword" id="cpassword" placeholder="Confirm Your Password" autoComplete="off" value={user.cpassword} onChange={handleInputs} />
                            </div>
                            <div className="form-button">
                                <input type="submit" name="signup" id="signup" className="form-submit" value="Register" onClick={postData} />
                            </div>
                        </form>
                    </div>
                    <div className="signup-image">
                    <figure>
                    <img src={signup} alt="this is not available this time" />
                    </figure>
                    <NavLink to="/login" className="signin-image-link" >I am already registered</NavLink>
                    </div>
                </div>
            </div>
        </section>
    </>
}

export default Signup