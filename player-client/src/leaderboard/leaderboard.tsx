import Track from './track';
import 'react';

function Leaderboard(props) {

  return (
    <div className='flex flex-col gap-4'>
        {props.players.map(player => <Track player={player}/>)}
    </div>
  )
}

export default Leaderboard
