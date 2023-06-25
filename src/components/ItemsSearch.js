import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const people = [
  { name: 'Show Images' },
  { name: 'Show Files' },
  { name: 'ShowEverything' }
]

export default function ItemSearch() {
  const [selected, setSelected] = useState(people[0])

  return (

<form style={{height:"100px"}}>
    <div className="flex my-3">
        <div>
        <select id="dropdown" className="focus:ring-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
        <option value="show-everything" className="bg-black text-white hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white">Show Everything</option>
        <option value="mockups" className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</option>
        <option value="templates" className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</option>
        <option value="design" className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</option>
        <option value="logos" className="hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</option>
        </select>


        </div>
        <div className="relative w-full">
        <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required/>

            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-500 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
        </div>
    </div>
</form>

  )
}


