import React, { useEffect } from "react";
import WorkoutDetails from "../component/WorkoutDetails";
import WorkoutForm from "../component/WorkoutForm";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  useEffect(() => {
    if (user) {
      fetchWorkouts();
    }
  }, []);

  const fetchWorkouts = async () => {
    const response = await fetch("/api/workouts", {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const res = await response.json();

    if (response.ok) {
      dispatch({ type: "SET_WORKOUTS", payload: res });
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
