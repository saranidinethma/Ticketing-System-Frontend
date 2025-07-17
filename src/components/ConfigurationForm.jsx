import { useState, useEffect } from 'react'
import { configureSystem } from '../services/api'
import { FaCog } from 'react-icons/fa'

const ConfigurationForm = () => {
  const [totalTickets, setTotalTickets] = useState('')
  const [ticketReleaseRate, setTicketReleaseRate] = useState('')
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState('')
  const [maxTicketCapacity, setMaxTicketCapacity] = useState('')
  const [errors, setErrors] = useState({})
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const validateInputs = () => {
    const newErrors = {}
    const totalTicketsNum = Number(totalTickets)
    const ticketReleaseRateNum = Number(ticketReleaseRate)
    const customerRetrievalRateNum = Number(customerRetrievalRate)
    const maxTicketCapacityNum = Number(maxTicketCapacity)

    if (!totalTickets || totalTicketsNum <= 0) newErrors.totalTickets = 'Must be > 0'
    if (!ticketReleaseRate || ticketReleaseRateNum <= 0) newErrors.ticketReleaseRate = 'Must be > 0'
    if (!customerRetrievalRate || customerRetrievalRateNum <= 0) newErrors.customerRetrievalRate = 'Must be > 0'
    if (!maxTicketCapacity || maxTicketCapacityNum <= 0) newErrors.maxTicketCapacity = 'Must be > 0'
    if (maxTicketCapacityNum < totalTicketsNum && totalTickets && maxTicketCapacity) {
      newErrors.maxTicketCapacity = 'Must be ≥ total tickets'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  useEffect(() => {
    setIsButtonDisabled(!validateInputs())
  }, [totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity])

  const handleSubmit = async () => {
    if (!validateInputs()) return

    setLoading(true)
    try {
      const config = {
        totalTickets: Number(totalTickets),
        ticketReleaseRate: Number(ticketReleaseRate),
        customerRetrievalRate: Number(customerRetrievalRate),
        maxTicketTicketCapacity: Number(maxTicketCapacity)
      }
      await configureSystem(config)
      alert('Configuration set successfully!')
    } catch (error) {
      alert('Failed to set configuration: ' + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const formFields = [
    { label: 'Total Tickets', value: totalTickets, setter: setTotalTickets, placeholder: 'e.g., 100', error: errors.totalTickets },
    { label: 'Release Rate (tickets/sec)', value: ticketReleaseRate, setter: setTicketReleaseRate, placeholder: 'e.g., 5', error: errors.ticketReleaseRate },
    { label: 'Retrieval Rate', value: customerRetrievalRate, setter: setCustomerRetrievalRate, placeholder: 'e.g., 3', error: errors.customerRetrievalRate },
    { label: 'Max Capacity', value: maxTicketCapacity, setter: setMaxTicketCapacity, placeholder: 'e.g., 200', error: errors.maxTicketCapacity }
  ]

  return (
    <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <FaCog className="text-white text-xl animate-spin" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Configure System
          </h2>
        </div>
        
        <div className="space-y-6">
          {formFields.map((field, index) => (
            <div key={index} className="relative">
              <label className="block text-sm font-semibold text-white/90 mb-2">{field.label}</label>
              <input
                type="number"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm transition-all duration-300"
                placeholder={field.placeholder}
                value={field.value}
                onChange={(e) => field.setter(e.target.value)}
                required
              />
              {field.error && (
                <p className="text-red-400 text-sm mt-1 animate-pulse">{field.error}</p>
              )}
            </div>
          ))}
          
          <button
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:from-gray-500 disabled:to-gray-600 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-95 relative overflow-hidden"
            disabled={isButtonDisabled || loading}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
            <span className="relative z-10">
              {loading ? 'Setting...' : 'Set Configuration'}
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfigurationForm