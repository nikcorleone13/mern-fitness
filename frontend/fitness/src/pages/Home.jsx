import React from 'react'
import { getAllExercise } from '../services/exercise'

const Home = () => {
  getAllExercise();
  return (
    <div className='w-[80%] mx-auto h-full py-8'>
        <h1 className='text-2xl font-semibold'>Summary</h1>
        <div>
            
        </div>
    </div>
  )
}

export default Home