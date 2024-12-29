import { useWorkoutsContext } from '../hooks/useContextWorkout'
import { FaTrashAlt } from "react-icons/fa";
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { format, parseISO } from 'date-fns';

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = useWorkoutsContext()

  const handleClick = async () => {
    const response = await fetch('/api/workouts/' + workout._id, {
      method: 'DELETE'
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_WORKOUT', payload: json})
    }
  }

  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p><strong>Load (kg): </strong>{workout.load}</p>
      <p><strong>Number of reps: </strong>{workout.reps}</p>
      <p>{format(parseISO(workout.createdAt), 'PPpp')}</p>
      <span onClick={handleClick}><FaTrashAlt /></span>
    </div>
  )
}

export default WorkoutDetails