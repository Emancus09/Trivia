import { useState } from 'react'
import { io } from 'socket.io-client';
import {useEffect} from 'react';
import React from 'react';

function Track(props) {

  return (
    <div className='flex gap-2'>
        <div className='bg-stone-300 h-8 rounded-full' style={{width: `${props.player.progress * 80}vw`}}/>
        <div className='text-4xl'>{props.player.name}</div>
    </div>
  )
}

export default Track
