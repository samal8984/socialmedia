import React, { Fragment } from 'react'
import { Route, Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { loadmyfriends, logout } from '../actions/userActions';


export const Navbar = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { user, loading } = useSelector(state => state.auth)

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully.')
}
const myfriend =()=>{
  dispatch(loadmyfriends());
}
  return (
    
    <Fragment>

<nav className="navbar  navbar-expand-lg  navbar-light bg-dark " style={{ height:'100px' , 
    }} >
  <div className="container-fluid">
    <Link className="navbar-brand" to="/" style={{ color:'white', fontSize:'30px'}} >Social Media</Link>
   
    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" to="/"
           style={{ color:'white', fontSize:'20px'}}>Home</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/about"
           style={{ color:'white', fontSize:'20px'}}>About</Link>
        </li>
        <li className="nav-item">
        <Link className="nav-link active" to="/allusers"
           style={{ color:'white', fontSize:'20px'}}>Users</Link>
        </li>
      
      </ul>
    
    </div>
     
         <div style={{ display:'flex',
         marginRight:'70px'}}>
       <div style={{height:'50px', width:'90px',
       borderRadius:'50%',marginRight:'20px'}}>
        {user ? 
         <  img  src={user.avatar && user.avatar.url} style={{height:'50px',width:'90px',
         borderRadius:'50%', border:'3px solid yellow'}} alt=''/>
       : 
       <  img  src='./images/default_avatar.jpg' style={{height:'50px',width:'90px',
       borderRadius:'50%', display:'none', border:'3px solid yellow'}} alt=''/> }
        
   
       </div>
       <div>
   
       </div>
   
   
         
         
       </div>
      

    
 
     { user ? 
        <div className="dropdown" style={{ marginRight:'50px'}} >

        <button className="btn btn-secondary btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
          Dashboard
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li><Link className="dropdown-item" to="/me"  >My profile</Link></li>
          <li><Link className="dropdown-item" to="/myfriends"  >My Friends</Link></li>
          <li> <Link className="dropdown-item text-danger" to="/" onClick={logoutHandler}>
                                          Logout
                                      </Link></li>
        </ul>
      </div>
     
    
      : <Link  to="/register" >
           <button className='btn btn-primary' style={{marginRight: '50px',
    width:'100px'}}>LOGIN</button>
      </Link>
     
      
      }
 

  </div>
</nav>
    </Fragment>
  )
}
