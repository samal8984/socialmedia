import React, { useEffect } from 'react'
import { allUsers,clearErrors,addFriend, loadUser, loadmyfriends } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { UPDATE_FRIEND_RESET } from '../constants/userConstants'

export const AllUser = ({history}) => {

    const dispatch = useDispatch();
    const alert= useAlert();
    const { loading, error, users, } = useSelector(state => state.allUsers);
    const {friendUpdated, frienderror}= useSelector(state => state.user);
    const {user}= useSelector(state=> state.auth);
    const {friends} = useSelector(state=>state.friend)

   
   let id
    friends.forEach(elem=>{
      id= users.includes(e=>{
            return elem._id === e._id
        })

    })
    
    
        
    
        

      
        


     
        
      
        
        
   
        
      
      
    


    
    useEffect(() => {
        dispatch(allUsers())
        dispatch(loadmyfriends())


        if (error) {
            alert.error(error);
            dispatch(clearErrors())
        }
        if(friendUpdated){
        
        
            alert.success('Friend Added successfully')

            dispatch({ type: UPDATE_FRIEND_RESET})
        }
        if(frienderror){
            alert.error(frienderror);
            dispatch(clearErrors())
        }

       
    }, [dispatch, friendUpdated,frienderror, history])

     const addFriendHandler= (id, details)=>{
        dispatch(addFriend(id,details))
        
    

     }
     

  return (
    
    <div className='container-fluid' style={{ backgroundColor:'rgb(177, 245, 245)'}}>
    <div style={{display:'flex', margin:'15px',
     flexDirection:'column', width:'70%', height:'100%',
      }}>
             { users.map(user =>(
                 <div  style={{width:'60%',margin:'15px', display:'flex', justifyContent:'space-between',
                 height: '140px' , backgroundColor:' bisque' , boxShadow:' 10px 5px 5px red'}}>
                   <img src={user.avatar.url} alt=''
                    style={{height:'90px',
                    borderRadius:'50%', width:'100px', margin:'15px'}} />
                    <h4 style={{marginTop:'25px', textTransform:'uppercase' }}>{user.name}</h4>
                    <button style={{margin:'10px',  marginTop:'20px'}} 
                     onClick={()=>addFriendHandler(user._id, user)}
                      className='btn btn-success' id='addfriend'
                  
                   
                    >ADD FRIEND</button>
                       
        
                </div>



             )) }
        
             
         

        

      
        
        

    </div>

   </div>
  )
}
