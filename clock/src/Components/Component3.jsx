import React from 'react'
import { useSetting } from './Settingcontext'

const Component3 = () => {
    const {settingState,setSettingState} = useSetting()
  return (
    <div>
        component3
        {settingState.settings.mode}
    </div>
  )
}

export default Component3