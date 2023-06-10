import { useState } from 'react'
import './App.scss'
import Header from './components/Header'
import Tabs from './components/Tabs'
import RecipeLists from './components/Recipe'
import ErrorBoundary from './ErrorBoundary'

function App() {
  const [loader, setLoader] = useState(true)
  const [selectedTab, setSelectedTab] = useState('Pizza')
  const [selectedRecipe, setSelectedRecipe] = useState(null)

  return (
    <div className='App'>
      <ErrorBoundary>
        <Header />
        <Tabs setLoader={setLoader} setSelectedTab={setSelectedTab} selectedRecipe={selectedRecipe} />
        <RecipeLists setLoader={setLoader} selectedTab={selectedTab} setSelectedRecipe={setSelectedRecipe} />
        {loader && <div className='loader'>
          <div className='spinner'></div>
        </div>}
      </ErrorBoundary>
    </div>
  )
}

export default App


