import React from "react";

const WorkoutDetails = ({ item }) => {
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
      <p>{item?.createdAt}</p>
    </div>
  );
};

export default WorkoutDetails;
