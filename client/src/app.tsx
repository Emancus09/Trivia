import { useState } from 'react'
import { io } from 'socket.io-client';
import {useEffect} from 'react';
import React from 'react';

const URL = 'http://192.168.0.161:8000';
const socket = io(URL);

enum CLIENT_TYPE {
  Player,
  Host,
  Board
}

function App() {

  const onPlayerSelect = () => {
    setType(CLIENT_TYPE.Player);
  }

  const onHostSelect = () => {
    setType(CLIENT_TYPE.Host);
  }

  const onBoardSelect = () => {
    setType(CLIENT_TYPE.Board);
  }

  const [type, setType] = useState<CLIENT_TYPE | null>(null);
  const [name, setName] = useState<string>('');

  if (type === CLIENT_TYPE.Player) {
    return <div>Player</div>
  } else if (type === CLIENT_TYPE.Host) {
    return <div>Host</div>
  } else if (type === CLIENT_TYPE.Board) {
    return <div>Board</div>
  } else {
    return (
      <div className='w-full h-full p-16 flex flex-col align-items-stretch gap-4'>
        <input type="text" value={name} onChange={setName} className="h-16 block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
        <button type="submit" onClick={onPlayerSelect} className="h-16 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Player</button>
        <button type="submit" onClick={onHostSelect} className="h-16 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Host</button>
        <button type="submit" onClick={onBoardSelect} className="h-16 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Board</button>
      </div>
    );
  }
}

export default App
