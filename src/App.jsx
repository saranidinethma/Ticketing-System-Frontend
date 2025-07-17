import Layout from "./components/Layout"
import ConfigurationForm from "./components/ConfigurationForm"
import ControlPanel from "./components/ControlPanel"
import TicketDisplay from "./components/TicketDisplay"
import LogDisplay from "./components/LogDisplay"
import FlightStatus from "./components/FlightStatus"

function App() {
  return (
    <Layout>
      <div className="space-y-8">
        {/* Flight Status - New Addition */}
        <div className="animate-slideIn">
          <FlightStatus />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-slideIn" style={{ animationDelay: "0.1s" }}>
              <ConfigurationForm />
            </div>
            <div className="animate-slideIn" style={{ animationDelay: "0.2s" }}>
              <ControlPanel />
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="animate-slideIn" style={{ animationDelay: "0.3s" }}>
              <TicketDisplay />
            </div>
          </div>
        </div>

        {/* Full Width Log Display */}
        <div className="animate-slideIn" style={{ animationDelay: "0.4s" }}>
          <LogDisplay />
        </div>
      </div>
    </Layout>
  )
}

export default App
