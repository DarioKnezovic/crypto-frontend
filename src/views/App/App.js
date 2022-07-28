import React from 'react';
import './App.css';
import { io } from "socket.io-client";
import Toolbar from "../../components/Toolbar/Toolbar";

const App = () => {
  const socket = io("http://localhost:3000", {secure: true});

  socket.on('connect', () => {
    console.log("Connected");
  });

  return (
    <div className="app">
      <Toolbar />
    </div>
  );
}

export default App;
