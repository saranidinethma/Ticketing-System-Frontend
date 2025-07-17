"use client"

import { useState, useEffect } from "react"
import { configureSystem } from "../services/api"
import { FaCog, FaPlane } from "react-icons/fa"

const ConfigurationForm = () => {
  const [totalTickets, setTotalTickets] = useState("")
  const [ticketReleaseRate, setTicketReleaseRate] = useState("")
  const [customerRetrievalRate, setCustomerRetrievalRate] = useState("")
  const [maxTicketCapacity, setMaxTicketCapacity] = useState("")
  const [errors, setErrors] = useState({})
  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  const [loading, setLoading] = useState(false)

  const validateInputs = () => {
    const newErrors = {}
    const totalTicketsNum = Number(totalTickets)
    const ticketReleaseRateNum = Number(ticketReleaseRate)
    const customerRetrievalRateNum = Number(customerRetrievalRate)
    const maxTicketCapacityNum = Number(maxTicketCapacity)

    if (!totalTickets || totalTicketsNum <= 0) newErrors.totalTickets = "Must be > 0"
    if (!ticketReleaseRate || ticketReleaseRateNum <= 0) newErrors.ticketReleaseRate = "Must be > 0"
    if (!customerRetrievalRate || customerRetrievalRateNum <= 0) newErrors.customerRetrievalRate = "Must be > 0"
    if (!maxTicketCapacity || maxTicketCapacityNum <= 0) newErrors.maxTicketCapacity = "Must be > 0"

    if (maxTicketCapacityNum < totalTicketsNum && totalTickets && maxTicketCapacity) {
      newErrors.maxTicketCapacity = "Must be ≥ total tickets"
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
        maxTicketTicketCapacity: Number(maxTicketCapacity),
      }
      await configureSystem(config)
      alert("Configuration set successfully!")
    } catch (error) {
      alert("Failed to set configuration: " + (error.response?.data?.message || error.message))
    } finally {
      setLoading(false)
    }
  }

  const formFields = [
    {
      label: "Total Flight Tickets",
      value: totalTickets,
      setter: setTotalTickets,
      placeholder: "e.g., 100",
      error: errors.totalTickets,
    },
    {
      label: "Release Rate (tickets/sec)",
      value: ticketReleaseRate,
      setter: setTicketReleaseRate,
      placeholder: "e.g., 5",
      error: errors.ticketReleaseRate,
    },
    {
      label: "Customer Retrieval Rate",
      value: customerRetrievalRate,
      setter: setCustomerRetrievalRate,
      placeholder: "e.g., 3",
      error: errors.customerRetrievalRate,
    },
    {
      label: "Maximum Capacity",
      value: maxTicketCapacity,
      setter: setMaxTicketCapacity,
      placeholder: "e.g., 200",
      error: errors.maxTicketCapacity,
    },
  ]

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg">
          <FaCog className="text-white text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Flight Configuration</h2>
          <p className="text-gray-600">Configure your flight ticketing parameters</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {formFields.map((field, index) => (
          <div key={index} className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
            <input
              type="number"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300"
              placeholder={field.placeholder}
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              required
            />
            {field.error && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                <span>⚠️</span> {field.error}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-98 flex items-center justify-center gap-2"
        disabled={isButtonDisabled || loading}
      >
        <FaPlane className={loading ? "animate-bounce" : ""} />
        {loading ? "Configuring Flight System..." : "Set Flight Configuration"}
      </button>
    </div>
  )
}

export default ConfigurationForm
