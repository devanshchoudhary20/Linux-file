'use client'
import React from 'react'
import {useUser} from "@/fireabase/Context/UserContext";
import {addPlaceWithIncrementingId} from "@/fireabase/actions";
import {useRouter} from "next/navigation";

const CreateHome = () => {
    const {user,loading} = useUser()
    const [place, setPlace] = React.useState('')
    const [isSubmitted, setSubmitted] = React.useState(false);
const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
    // @ts-ignore
    console.log(user.uid);
    if(place.length < 1){alert("add Place Name first")}
    else {
        // @ts-ignore
        await addPlaceWithIncrementingId(user.uid, place)
        setSubmitted(true);
    }
}
    isSubmitted && useRouter().push('/home');

  return (
    <div className='min-h-screen flex mt-36'>
        <div className="flex-grow flex flex-col items-center justify-start p-4 mt-20">
            <h1 className="text-2xl font-bold mb-2">Name Your Place</h1>
            <p className="text-gray-600 text-center mb-8">
                Add places to differentiate home chores, work tasks, college life and more.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-start p-4 mt-20">
                <input
                    type="text"
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    className="w-full max-w-xs p-2 border-b-2 border-blue-500 focus:outline-none text-center text-lg bg-blue-50"
                />
                <input
                    type="submit"
                    value="submit"
                    className="mt-4 p-2 bg-blue-500 text-white cursor-pointer rounded-xl"
                    />
            </form>

        </div>
    </div>
  )
}

export default CreateHome