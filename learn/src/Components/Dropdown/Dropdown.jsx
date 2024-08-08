import React, { useState , useRef, useEffect} from 'react'
import './Dropdown.css'
import DropdownData from '../../RawData/DropdownRaw'

const Dropdown = ({target}) => {
    const dropdownRef = useRef()
    let isInsideDropBox;
    if(target){isInsideDropBox = dropdownRef.current.contains(target);}
    const [isdropped,setIsDrop] = useState(false);
    const[value,setValue] = useState("");
    const HandleClick  = (name) =>{
        setValue(name);
        setIsDrop(false);
    }

    useEffect(()=> {
        if(target && !isInsideDropBox) setIsDrop(false);
    },[target])
    

    

    
    
  return (
    <div  className='dropdown-component'>
        <div ref = {dropdownRef} className="dropdown">
            <div className="components" onClick={setIsDrop(!isdropped)}>
                <div className="searcharea" >
                    <input type="text" value = {value} placeholder = "Select a City" className='searchinput' readOnly/>
                </div>
                <div className="dropdown-icon">
                    
                    <img src="angle-down.png" alt="" className='dropdown-icon' />
                </div>
            </div>
        </div>
        { 
        isdropped && (
        <div className="dropbox">
            {
            DropdownData.map(item => {
                return (
                    <div className="cities" key = {item.id} onClick={() => HandleClick(item.name)}>{item.name}</div>
                )
            })
            }
        </div>
        )
        }
    </div>
  )
}

export default Dropdown