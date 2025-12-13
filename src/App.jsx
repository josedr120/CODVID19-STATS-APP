import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import GlobalStats from './components/global/GlobalStats'
import USStatesStats from './components/us-states/USStatesStats'
import CountriesStats from './components/countries/CountriesStats'

function App() {
  const [activeTab, setActiveTab] = useState('us-states')

  return (
    <div className="min-h-screen flex flex-col bg-base-200">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Global Stats Section */}
        <GlobalStats />

        {/* Tabs for US States and Countries */}
        <div className="mt-8">
          <div role="tablist" className="tabs tabs-boxed bg-base-100 p-1 w-fit mx-auto mb-6">
            <button
              role="tab"
              className={`tab tab-lg ${activeTab === 'us-states' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('us-states')}
            >
              US States
            </button>
            <button
              role="tab"
              className={`tab tab-lg ${activeTab === 'countries' ? 'tab-active' : ''}`}
              onClick={() => setActiveTab('countries')}
            >
              Countries
            </button>
          </div>

          {/* Tab Content */}
          <div className="mt-4">
            {activeTab === 'us-states' && <USStatesStats />}
            {activeTab === 'countries' && <CountriesStats />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
