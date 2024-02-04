import { useState } from "react";
import { useForm } from "react-hook-form";

export default function BmiWithForm() {
  const [bmi, setBmi] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    const heightMetaData = data.height.split(".");
    const heightInMeters =
      heightMetaData[0] * 0.3048 + heightMetaData[1] * 0.0254;
    const calculatedBmi = (
      data.weight /
      (heightInMeters * heightInMeters)
    ).toFixed(2);
    setBmi(calculatedBmi);
  };

  const handleClearForm = () => {
    // Clear the form values without submitting
    reset({
      weight: "",
      height: "",
    });
  };

  // UI
  return (
    <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="form-label" htmlFor="weight">
          Weight (kg) :
        </label>
        <input
          className="form-input"
          type="text"
          id="weight"
          {...register("weight", { required: true, maxLength: 3 })}
        />
      </div>
      {errors.weight && <p className="error-message">Please fill weight</p>}
      <br />
      <div>
        <label className="form-label" htmlFor="height">
          Height(inch):
        </label>
        <input
          className="form-input"
          type="text"
          id="height"
          {...register("height", {
            required: true,
            pattern: /^[0-9]*(\.[0-9]+)?$/,
            maxLength: 4,
            validate: (value) => parseFloat(value) <= 8.0,
          })}
        />
      </div>
      {errors.height && <p className="error-message">Please fill height</p>}
      <br />
      <button className="form-button" type="submit" disabled={!isValid} >
        Submit
      </button>
      &nbsp;
      <button
        className="form-reload-button"
        type="button"
        // disabled={!isValid} // Example to show case all disable value.
         disabled={!isValid} 
        
        onClick={handleClearForm}
      >
        Reload
      </button>
      {bmi ? <p>Your BMI is: {bmi}</p> : null}
    </form>
  );
}
