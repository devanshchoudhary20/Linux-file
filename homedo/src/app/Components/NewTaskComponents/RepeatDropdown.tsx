'use client'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { MdCheck, MdExpandMore } from 'react-icons/md';
import { REPEAT_OPTIONS as options} from '@/app/State/InitialState';
import { ItemContext } from '@/app/Context/ItemContext';
import CustomRepeat from './CustomRepeat';
import { REPEAT_OPTIONS } from '@/app/State/InitialState';
import { getRepeatValue } from '@/app/Utils/Utils';

const OverlayDropdownMenu = ({OptionSelected,isEdit,editTask}) => {
  const initialValue = isEdit ? getRepeatValue(editTask.repeat) : 'Never'
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(initialValue);
  const [isCustomClicked,setIsCustomClicked] = useState(false);
  const dropdownRef = useRef(null);
  
  const {task,setTask} = useContext(ItemContext);
  const options = [
    'Never',
    'Daily',
    'Every week',
    'Every 2 weeks',
    'Every month',
    'Every 3 months',
    'Every 6 months',
    'Custom'
  ];
 

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option :any) => {
    setSelectedOption(option);
    setIsOpen(false);
    setTask({...task,repeat : REPEAT_OPTIONS(option) });
    OptionSelected(option);
    if(option === 'Custom'){
      setIsCustomClicked(!isCustomClicked)
    }
  };

  const customValue =(value : any) => {
    if(value){
      setSelectedOption(value);
    };
    
  }

  useEffect(() => {
    const handleClickOutside = (event :any) => {
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-2/3" ref={dropdownRef}>
      <div>
      <button
        onClick={toggleDropdown}
        className="w-full bg-white text-left px-4 py-2 text-gray-500 flex items-center justify-end rounded-md "
      >
        <div className='w-2/3 whitespace-nowrap text-ellipsis overflow-x-hidden text-end px-2'>{selectedOption}</div>
        <MdExpandMore className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-sm mx-4">
            <div className="max-h-80 overflow-y-auto">
              {options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className="px-4 py-3 cursor-pointer hover:bg-gray-100 flex items-center justify-between"
                >
                  <span>{option}</span>
                  {option === selectedOption && <MdCheck className="text-blue-500" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
      <div>
        {isCustomClicked  && <CustomRepeat isCustomClicked = {isCustomClicked} setIsCustomClicked = {setIsCustomClicked} customValue ={customValue}/> }
      </div>
         
    </div>
  );
};

export default OverlayDropdownMenu;