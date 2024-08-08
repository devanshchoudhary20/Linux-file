'use client'
import React from 'react'
import MyHome from '../Components/HomeComponents/MyHome'
import { ItemProvider } from '../Context/ItemContext'
import { SettingProvider } from '../Context/GlobalContext'
import { UserProvider } from '@/fireabase/Context/UserContext'
const page = () => {
  return (
    <div className=''>
      <SettingProvider>
        <ItemProvider>
          <UserProvider>
            <MyHome />
          </UserProvider>
        </ItemProvider>
      </SettingProvider>
    </div>
  )
}

export default page