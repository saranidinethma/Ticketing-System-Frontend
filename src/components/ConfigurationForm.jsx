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

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <FaCog className="text-secondary text-xl" />
        <h2 className="text-2xl font-semibold text-dark">Configure System</h2>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-dark">Total Tickets</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
            placeholder="e.g., 100"
            value={totalTickets}
            onChange={(e) => setTotalTickets(e.target.value)}
            required
          />
          {errors.totalTickets && <p className="text-red-500 text-sm mt-1">{errors.totalTickets}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-dark">Release Rate (tickets/sec)</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
            placeholder="e.g., 5"
            value={ticketReleaseRate}
            onChange={(e) => setTicketReleaseRate(e.target.value)}
            required
          />
          {errors.ticketReleaseRate && <p className="text-red-500 text-sm mt-1">{errors.ticketReleaseRate}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-dark">Retrieval Rate</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
            placeholder="e.g., 3"
            value={customerRetrievalRate}
            onChange={(e) => setCustomerRetrievalRate(e.target.value)}
            required
          />
          {errors.customerRetrievalRate && <p className="text-red-500 text-sm mt-1">{errors.customerRetrievalRate}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-dark">Max Capacity</label>
          <input
            type="number"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-secondary focus:ring focus:ring-secondary focus:ring-opacity-50"
            placeholder="e.g., 200"
            value={maxTicketCapacity}
            onChange={(e) => setMaxTicketCapacity(e.target.value)}
            required
          />
          {errors.maxTicketCapacity && <p className="text-red-500 text-sm mt-1">{errors.maxTicketCapacity}</p>}
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-secondary text-white py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isButtonDisabled || loading}
        >
          {loading ? 'Setting...' : 'Set Configuration'}
        </button>
      </div>
    </div>
  )
}

export default ConfigurationForm