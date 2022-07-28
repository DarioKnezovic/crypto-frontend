import React from 'react';
import './App.css';
import { io } from "socket.io-client";


function App() {
  const socket = io("http://localhost:3000", {secure: true});

  socket.on('connect', () => {
    console.log("Connected");
  });

  return (
    <div className="App">
      <h1>Exchange</h1>
    </div>
  );
}

export default App;
