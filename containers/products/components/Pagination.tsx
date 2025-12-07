import React from 'react'

const Pagination = () => {
  return (
    <nav className="flex items-center space-x-2">
      <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50">
        Anterior
      </button>
      <button className="px-3 py-2 text-sm font-medium text-white bg-merlot border border-merlot hover:bg-merlot-700">
        1
      </button>
      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
        2
      </button>
      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50">
        3
      </button>
      <button className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50">
        Siguiente
      </button>
    </nav>
  )
}

export default Pagination
