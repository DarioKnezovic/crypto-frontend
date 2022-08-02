import React from 'react';

import './App.css';
import { io } from "socket.io-client";
import Toolbar from "../../components/Toolbar/Toolbar";
import History from "../../components/History/History";
import constants from "../../constants";

const App = () => {
    const socket = io(constants.SOCKET_URL, {secure: true});

    socket.on(constants.SOCKET_EVENTS.CONNECT, () => {
    console.log("Connected");
    });

    socket.on(constants.SOCKET_EVENTS.LATEST_CURRENCY_RATES, (data) => {
      console.log(data)
    })

    return (
    <div className="app">
        <Toolbar />
        <History />
    </div>
    );
}

export default App;
