import React, { useEffect, useState } from 'react'
import { useAuth, useUser } from '@clerk/clerk-react'
import api, { buildAuthHeaders } from '../lib/api'
import { FileText, Image as ImageIcon, FileType, Search, X, Loader2 } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

const Dashboard = () => {
  const { user } = useUser()
  const { getToken } = useAuth()
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const headers = await buildAuthHeaders(getToken)
        const { data } = await api.get('/api/user/get-user-creations', { headers })
        if (data.success) {
          setHistory(data.creations)
        }
      } catch (error) {
        console.error('Failed to fetch history:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchHistory()
  }, [getToken])

  const getIcon = (type) => {
    switch (type) {
      case 'image': return <ImageIcon className="w-5 h-5 text-purple-500" />
      case 'blog': return <FileText className="w-5 h-5 text-blue-500" />
      case 'article': return <FileType className="w-5 h-5 text-green-500" />
      case 'resume-analysis': return <Search className="w-5 h-5 text-orange-500" />
      default: return <FileText className="w-5 h-5 text-gray-500" />
    }
  }

  const getLabel = (type) => {
    switch (type) {
      case 'image': return 'Image Generation'
      case 'blog': return 'Blog Post'
      case 'article': return 'Article'
      case 'resume-analysis': return 'Resume Analysis'
      default: return 'Creation'
    }
  }

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800">Hi, {user?.firstName || 'User'} 👋</h1>
        <p className="mt-2 text-gray-600 mb-8">Here is your recent generation history.</p>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-teal-500" />
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-500 text-lg">No history yet. Start creating!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-gray-100 transition-colors">
                      {getIcon(item.type)}
                    </div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">{getLabel(item.type)}</span>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(item.created_at).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="text-gray-800 font-medium line-clamp-2 mb-2">
                  {item.prompt}
                </h3>

                {item.type === 'image' && (
                  <div className="mt-3 rounded-lg overflow-hidden h-32 w-full bg-gray-100">
                    <img src={item.content} alt={item.prompt} className="w-full h-full object-cover" />
                  </div>
                )}

                {item.type !== 'image' && (
                  <p className="text-sm text-gray-500 line-clamp-3">
                    {item.content}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal View */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedItem(null)}>
          <div
            className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl animate-in fade-in zoom-in duration-200"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3">
                {getIcon(selectedItem.type)}
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase block">{getLabel(selectedItem.type)}</span>
                  <h2 className="text-lg font-semibold text-gray-900 line-clamp-1">{selectedItem.prompt}</h2>
                </div>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {selectedItem.type === 'image' ? (
                <div className="flex justify-center bg-gray-50 rounded-xl p-4">
                  <img src={selectedItem.content} alt={selectedItem.prompt} className="max-h-[70vh] rounded-lg shadow-sm" />
                </div>
              ) : (
                <div className="prose prose-sm md:prose-base max-w-none text-slate-700">
                  <ReactMarkdown>
                    {selectedItem.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100 text-xs text-gray-400 flex justify-between px-6">
              <span>ID: {selectedItem.id}</span>
              <span>Created: {new Date(selectedItem.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
