import { useEffect, useState } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch('/api/workouts');

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const json = await response.json();
          setWorkouts(json);
        } else {
          throw new Error("Expected JSON but received non-JSON response");
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching workouts:", err.message);
      }
    };

    fetchWorkouts();
  }, []);

  return (
    <div className="home">
      {error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="workouts">
          {workouts &&
            workouts.map((workout) => (
              <WorkoutDetails workout={workout} key={workout._id} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
