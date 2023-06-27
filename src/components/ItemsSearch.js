import FilesContext from '@/context/FilesContext/FilesContext';
import {useContext, useRef} from 'react'


export default function ItemSearch() {
  const context= useContext(FilesContext);
  const formRef = useRef();
  const handleFilterFiles = (e) =>{
  
    console.log(typeof(filterFiles))
    let textValue = formRef.current["input-filter-by-name"].value;
    let typeValue = formRef.current["input-filter-by-type"].value;
    if(!typeValue)
      context.filterFiles(textValue, null);
    else
      context.filterFiles(textValue,typeValue);
    
    
  }

  return (

<form style={{height:"100px"}} ref={formRef}>
    <div className="flex my-3">
        <div>
          <select onChange={handleFilterFiles} name="input-filter-by-type" className="focus:ring-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600">
          <option value="" >All files</option>
          <option value="pdf">Pdf</option>
          <option value="png">Images</option>
          </select>
        </div>
        <div className="relative w-full">
        <input onChange={handleFilterFiles} type="search" name="input-filter-by-name" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Mockups, Logos, Design Templates..." required/>

            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-500 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span className="sr-only">Search</span>
            </button>
        </div>
    </div>
</form>

  )
}


