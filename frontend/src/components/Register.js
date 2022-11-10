import React, { useEffect, useState } from 'react'

import { Navbar } from './Navbar'
import {useAlert} from 'react-alert'

import { useDispatch, useSelector } from 'react-redux'
import { register, clearErrors,login } from '../actions/userActions';



export const Register = ({history}) => {


	
const [user, setUser]= useState({
	name: '',
	address: '',
	email: '',
	
	password: '',

})

const {name,address,email,password}= user
const [avatar, setAvatar]= useState('')
const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

const [emaillog, setEmailLog] = useState('');
const [passwordlog, setPasswordLog] = useState('');

const alert= useAlert();
const dispatch= useDispatch();
const { isAuthenticated,loginAuthenticated, error, loginerror, loading } = useSelector(state => state.auth);




useEffect(() => {

	if (isAuthenticated) {
		history.push('/')
	}

	if (error) {
	
		
		dispatch(clearErrors());
	}

	if (loginAuthenticated) {
		history.push('/')
	}

	if  (loginerror) {
		
		alert.error(loginerror);
		
		dispatch(clearErrors());
	}

}, [dispatch, alert, isAuthenticated,loginAuthenticated, error, loginerror, history])


const submitHandler = (e) => {
	
	e.preventDefault();

	const formData = new FormData();
	formData.set('name', name);
	formData.set('address', address);

	formData.set('email', email);

	formData.set('password', password);
	
	formData.set('avatar', avatar);

	dispatch(register(formData))
	
}

const onChange = e => {
	if (e.target.name === 'avatar') {

		const reader = new FileReader();

		reader.onload = () => {
			if (reader.readyState === 2) {
				setAvatarPreview(reader.result)
				setAvatar(reader.result)
			}
		}

		reader.readAsDataURL(e.target.files[0])

	} else {
		setUser({ ...user, [e.target.name]: e.target.value })
	}
}


const submitHandlerLogin = (e) => {
	e.preventDefault();
	dispatch(login(emaillog, passwordlog))
}
  return (
    <div>
      
   

	<div className="section" style={{}} >
		<div className="container"  >
			<div className="row full-height justify-content-center" >
				<div className="col-12 text-center align-self-center py-5">
					<div className="section pb-5 pt-5 pt-sm-2 text-center">
						<h6 className="mb-0 pb-3"  ><span>Log In </span><span>Sign Up</span></h6>
			          	<input className="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
			          	<label for="reg-log"></label>
						<div className="card-3d-wrap mx-auto" >
							<div className="card-3d-wrapper" style={{}} >
								<div className="card-front" style={{height:'600px', width:'500px'}}>
								<form  onSubmit={submitHandlerLogin} >
									<div className="center-wrap" style={{height:'350px', marginTop:'-120px',
								
									 }} >
										<div className="section text-center" style={{height:'300px', marginTop:'15px'}} >
											<h4 className="mb-4 pb-3" style={{color:'white',marginTop:''}}>Log In</h4>
											
											<div className="form-group " 
											style={{ paddingLeft:'0px',
											 marginTop:'50px',width:'400px',marginLeft:'10px'}} >
												<input
											     style={{paddingLeft:'10px'}}
												 type="email"
												  name="email"
												   className="form-style"
												    placeholder="Your Email"
													value={emaillog}
													onChange={(e) => setEmailLog(e.target.value)}
													 id="logemail" 
													 autocomplete="off"/>
												<i className="input-icon uil uil-at"></i>
											</div>	
											<div className="form-group mt-3"  style={{width:'400px',marginLeft:'10px'}}>
												<input 
												style={{paddingLeft:'10px'}}
												type="password"
												 name="password"
												  className="form-style"
												   placeholder="Your Password" 
												   id="logpass"
												   value={passwordlog}
												   onChange={(e) => setPasswordLog(e.target.value)}
												    autocomplete="off"/>
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
											
											
											
				      					</div>
										<div style={{ marginTop:'10px'}}>
										  <button type='submit' className="btn mt-4 btn-success" >submit</button>

                            				<p className="mb-0 mt-4 text-center"><a href="#0" className="link">Forgot your password?</a></p>
											</div>
											
			      					</div>
									  </form>
			      				</div>
								<div className="card-back" style={{height:'600px', width:'500px'}} >
									<div className="center-wrap">
										<div className="section text-center">
											<h4 className="mb-4 pb-3" style={{color:'white'}} >Sign Up</h4>
											<form  onSubmit={submitHandler} encType='multipart/form-data' >

											<div className="form-group">
												<input
												 type="text"
												 name='name' 
												 className="form-style"
												  placeholder="Your Full Name"
												   id="name_field"
												   value={name}
												   onChange={onChange}
												    autocomplete="off"/>
												<i className="input-icon uil uil-user"></i>
											</div>
                                            <div className="form-group mt-3">
												<input 
												type="text" 
												name='address'
												 className="form-style" 
												 placeholder="Your Address"
												  id="address_field"
												  value={address}
												  onChange={onChange}
												   autocomplete="off"/>
												<i className="input-icon uil uil-at"></i>
											</div>
                                         	
											<div className="form-group mt-3">
												<input
												 type="email"
												  name='email'
												   className="form-style"
												    placeholder="Your Email" 
													id="email_field"
													value={email}
													onChange={onChange}
													 autocomplete="off"/>
												<i className="input-icon uil uil-at"></i>
											</div>	
                                          
											<div className="form-group mt-3">
												<input
												 type="password"
												  name='password'
												   className="form-style"
												    placeholder="Your Password"
													 id="password_field"
													 value={password}
													 onChange={onChange}
													  autocomplete="off"/>
												<i className="input-icon uil uil-lock-alt"></i>
											</div>
											<div className="form-group mt-3" >
												<div className='form-style1' >
													<div style={{display:'flex', justifyContent:'space-between',
												     flexDirection:'row'}}>
													
														<img src={avatarPreview} alt='AvatarPreview' style={{height:'70px', width:'80px',
														marginLeft:'-20px',
														borderRadius:'50%', border:'1px solid red'}} />
														<input
														 type="file" 
														 name='avatar'
														 style={{marginRight:'-60px'}} 
														  className="fileinput"
														   placeholder="profile pic" 
														   id="customfile"
														   accept='images/*'
														    onChange={onChange}
															/>
												        <i className="input-icon uil uil-lock-alt"></i>

													</div>

												</div>
												
											</div>
											<div style={{marginTop:'50px'}} >
											<button className="btn mt-4 btn-success"
											id='register_button'  >submit</button>


											</div>
											</form>
				      					</div>
			      					</div>
			      				</div>
			      			</div>
			      		</div>
			      	</div>
		      	</div>
	      	</div>
	    </div>
	</div>
    </div>
  )
}
