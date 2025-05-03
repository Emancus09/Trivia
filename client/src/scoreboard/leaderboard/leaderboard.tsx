import Track from './track';
import 'react';

function Leaderboard(props) {

  return (
    <div className='flex flex-col gap-4 bg-[#FEFFFA] rounded-xl p-4 outline-8 outline-[#EB564F]'>
        {props.players.map(player => <Track player={player}/>)}
    </div>
  )
}

export default Leaderboard
