import React, { useState } from "react";

const WorkoutForm = () => {
  const initialData = {
    title: "",
    load: "",
    reps: "",
  };
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await response.json();
    if (!response.ok) {
      setError(res.error);
    }
    if (response.ok) {
      setData(initialData);
      setError(null);
      console.log(
        "🚀 🛑 file: workoutForm.js:22 🛑 handleSubmit 🛑 res:>",
        res
      );
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input
        type="text"
        value={data?.title}
        onChange={(e) =>
          setData((preVal) => ({ ...preVal, title: e.target.value }))
        }
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        value={data?.load}
        onChange={(e) =>
          setData((preVal) => ({ ...preVal, load: e.target.value }))
        }
      />

      <label>Reps:</label>
      <input
        type="number"
        value={data?.reps}
        onChange={(e) =>
          setData((preVal) => ({ ...preVal, reps: e.target.value }))
        }
      />

      <button>Add Workout</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
