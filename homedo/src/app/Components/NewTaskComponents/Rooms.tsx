import Room from '@/app/Components/NewTaskComponents/Room'
import React from 'react'
const Rooms = ({handleRoomSelection,isClicked,setIsClicked}) => {
  return (
      <div className='bg-blue-50 h-full'>
        <hr className='mb-8'/>
        <div className='mx-4'>
          <Room 
          handleRoomSelection = {handleRoomSelection} 
          showtasks={false} 
          isClicked ={isClicked}
          setIsClicked ={setIsClicked}
          />
        </div>    
      </div>
  )
}

export default Rooms