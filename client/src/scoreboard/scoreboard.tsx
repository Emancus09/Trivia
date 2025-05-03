import { useState } from 'react'
import { io } from 'socket.io-client';
import {useEffect} from 'react';
import React from 'react';
import Leaderboard from './leaderboard/leaderboard';
import heroText from './assets/hero-text.png';
import ghada1 from './assets/ghada1.png';
import ghada2 from './assets/ghada2.png';

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
    <div className='w-full h-full p-16 relative'>
      <div className='absolute w-200 top-16 left-200'>
        <Leaderboard players={[{name: 'jeremy', progress: 0.3}, {name: 'jeremy 2', progress: 0.1}, {name: 'evil jeremy', progress: 0.7}]}/>
      </div>
      <img src={heroText} className='hero-image absolute filter drop-shadow-2xl'/>
      <div className='absolute left-0 bottom-0 w-full p-16'>
        <div className='relative h-48 bg-red-100 rounded-xl shadow-xl p-8'>
          <div>Question 1:</div>
          <div>Pick a color</div>
          <img src={ghada1} className='sticker absolute right-0 top-0 rotate-right filter drop-shadow-2xl'/>
          <img src={ghada2} className='sticker absolute left-0 top-0 rotate-left filter drop-shadow-2xl'/>
        </div>
      </div>
    </div>
  )
}

export default App
