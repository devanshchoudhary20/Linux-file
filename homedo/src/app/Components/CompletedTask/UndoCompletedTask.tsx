import { markTaskAsUndone } from '@/app/Utils/Utils';
import React from 'react';
import { MdChevronLeft } from 'react-icons/md';

const UndoCompletedTask = ({id,task,isClicked,setIsClicked}) => {

  const place = task.filter(task => task.id === id)[0];
  console.log(place);

const handleUndoneClick = () => {
  markTaskAsUndone(id);
  window.location.reload()
};

  return (
    <div className="bg-blue-50 font-sans w-full fixed h-full top-0 left-0 p-4">
      <div className="flex items-center mb-4 border-b-2">
        <div className='flex items-center'
        onClick={() => setIsClicked(!isClicked)}
        >
          <MdChevronLeft className="w-8 h-8 text-teal-500" />
          <span className="text-teal-500 text-md ">Back</span>
        </div>
        <h1 className="text-md font-semibold ml-12">Completed Task Details</h1>
      </div>
      
      <div className="rounded-lg shadow-sm ">
        <h2 className="text-2xl text-gray-500 font-semibold mb-4">{place.title}</h2>

        <h3 className="text-sm font-semibold text-gray-500 mb-2">CHECKLIST</h3>
        <div className="space-y-2 mb-6 bg-white p-4 rounded-xl">
          {place.checklist.map((item, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                checked={item.completed}
                className="w-5 h-5 border-2 border-gray-300 rounded mr-3 my-2"
              />
              <span className="text-gray-600 w-full">{item.text}</span>
            </div>
          ))}
        </div>

        <h3 className="text-sm font-semibold text-gray-500 mb-2">DETAILS</h3>
        <div className="space-y-4 bg-white p-4 rounded-xl">
          <div>
            <p className="text-sm text-gray-500">ROOM</p>
            <p className="text-gray-700">{place.room}</p>
            <hr />
          </div>
          <div>
            <p className="text-sm text-gray-500">DONE</p>
            <p className="text-gray-700">{`Cleaned by ${place.owner}, ${new Date(place.completionDate).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}`}</p>
            
          </div>
        </div>
      </div>

      <button className="w-full bg-white text-teal-500 font-semibold py-3 mt-4 rounded-lg shadow-sm"
      onClick={handleUndoneClick}
      >
        Undo Task
      </button>
    </div>
  );
};


export default UndoCompletedTask;