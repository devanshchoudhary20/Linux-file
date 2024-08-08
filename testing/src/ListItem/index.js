export default ListItem(props){
    return (
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
    )
}