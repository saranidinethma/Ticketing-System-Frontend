"use client"

import { useEffect, useState, useRef } from "react"
import { getLogs, clearLogs } from "../services/api"
import { FaSync, FaTrash, FaClock, FaHistory } from "react-icons/fa"

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
      setError(`Failed to fetch logs: ${error.message || "Unknown error"}`)
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
    if (!log || typeof log !== "string") return "info"
    if (log.includes("[Vendor-") || (log.includes("added") && log.includes("tickets"))) return "vendor"
    if (log.includes("[Customer-") || log.includes("purchased") || log.includes("retrieved")) return "customer"
    if (log.includes("canceled") || log.includes("cancelled")) return "cancel"
    if (log.includes("Admin") || log.includes("returned")) return "admin"
    if (log.includes("started") || log.includes("Simulation") || log.includes("initialized")) return "system"
    if (log.includes("WARNING")) return "warning"
    if (log.includes("SEVERE") || log.includes("ERROR") || log.includes("Failed")) return "error"
    return "info"
  }

  const getLogStyle = (type) => {
    switch (type) {
      case "vendor":
        return "text-green-700 border-l-4 border-green-400 bg-green-50"
      case "customer":
        return "text-blue-700 border-l-4 border-blue-400 bg-blue-50"
      case "cancel":
        return "text-red-700 border-l-4 border-red-400 bg-red-50"
      case "admin":
        return "text-purple-700 border-l-4 border-purple-400 bg-purple-50"
      case "error":
        return "text-red-700 border-l-4 border-red-500 bg-red-100"
      case "warning":
        return "text-yellow-700 border-l-4 border-yellow-400 bg-yellow-50"
      case "system":
        return "text-cyan-700 border-l-4 border-cyan-400 bg-cyan-50"
      default:
        return "text-gray-700 border-l-4 border-gray-400 bg-gray-50"
    }
  }

  const actionButtons = [
    {
      icon: FaSync,
      label: loading ? "Loading..." : "Refresh",
      onClick: fetchLogs,
      gradient: "from-blue-600 to-blue-700",
      disabled: loading,
    },
    {
      icon: FaClock,
      label: autoRefresh ? "Auto On" : "Auto Off",
      onClick: toggleAutoRefresh,
      gradient: autoRefresh ? "from-green-600 to-green-700" : "from-gray-500 to-gray-600",
      disabled: false,
    },
    {
      icon: FaTrash,
      label: "Clear",
      onClick: handleClearLogs,
      gradient: "from-red-600 to-red-700",
      disabled: loading,
    },
  ]

  const legendItems = [
    { type: "vendor", color: "bg-green-500", label: "Airline" },
    { type: "customer", color: "bg-blue-500", label: "Passenger" },
    { type: "cancel", color: "bg-red-500", label: "Cancellation" },
    { type: "admin", color: "bg-purple-500", label: "Admin" },
    { type: "system", color: "bg-cyan-500", label: "System" },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl shadow-lg">
            <FaHistory className="text-white text-2xl" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Flight Activity Logs</h2>
            <p className="text-gray-600">Real-time system monitoring</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {actionButtons.map((btn, index) => (
            <button
              key={index}
              onClick={btn.onClick}
              disabled={btn.disabled}
              className={`bg-gradient-to-r ${btn.gradient} text-white px-4 py-2 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 flex items-center gap-2`}
            >
              <btn.icon className="text-sm" />
              <span className="text-sm">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-6 flex items-center gap-2">
          <span>⚠️</span>
          {error}
        </div>
      )}

      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
        {legendItems.map(({ type, color, label }) => (
          <div key={type} className="flex items-center gap-2">
            <div className={`w-3 h-3 ${color} rounded-full shadow-sm`}></div>
            <span className="text-gray-700 text-sm font-medium">{label}</span>
          </div>
        ))}
      </div>

      <div
        ref={logListRef}
        className="h-96 overflow-y-auto bg-gray-50 border border-gray-200 rounded-xl p-6 font-mono text-sm"
      >
        {logs.length > 0 ? (
          logs.map((log, index) => {
            if (!log) return null
            const logStr = typeof log === "string" ? log : JSON.stringify(log)
            const logType = getLogType(logStr)
            const logStyle = getLogStyle(logType)
            return (
              <div
                key={index}
                className={`py-3 px-4 mb-2 rounded-lg ${logStyle} transition-all duration-300 hover:shadow-sm break-words`}
              >
                {logStr}
              </div>
            )
          })
        ) : (
          <div className="text-center text-gray-500 py-16">
            <div className="text-4xl mb-4">✈️</div>
            <div className="text-lg">
              {loading ? "Loading flight logs..." : "No flight activity yet. Start the system to begin monitoring."}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between text-sm text-gray-600 mt-4 p-4 bg-gray-50 rounded-xl">
        <span>Total logs: {logs.length}</span>
        <span>{autoRefresh ? "Auto-refreshing every 3s" : "Auto-refresh disabled"}</span>
      </div>
    </div>
  )
}

export default LogDisplay
