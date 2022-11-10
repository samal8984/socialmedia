import React, { Fragment, useState, useEffect } from 'react'



import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'

import { UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { updateProfile,loadUser,clearErrors } from '../actions/userActions'

export const UpdateUserProfile = ({history}) => {
         
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')

  const [avatar, setAvatar] = useState('')
  const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

  const alert = useAlert();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  const { error, isUpdated, loading } = useSelector(state => state.user)

  
  useEffect(() => {

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

}, [dispatch, alert, error, history, isUpdated])

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
    

    <div className="row wrapper" style={{ marginLeft:'50px'}} >
        <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                <h1 className="mt-2 mb-5">Update Profile</h1>

                <div className="form-group">
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
                <div className="form-group">
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

                <div className="form-group">
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

                <div className='form-group'>
                    <label htmlFor='avatar_upload'>Avatar</label>
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
                        <div className='custom-file'>
                            <input
                                type='file'
                                name='avatar'
                                className='custom-file-input'
                                id='customFile'
                                accept='images/*'
                                onChange={onChange}
                            />
                            <label className='custom-file-label' htmlFor='customFile'>
                                Choose Avatar
                        </label>
                        </div>
                    </div>
                </div>

                <button type="submit" className="btn update-btn btn-block mt-4 mb-3" >Update</button>
            </form>
        </div>
    </div>
</Fragment>
    
  )
}
