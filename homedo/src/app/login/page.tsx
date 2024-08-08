import React from 'react'
import CreateHome from '../Components/CreateHome'
import LoginHeader from '../Components/TasksComponents/NavigationHeader'
import {UserProvider} from "@/fireabase/Context/UserContext";

const login = () => {
  return (
    <main className="flex flex-col min-h-screen bg-blue-50">
        <UserProvider>
          <LoginHeader />
          <CreateHome />
        </UserProvider>
    </main>
  )
}

export default login