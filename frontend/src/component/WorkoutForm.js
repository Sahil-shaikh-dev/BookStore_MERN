import React, { useState } from "react";
import { useWorkoutContext } from "../hooks/useWorkoutContext";
import { useAuthContext } from "../hooks/useAuthContext";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutContext();
  const { user } = useAuthContext();
  const initialData = {
    title: "",
    load: "",
    reps: "",
  };
  const [data, setData] = useState(initialData);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const response = await fetch("/api/workouts", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    });
    const res = await response.json();
    if (!response.ok) {
      setError(res.error);
      setEmptyFields(res?.emptyFields);
    }
    if (response.ok) {
      setData(initialData);
      setError(null);
      console.log(
        "🚀 🛑 file: workoutForm.js:22 🛑 handleSubmit 🛑 res:>",
        res
      );
      dispatch({ type: "CREATE_WORKOUT", payload: res });
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
        className={emptyFields?.includes("title") ? "error" : ""}
      />

      <label>Load (in kg):</label>
      <input
        type="number"
        value={data?.load}
        onChange={(e) =>
          setData((preVal) => ({ ...preVal, load: e.target.value }))
        }
        className={emptyFields?.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        value={data?.reps}
        onChange={(e) =>
          setData((preVal) => ({ ...preVal, reps: e.target.value }))
        }
        className={emptyFields?.includes("reps") ? "error" : ""}
      />

      <button>Add Workout</button>

      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
