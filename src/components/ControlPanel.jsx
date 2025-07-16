import { useState } from 'react'
import { startSystem, stopSystem, resetSystem, clearLogs } from '../services/api'
import { FaPlay, FaStop, FaRedo } from 'react-icons/fa'

const ControlPanel = () => {
  const [loading, setLoading] = useState(false)

  const handleStart = async () => {
    setLoading(true)
    try {
      await startSystem()
      alert('System started!')
    } catch (error) {
      alert('Error starting system: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleStop = async () => {
    setLoading(true)
    try {
      await stopSystem()
      alert('System stopped!')
    } catch (error) {
      alert('Error stopping system: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    setLoading(true)
    try {
      await resetSystem()
      await clearLogs()
      alert('System reset and logs cleared!')
    } catch (error) {
      alert('Error resetting system: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-dark mb-4 flex items-center gap-2">
        <FaPlay className="text-secondary" /> Control Panel
      </h2>
      <div className="flex gap-4">
        <button
          onClick={handleStart}
          className="flex-1 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading}
        >
          <FaPlay /> {loading ? 'Starting...' : 'Start System'}
        </button>
        <button
          onClick={handleStop}
          className="flex-1 bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading}
        >
          <FaStop /> {loading ? 'Stopping...' : 'Stop System'}
        </button>
        <button
          onClick={handleReset}
          className="flex-1 bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          disabled={loading}
        >
          <FaRedo /> {loading ? 'Resetting...' : 'Reset System'}
        </button>
      </div>
    </div>
  )
}

export default ControlPanel