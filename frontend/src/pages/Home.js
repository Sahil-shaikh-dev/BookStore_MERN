import React, { useEffect, useState } from "react";
import WorkoutDetails from "../component/WorkoutDetails";
import WorkoutForm from "../component/WorkoutForm";

const Home = () => {
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    const response = await fetch("/api/workouts");
    const res = await response.json();

    if (response.ok) {
      setWorkouts(res);
    }
  };

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts?.map((item) => {
            return <WorkoutDetails key={item?._id} item={item} />;
          })}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
