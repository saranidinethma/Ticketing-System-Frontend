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
      case 'vendor': return 'text-green-300 border-l-4 border-green-400 bg-green-500/10'
      case 'customer': return 'text-blue-300 border-l-4 border-blue-400 bg-blue-500/10'
      case 'cancel': return 'text-red-300 border-l-4 border-red-400 bg-red-500/10'
      case 'admin': return 'text-purple-300 border-l-4 border-purple-400 bg-purple-500/10'
      case 'error': return 'text-red-300 border-l-4 border-red-400 bg-red-500/20'
      case 'warning': return 'text-yellow-300 border-l-4 border-yellow-400 bg-yellow-500/10'
      case 'system': return 'text-cyan-300 border-l-4 border-cyan-400 bg-cyan-500/10'
      default: return 'text-gray-300 border-l-4 border-gray-400 bg-gray-500/10'
    }
  }

  const actionButtons = [
    { 
      icon: FaSync, 
      label: loading ? 'Loading...' : 'Refresh', 
      onClick: fetchLogs, 
      gradient: 'from-indigo-500 to-purple-500',
      disabled: loading
    },
    { 
      icon: FaClock, 
      label: autoRefresh ? 'Auto On' : 'Auto Off', 
      onClick: toggleAutoRefresh, 
      gradient: autoRefresh ? 'from-green-500 to-emerald-500' : 'from-gray-500 to-gray-600',
      disabled: false
    },
    { 
      icon: FaTrash, 
      label: 'Clear', 
      onClick: handleClearLogs, 
      gradient: 'from-red-500 to-rose-500',
      disabled: loading
    }
  ]

  const legendItems = [
    { type: 'vendor', color: 'bg-green-500', label: 'Vendor' },
    { type: 'customer', color: 'bg-blue-500', label: 'Customer' },
    { type: 'cancel', color: 'bg-red-500', label: 'Cancellation' },
    { type: 'admin', color: 'bg-purple-500', label: 'Admin' },
    { type: 'system', color: 'bg-cyan-500', label: 'System' },
  ]

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-500 hover:scale-[1.01] group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl shadow-lg">
              <FaClock className="text-white text-xl" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              System Logs
            </h2>
          </div>
          
          <div className="flex gap-3">
            {actionButtons.map((btn, index) => (
              <button
                key={index}
                onClick={btn.onClick}
                disabled={btn.disabled}
                className={`bg-gradient-to-r ${btn.gradient} text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center gap-2`}
              >
                <btn.icon className="text-sm" />
                <span className="text-sm">{btn.label}</span>
              </button>
            ))}
          </div>
        </div>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-300 p-4 rounded-xl mb-6">
            {error}
          </div>
        )}
        
        <div className="flex flex-wrap gap-4 mb-6">
          {legendItems.map(({ type, color, label }) => (
            <div key={type} className="flex items-center gap-2">
              <div className={`w-3 h-3 ${color} rounded-full shadow-lg`}></div>
              <span className="text-white/80 text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
        
        <div
          ref={logListRef}
          className="h-96 overflow-y-auto backdrop-blur-sm bg-black/30 border border-white/10 rounded-2xl p-6 font-mono text-sm"
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
                  className={`py-3 px-4 mb-2 rounded-lg ${logStyle} transition-all duration-300 hover:bg-opacity-20 break-words`}
                >
                  {logStr}
                </div>
              )
            })
          ) : (
            <div className="text-center text-white/60 py-16">
              <div className="text-4xl mb-4">📋</div>
              <div className="text-lg">
                {loading ? 'Loading logs...' : 'No logs available. Start the system to generate logs.'}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between text-sm text-white/60 mt-4">
          <span>Total logs: {logs.length}</span>
          <span>{autoRefresh ? 'Auto-refreshing every 3s' : 'Auto-refresh disabled'}</span>
        </div>
      </div>
    </div>
  )
}

export default LogDisplay