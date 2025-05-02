import { useState } from 'react'
import { io } from 'socket.io-client';
import {useEffect} from 'react';
import React from 'react';
import Leaderboard from './leaderboard/leaderboard';

const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://192.168.0.161:8000';

const socket = io(URL);

function App() {

  useEffect(() => {
    function onConnect() {
    }

    function onDisconnect() {
    }

    function onFooEvent(value) {
      console.log('here');
      setCount(previous => `${previous}.${value}`);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('foo', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, []);

  const [count, setCount] = useState('')

  return (
    <div className='w-full h-full flex flex-col p-16 justify-between'>
      <div className='text-9xl'>&#129322; Ghada's super fun trivia &#129322;</div>
      <Leaderboard players={[{name: 'jeremy', progress: 0.3}, {name: 'jeremy 2', progress: 0.1}, {name: 'evil jeremy', progress: 0.7}]}/>
    </div>
  )
}

export default App
