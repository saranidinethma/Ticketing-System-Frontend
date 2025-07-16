import Layout from './components/Layout'
import ConfigurationForm from './components/ConfigurationForm'
import ControlPanel from './components/ControlPanel'
import TicketDisplay from './components/TicketDisplay'
import LogDisplay from './components/LogDisplay'

function App() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Real-Time Ticketing Simulator
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ConfigurationForm />
            <ControlPanel />
          </div>
          <div className="lg:col-span-2">
            <TicketDisplay />
            <LogDisplay />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default App