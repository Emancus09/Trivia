import { useState } from 'react'
import { io } from 'socket.io-client';
import {useEffect} from 'react';
import React from 'react';

function Track(props) {

  return (
    <div className='bg-[#FECA3F] h-8 w-full rounded-xl relative leaderboard p-2'>
        <div className='bg-[#EB564F] h-full rounded-xl' style={{width: `${props.player.progress * 100}%`}}/>
    </div>
  )
}

export default Track
