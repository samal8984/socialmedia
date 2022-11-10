import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { allUsers, loadmyfriends, loadUser } from '../actions/userActions'
import { useDispatch } from 'react-redux'

export const MyFriends = () => {
  
   
   const {friends } = useSelector(state => state.friend)
   const {user}= useSelector( state => state.auth)
   const dispatch= useDispatch();
   let len= 0
   
   
   
   
   
  
  

   useEffect(()=>{
    dispatch(loadmyfriends())
  

    
    
    

    
   },[])
  
  

  
     

  return (
   

    <div className='container-fluid' style={{ backgroundColor:'rgb(177, 245, 245)'}}>
       <div>
        

    

      </div>
     

     
    
      <div style={{display:'flex', margin:'15px',
     flexDirection:'column', width:'70%', height:'100%',
      }}>
             { friends.map(elem =>(
                 <div  style={{width:'60%',margin:'15px', display:'flex', justifyContent:'space-between',
                 height: '140px' , backgroundColor:' bisque' , boxShadow:' 10px 5px 5px red'}}>
                   <img src={elem.avatar.url} alt=''
                    style={{height:'90px',
                    borderRadius:'50%', width:'100px', margin:'15px'}} />
                    <h4 style={{marginTop:'25px', textTransform:'uppercase' }}>{elem.name}</h4>
                    <button style={{margin:'10px',  marginTop:'20px'}} 
                    
                      className='btn btn-success' id='addfriend'
                   
                    >REMOVE FRIEND</button>
                       
        
                </div>



             )) }
        
             
         

        

      
        
        

    </div>
      
      
      
      
      
    

   

    

   </div>
  

  )
}
    
