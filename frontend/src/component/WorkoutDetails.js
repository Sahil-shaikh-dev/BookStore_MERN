import React from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutDetails = ({ item }) => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(`/api/workouts/${item?._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    });

    const res = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: res });
    }
  };

  return (
    <div className="workout-details">
      <h4>{item?.title}</h4>
      <p>
        <strong>Load (kg): </strong>
        {item?.load}
      </p>
      <p>
        <strong>Reps: </strong>
        {item?.reps}
      </p>
      <p>
        {formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleDelete}>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;
