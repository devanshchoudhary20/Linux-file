import React from 'react'
import './Main.css';


const colorClassMap = {
  "style3": "yellow",
};
const Main = () => {
  const tags = [
    {
      id : "1",
      profile : "work",
      color : "lighgreen",
      icon : "./working.png"
    },{
      "id": "2",
      "profile": "Home",
      "color": "gray",
      "icon": "./house.png"
    },
    {
      "id": "3",
      "profile": "Health/Fitness",
      "color": "yellow",
      "icon": "./fitness.png"
    },
    {
      "id": "4",
      "profile": "Personal",
      "color": "pink",
      "icon": "./man.png"
    }
  ]
  const items = [
    {
      "id" : "1",
      "check" : true,
      "title" : "Dancing",
      "text" : "Go to Dancing Class in the evening",
      "time" : "today 04:35 pm",
      "color" : "violet",
      "profile" : "work",
      "tagcolor" : "lighgreen",
      "icon" : "./working.png"
    },
    {
      "id": "2",
      "check": true,
      "title": "Badminton",
      "text": "Play Badminton in the Afternoon",
      "time": "today 07:00 am",
      "color" : "pink",
      "profile": "Home",
      "tagcolor": "gray",
      "icon": "./house.png"
    },
    {
      "id": "3",
      "check": false,
      "title": "Coding",
      "text": "Do javascript revision",
      "time": "yesterday 04:00 pm",
      "color" : "indigo",
      "profile": "Health/Fitness",
      "tagcolor": "yellow",
      "icon": "./fitness.png"
    },
    {
      "id": "4",
      "check": false,
      "title": "React",
      "text": "Learn react and create project",
      "time": "today 05:00 pm",
      "color" : "purple",
      "profile": "Personal",
      "tagcolor": "pink",
      "icon": "./man.png"
    }
  ]
  return (
  <div>
    <div className="main">
      <div className="progress">
        <div className="circle">
          <div className="stroke">
          <p>75%</p>
          </div>
          
        </div>
        <div id="progress-text">
          <h3>You have 3 task to complete</h3>
          <p>You are almost there</p>
        </div>
      </div>
      <div className="searchbar">
        <div id="search-container">
          <div id="search">
            <img src="./search.png" alt="" id="search-icon" />
          </div>
          <input type="text" id="input-area" placeholder='seach for tasks...' />  
        </div>
      </div>
      <div id="tags">
        {tags.map((tag) =>{
          return (
            <div>
              <div className={"tag "+  colorClassMap[tag.style]} style = {{backgroundColor : tag.color}}>
                <div className="profile">
                  <img src={tag.icon} className='tag-icon' alt="" />
                </div>
                <div id="tag-content">
                  <p>{tag.profile}</p>
                </div>
              </div>
            </div>

          )
        })}
        
        
      </div>
      <div id="items">
        {items.map((item) => {
          return(
            <div className="item" key = {item.id} style = {{backgroundColor : item.color}}>
              {item.check && (
                  <div id="tick">
                    <div id="tick-container">
                      <img src="./check.png" alt="" id="tick-icon" />
                    </div>
                  </div>
              )}
              <div id="item-content">
                <div id="title">
                  <h3>{item.title}</h3>
                  <p>{item.time}</p>
                </div>
                <div id="description" style = {{width : 'auto'}}>
                  {item.text}
                </div>
                <div id='item-tag' style = {{width : '20%'}}>
                  <div className={"tag "} style = {{backgroundColor : item.tagcolor}}>
                    <div className="profile">
                      <img src={item.icon} className='tag-icon' alt="" />
                    </div>
                    <div id="tag-content" >
                      <p>{item.profile}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div id="menu">
                <img src="./menu-dots-vertical.png" alt="" id="menu-icon" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
    <div className="add-task">
        <div className='add-task-button'>
          <img src="./plus-small.png" alt="" className="add-task-icon" />
        </div>
    </div>
  </div>
  )
}

export default Main;