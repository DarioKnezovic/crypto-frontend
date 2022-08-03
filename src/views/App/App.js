import React from 'react';

import './App.css';
import Toolbar from "../../components/Toolbar/Toolbar";
import History from "../../components/History/History";

const App = () => {
    return (
    <div className="app">
        <Toolbar />
        <History />
    </div>
    );
}

export default App;
