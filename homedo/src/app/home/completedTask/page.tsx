'use client'
import CompletedTaskList from '@/app/Components/CompletedTask/ViewCompletedTask'
import { SettingProvider } from '@/app/Context/GlobalContext'
import React from 'react'

const page = () => {
  return (
    <SettingProvider >
        <div className='h-full'>
            <CompletedTaskList />
        </div>
    </SettingProvider>
  )
}

export default page