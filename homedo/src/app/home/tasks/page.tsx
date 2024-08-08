'use client'
import AllTask from '@/app/Components/AllTask/AllTask'
import { SettingProvider } from '@/app/Context/GlobalContext'
import { ItemProvider } from '@/app/Context/ItemContext'
import React from 'react'

const page = () => {
  return (
    <SettingProvider>
      <ItemProvider>
        <div className='h-full'>
          <AllTask />
        </div>
      </ItemProvider>
    </SettingProvider>
  )
}

export default page