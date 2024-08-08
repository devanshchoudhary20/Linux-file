import React, { useState , useRef , useEffect} from 'react'
import './AutoSearch.css'
import statesOfIndia from '../../RawData/States'
const AutoSearch = () => {
    const dropdownRef = useRef();
    const [isdropped,setIsDrop] = useState(false);
    const [value,setValue] = useState("")
    const HandleInputChange = (e) => {
        setValue(e.target.value)
    }

    const selectCity =(name) => {
        setValue(name);
        setIsDrop(false);

    }

    const SelectedItem =(typedVal,name) => {
        const FirstIndex = name.toLowerCase().indexOf(typedVal.toLowerCase());
        const LastIndex = FirstIndex + typedVal.length;
        const highlightedPart = name.substring(FirstIndex, LastIndex);
        return {
            __html: `${name.substring(0, FirstIndex)}<strong>${highlightedPart}</strong>${name.substring(LastIndex, name.length)}`
        };
    };

  return (
    <div  className='dropdown-component'>
    <div ref= {dropdownRef} className="dropdown">
            <div className="components" onClick={() => {
                    document.addEventListener('click', ((event) => {
                        if(!dropdownRef.current.contains(event.target) ){
                            setIsDrop(false);
                        } 
                    }))
                    }}>
                <div className="searcharea" onClick={(e) => {
                    setIsDrop(true);
                    }}>
                    <input type="text"  placeholder = "Search Here" className='searchinput' value = {value} onChange={HandleInputChange}/>
                </div>
                <div className="dropdown-icon" onClick={() => {
                    if(value &&  isdropped === false){
                        setIsDrop(true);
                        setValue("");
                    }
                    setIsDrop(!isdropped);
                }}>
                    
                    <img src="angle-down.png" alt="" className='dropdown-icon' />
                </div>
            </div>
        </div>
        {
        isdropped && 
        <div className="dropbox">
            {
                statesOfIndia
                .filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
                .sort((a, b) => {
                    const aIndex = a.name.toLowerCase().indexOf(value.toLowerCase());
                    const bIndex = b.name.toLowerCase().indexOf(value.toLowerCase());
                    if(aIndex === 0 && bIndex !==0) return -1;
                    if(aIndex !== 0 && bIndex === 0) return 1;
                    return aIndex - bIndex;
                })
                .map(item => 
                    <div 
                        className="cities"
                        key = {item.id}
                        onClick={() => selectCity(item.name)} dangerouslySetInnerHTML = {SelectedItem(value,item.name)} >
                            
                    </div>
            )
            }
        </div>

}

    </div>
  )
}

export default AutoSearch