import React, {Component} from 'react';
import './App.css';
import DashboardTable from "./DashboardTable";

class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Augur Supply Chain Logistics</h1>
                <DashboardTable/>
            </div>
        );
    }
}

export default App;
