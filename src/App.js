import React from 'react';
import './styles/App.css';
import DashboardPage from './components/DashboardPage';

function App() {
    return (
      <div className="App-background">
        <div className="App">
          <h1>Augur Supply Chain Logistics</h1>
          <DashboardPage />
        </div>
      </div>
    );
  }
  

export default App;