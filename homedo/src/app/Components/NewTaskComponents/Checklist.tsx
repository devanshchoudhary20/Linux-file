import TodoList from '@/app/Components/NewTaskComponents/TodoList'
import React from 'react'
import { ItemProvider } from '@/app/Context/ItemContext'

const Checklist = ({isEdit,editTask}) => {

  return (
      <div className='h-full'>
        <TodoList 
        isEdit = {isEdit}
        editTask = {editTask}
        />
      </div>
  )
}

export default Checklist;