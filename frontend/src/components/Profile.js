import React, { Fragment, useState, useEffect } from 'react'



import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { UPDATE_PROFILE_RESET,UPDATE_PASSWORD_RESET } from '../constants/userConstants'
import { updateProfile,loadUser,clearErrors,updatePassword } from '../actions/userActions'




export const Profile = ({history}) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
  
    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')
  
    const alert = useAlert();
    const dispatch = useDispatch();
  
    const { user } = useSelector(state => state.auth);
    const { error, isUpdated, loading,passUpdated,passerror } = useSelector(state => state.user)


    
  
    
    useEffect(() => {

        if (passerror) {
            alert.error(passerror);
            dispatch(clearErrors());
        }

        if (passUpdated) {
            alert.success('Password updated successfully')

            history.push('/me')

            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }
  
      if (user) {
          setName(user.name);
          setAddress(user.address);
  
          setEmail(user.email);
  
          setAvatarPreview(user.avatar.url)
      }
       
  
      if (error) {
          alert.error(error);
          dispatch(clearErrors());
      }
  
      if (isUpdated) {
        
         
    

          alert.success('Profile updated successfully');
        
          dispatch(loadUser());
  
          history.push('/me')
  
          dispatch({
              type: UPDATE_PROFILE_RESET
          })
      }
    
  
  }, [dispatch, alert, error, history,passUpdated,passerror, isUpdated])

  const submitHandlerPass = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('oldPassword', oldPassword);
    formData.set('password', password);

    dispatch(updatePassword(formData))
}

  
  const submitHandler = (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.set('name', name);
    formData.set('address', address);
  
    formData.set('email', email);
    formData.set('avatar', avatar);
  
    dispatch(updateProfile(formData))
  }
  
  const onChange = e => {
    const reader = new FileReader();
  
    reader.onload = () => {
        if (reader.readyState === 2) {
            setAvatarPreview(reader.result)
            setAvatar(reader.result)
        }
    }
  
    reader.readAsDataURL(e.target.files[0])
  
  }

  
  return ( 
    
    <Fragment>
                   
                    <h2 className="mt-5 ml-5">My Profile</h2>
                    <div className="row justify-content-around mt-5 user-info" >
                       <div className="col-12 col-md-3">
                            <figure className='avatar avatar-profile'>
                                {user ?
                                 <img className="rounded-circle img-fluid"
                                 src={ user.avatar && user.avatar.url} alt={user.name} />: 
                                <img className="rounded-circle img-fluid"
                                 src= '' alt='' />
                                }
                            </figure>
                            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target= "#staticBackdrop">
                                 Update Profile
                          </button>
                          <div className= "modal fade"
                           id= "staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="staticBackdropLabel">Profile Details</h5>
            <button type="button" className="btn-close" data-bs-dismiss=  "modal"  aria-label="Close"></button>
          </div>
          <div className="modal-body" >
          <div className="row wrapper" style={{width:'250%' }} >
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                <h1 className="mt-2 mb-5" style={{marginLeft:'15px'}} >Update Profile</h1>

                <div className="form-group" style={{marginLeft:'15px', width:'80%',marginBottom:'10px'}}>
                    <label htmlFor="name_field">Name</label>
                    <input
                        type="name"
                        id="name_field"
                        className="form-control"
                        name='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-group" style={{marginLeft:'15px', width:'80%',marginBottom:'10px'}} >
                    <label htmlFor="address_field">Address</label>
                    <input
                        type="address"
                        id="address_field"
                        className="form-control"
                        name='address'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <div className="form-group" style={{marginLeft:'15px', width:'80%',marginBottom:'10px'}} >
                    <label htmlFor="email_field">Email</label>
                    <input
                        type="email"
                        id="email_field"
                        className="form-control"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className='form-group' style={{marginLeft:'15px', width:'80%',marginBottom:'10px'}} >
                    <label htmlFor='avatar_upload'>Profile Pic</label>
                    <div className='d-flex align-items-center'>
                        <div>
                            <figure className='avatar mr-3 item-rtl'>
                                <img  style={{height: '60px', width:'80px'}}
                                    src={avatarPreview}
                                    className='rounded-circle'
                                    alt='Avatar Preview'
                                    onChange={onChange}
                                />
                            </figure>
                        </div>
                        <div className='custom-file' style={{marginLeft:'120px'}} >
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                accept='images/*'
                                onChange={onChange}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose profile pic
                        </label>
                        </div>
                    </div>
                </div>

                <button style={{marginLeft:'170px',marginBottom:'10px'}}  data-bs-dismiss ="modal"
                  aria-label='close' type="submit" className="btn btn-success " >Update</button>
            </form>
        </div>
    </div>
    </div>
         
        </div>
      </div>
    </div>
    
   
                        </div> 
                            
                        
                      
                        
                         <div className="col-12 col-md-5"  style= {{marginRight:'120px'}}>
                        
                         <h4>Full Name</h4>
                         <p>{user && user.name}</p>

                         <h4>Address</h4>
                         <p>{user && user.address}</p>


                         <h4>Email Address</h4>
                         <p>{user && user.email}</p>

                        

                         <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                           Change Password
                        </button>

                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
       <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel"  >Update your Password</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="row wrapper" style={{width:'250%'}} >
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandlerPass}>
                        <h1 className="mt-2 mb-5" style={{marginLeft:'15px' }}>Update Password</h1>
                        <div className="form-group" style={{marginLeft:'15px',width:'80%',marginBottom:'10px'}}>
                            <label for="old_password_field">Old Password</label>
                            <input
                                type="password"
                                id="old_password_field"
                                className="form-control"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                            />
                        </div>

                        <div className="form-group" style={{marginLeft:'15px',width:'80%', marginBottom:'20px'}}>
                            <label for="new_password_field">New Password</label>
                            <input
                                type="password"
                                id="new_password_field"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" data-bs-dismiss="modal" className="btn btn-success" style={{marginLeft:'100px', marginBottom:'10px'}}  >Update Password</button>
                    </form>
                </div>
            </div>
      </div>
     
    </div>
    </div>
   </div>
                     </div>  
                      
                        
                    </div>




                </Fragment>
      
    
  )
}
