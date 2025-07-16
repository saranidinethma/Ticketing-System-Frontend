import { useEffect, useState, useRef } from 'react'
import { getLogs, clearLogs } from '../services/api'
import { FaSync, FaTrash, FaClock } from 'react-icons/fa'

const LogDisplay = () => {
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const logListRef = useRef(null)
  const intervalRef = useRef(null)

  const fetchLogs = async () => {
    setLoading(true)
    setError(null)
    try {
      const logData = await getLogs()
      setLogs(Array.isArray(logData) ? logData : [])
    } catch (error) {
      setError(`Failed to fetch logs: ${error.message || 'Unknown error'}`)
    } finally {
      setLoading(false)
    }
  }

  const handleClearLogs = async () => {
    try {
      await clearLogs()
      setLogs([])
    } catch (error) {
      setError(`Failed to clear logs: ${error.message}`)
    }
  }

  const toggleAutoRefresh = () => {
    setAutoRefresh(!autoRefresh)
  }

  useEffect(() => {
    fetchLogs()
    if (autoRefresh) {
      intervalRef.current = setInterval(fetchLogs, 3000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [autoRefresh])

  useEffect(() => {
    if (logListRef.current) {
      logListRef.current.scrollTop = logListRef.current.scrollHeight
    }
  }, [logs])

  const getLogType = (log) => {
    if (!log || typeof log !== 'string') return 'info'
    if (log.includes('[Vendor-') || log.includes('added') && log.includes('tickets')) return 'vendor'
    if (log.includes('[Customer-') || log.includes('purchased') || log.includes('retrieved')) return 'customer'
    if (log.includes('canceled') || log.includes('cancelled')) return 'cancel'
    if (log.includes('Admin') || log.includes('returned')) return 'admin'
    if (log.includes('started') || log.includes('Simulation') || log.includes('initialized')) return 'system'
    if (log.includes('WARNING')) return 'warning'
    if (log.includes('SEVERE') || log.includes('ERROR') || log.includes('Failed')) return 'error'
    return 'info'
  }

  const getLogStyle = (type) => {
    switch (type) {
      case 'vendor': return { color: '#28a745', fontWeight: 'bold' }
      case 'customer': return { color: '#007bff', fontWeight: 'normal' }
      case 'cancel': return { color: '#dc3545', fontWeight: 'normal' }
      case 'admin': return { color: '#6f42c1', fontWeight: 'bold' }
      case 'error': return { color: '#dc3545', fontWeight: 'bold' }
      case 'warning': return { color: '#ffc107', fontWeight: 'bold' }
      case 'system': return { color: '#17a2b8', fontWeight: 'normal' }
      default: return { color: '#6c757d', fontWeight: 'normal' }
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-dark flex items-center gap-2">
          <FaClock className="text-secondary" /> System Logs
        </h2>
        <div className="flex gap-2">
          <button
            onClick={fetchLogs}
            disabled={loading}
            className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FaSync /> {loading ? 'Loading...' : 'Refresh'}
          </button>
          <button
            onClick={toggleAutoRefresh}
            className={`px-4 py-2 rounded-md text-white ${autoRefresh ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} transition-colors flex items-center gap-2`}
          >
            <FaClock /> {autoRefresh ? 'Auto On' : 'Auto Off'}
          </button>
          <button
            onClick={handleClearLogs}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FaTrash /> Clear
          </button>
        </div>
      </div>
      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
          {error}
        </div>
      )}
      <div className="flex flex-wrap gap-4 mb-4">
        {[
          { type: 'vendor', color: '#28a745', label: 'Vendor' },
          { type: 'customer', color: '#007bff', label: 'Customer' },
          { type: 'cancel', color: '#dc3545', label: 'Cancellation' },
          { type: 'admin', color: '#6f42c1', label: 'Admin' },
          { type: 'system', color: '#17a2b8', label: 'System' },
        ].map(({ type, color, label }) => (
          <div key={type} className="flex items-center">
            <span className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: color }}></span>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div
        ref={logListRef}
        className="h-96 overflow-y-auto border border-gray-200 rounded-md p-4 bg-light font-mono text-sm"
      >
        {logs.length > 0 ? (
          logs.map((log, index) => {
            if (!log) return null
            const logStr = typeof log === 'string' ? log : JSON.stringify(log)
            const logType = getLogType(logStr)
            const logStyle = getLogStyle(logType)
            return (
              <div
                key={index}
                className="py-2 border-b border-gray-100 last:border-b-0 break-words"
                style={logStyle}
              >
                {logStr}
              </div>
            )
          })
        ) : (
          <div className="text-center text-gray-500 py-8">
            {loading ? 'Loading logs...' : 'No logs available. Start the system to generate logs.'}
          </div>
        )}
      </div>
      <div className="flex justify-between text-sm text-gray-500 mt-2">
        <span>Total logs: {logs.length}</span>
        <span>{autoRefresh ? 'Auto-refreshing every 3s' : 'Auto-refresh disabled'}</span>
      </div>
    </div>
  )
}

export default LogDisplay