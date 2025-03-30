import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Dashboard() {
  const [doubts, setDoubts] = useState([]) // Initialize as empty array
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/doubt/alldoubt', {
           // Add full URL
           withCredentials: true, // Include credentials for CORS
          headers: {
            'Content-Type': 'application/json' // Explicitly set content type
          }
        })
        console.log('222',response)
        
        
        // Ensure we always set an array, even if response.data.doubts is undefined
        setDoubts(response.data?.doubts || [])
        setLoading(false)
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch doubts')
        setLoading(false)
        // Reset doubts to empty array on error
        setDoubts([])
      }
    }

    fetchDoubts()
  }, [])

  const truncateText = (text, maxLength = 100) => {
    if (!text) return '' // Handle undefined/null text
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...'
    }
    return text
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Your Doubts</h1>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <p>{error}</p>
          </div>
        ) : (!doubts || doubts.length === 0) ? ( // Added null check for doubts
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-6 rounded">
            <p>No doubts found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {doubts.map((doubt) => (
              <div 
                key={doubt._id} 
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 flex flex-col"
              >
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {truncateText(doubt?.title, 30)} {/* Added optional chaining */}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm">
                    {truncateText(doubt?.description, 120)} {/* Added optional chaining */}
                  </p>
                </div>
                
                <div className="mt-auto pt-3 border-t border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      Tip Amount: 
                      <span className="ml-1 text-blue-600">${doubt?.tipAmount || '0'}</span> {/* Added fallback */}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      doubt?.status === 'open' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {doubt?.status || 'unknown'} {/* Added fallback */}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs text-gray-500">
                    <span>
                      Created: {doubt?.createdAt ? new Date(doubt.createdAt).toLocaleDateString() : 'N/A'}
                    </span>
                    <span>
                      Updated: {doubt?.updatedAt ? new Date(doubt.updatedAt).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard