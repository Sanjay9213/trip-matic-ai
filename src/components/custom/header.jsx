import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className="flex justify-between items-center p-4 px-8 shadow-md bg-gradient-to-b from-blue-200 to-indigo-200 rounded-b-lg border-b border-gray-300">
    <img src="/logo.svg" alt="TripMatic Logo" className="h-10 w-auto" />
    <div>
      <Button className="px-5 py-2 bg-indigo-500 text-white hover:bg-indigo-600 font-medium rounded-md transition duration-200 shadow-sm">
        Sign In
      </Button>
    </div>
  </div>
  
  
  
  
  )
}

export default Header