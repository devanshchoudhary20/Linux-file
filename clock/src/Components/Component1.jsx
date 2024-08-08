import React from 'react'
import Component2 from './Component2'

const Component1 = (props) => {
  return (
    <div>
        <h1>Component 2 Top</h1>
        {props.children}
        <h1>Component 2 bottom</h1>
    </div>
  )
}

export default Component1