import React from 'react'

function InputCheck({onclick,option,ele,setoption}) {
  return (
    <div>
    <input
    id="ele"
    type="checkbox"
     onChange={(e)=>onclick(e,option,setoption)}
     checked={ele==option}
     value={ele}
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-200 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
  />
  <label className="pl-2"></label>
</div>
  )
}

export default InputCheck