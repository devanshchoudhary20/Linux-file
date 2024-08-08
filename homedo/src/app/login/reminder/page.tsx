import DailyReminderSettings from '@/app/Components/EnableReminder';
import NavigationHeader from '@/app/Components/TasksComponents/NavigationHeader'
import React from 'react'
import { FaBell } from "react-icons/fa";

const Reminder = () => {
  return (
    <div className='min-h-screen flex flex-col bg-blue-50'>
      <NavigationHeader />
      <div>
        <FaBell className='min-h-40 text-5xl'/>
      </div>
      <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl font-bold mb-2">Set up Cleaning Reminder</h1>
            <p className="text-gray-600 text-center mb-8">
                Set a time to show a notification when there are tasks due today.
            </p>
      </div>
      <DailyReminderSettings text ={"Enable Daily Reminder"}/>
      

    </div>
  )
}

export default Reminder