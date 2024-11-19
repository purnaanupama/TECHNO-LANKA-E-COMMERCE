import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { BiSolidEdit } from "react-icons/bi";
import ChangeUserRole from '../components/ChangeUserRole';


const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const isoString = date.toISOString();
  const dateTimeWithoutSeconds = isoString.substring(0, 16).replace('T', ' ');
  return dateTimeWithoutSeconds;
}

const Allusers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [openUpdateUser,setOpenUpdateUser]=useState(false);
  const [updateUserDetails,setUpdateUserDetails] = useState({
    _id:"",
    name:"",
    email:"",
    role:"",
  });

  const fetchAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/get-all-users', {
        method: 'GET',
        credentials: 'include'
      });
      const responseData = await response.json();
      console.log(responseData.data);
      if (responseData.success) {
        setAllUsers(responseData.data);
      } else if (responseData.error) {
        toast.error(responseData.message, {
          className: 'custom-toast',
        });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('An error occurred while fetching users.', {
        className: 'custom-toast',
      });
    }
  }

  useEffect(() => {
    fetchAllUsers();
  }, []);

  return (
    <div className='flex flex-col w-[100%] gap-4'>
      <p className='text-lg py-2 px-4 text-white ribbonGradient'>{`All Users [${allUsers.length}]`}</p>
      {allUsers.map((user, index) => (
        <div key={user._id} className='flex px-6 rounded-[3px] text-xs content-center items-center justify-around py-2 bg-[#f2984f] gap-[110px] w-[100%] hover:bg-[#ffb57d] cursor-pointer'>
          <p>{index + 1}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.role}</p>
          <p>{formatDateTime(user.createdAt)}</p>
           <label  className='text-xl cursor-pointer hover:bg-white p-[3px] rounded-full' 
           onClick={()=>{
            setUpdateUserDetails(user)
            setOpenUpdateUser(true)
             
           }}>

            <BiSolidEdit/></label>
        </div>
      ))}
       {openUpdateUser &&<ChangeUserRole 
       onClose={()=>{setOpenUpdateUser(false)}} 
       name={updateUserDetails.name} 
       email={updateUserDetails.email} 
       role={updateUserDetails.role} 
       userID={updateUserDetails._id}
       fetchUsers={fetchAllUsers}/>}
    </div>
  );
}

export default Allusers;