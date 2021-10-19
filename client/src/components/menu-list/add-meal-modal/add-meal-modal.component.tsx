import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Axios from "axios";
import { DateTime } from "luxon";

type Inputs = {
  mealName: string;
  season: "All" | "Cold" | "Hot";
};

const regex_for_meals = /^[\w /&'-]+/g;

export const AddMealModal: FC = () => {
  /* useForm hook for all inputs in the modal */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  /* Success Message next to the "Add" button */
  const [successMessage, setSuccessMessage] = useState(
    <span className="ml-1"></span>
  );

  /* This is run when the "Add" button is pressed */
  const addMealToDatabase: SubmitHandler<Inputs> = async ({
    mealName,
    season,
  }) => {
    /* Create a filler date */
    const fillerDate = DateTime.local(1900).startOf("day").toUTC().toString();

    /* Add meal to the "meals" collection, only worry about the status */
    let { status } = await Axios.post("/api/addMealToDatabase", {
      mealName: mealName,
      lastServing: fillerDate,
      season: season,
    });

    /* When a response is received: */
    if (status === 200) {
      setSuccessMessage(<span className="ms-1">Added Successfully!</span>);

      /* After two seconds, clear the message */
      setTimeout(() => {
        setSuccessMessage(<span className="ml-1"></span>);
      }, 2000);
    } else {
      setSuccessMessage(<span className="ms-1">There was an error!</span>);

      /* After two seconds, clear the message */
      setTimeout(() => {
        setSuccessMessage(<span className="ml-1"></span>);
      }, 2000);
    }

    /* Reset all fields */
    reset();
  };

  return (
    <div
      className="modal"
      id="addMealModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      {/* These two div tags are present in the documentation, so they are included here */}
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Modal Header */}
          <div className="modal-header">
            <h5 className="modal-title">Add a New Meal</h5>
          </div>

          {/* Modal Body */}
          <div className="modal-body">
            <form onSubmit={handleSubmit(addMealToDatabase)}>
              {/* Meal Name */}
              <div className="mb-3">
                <label className="form-label">Meal Name</label>
                <input
                  {...register("mealName", {
                    required: true,
                    maxLength: 100,
                    minLength: 5,
                    pattern: regex_for_meals,
                  })}
                  className="form-control"
                />
                {errors.mealName && (
                  <span>** Please enter a valid meal **</span>
                )}
              </div>

              {/* Season */}
              <div className="mb-3">
                <label className="form-label">Season</label>
                <select {...register("season")} className="form-select mb-1">
                  <option value="All">All</option>
                  <option value="Cold">Cold</option>
                  <option value="Hot">Hot</option>
                </select>
              </div>

              {/* Buttons */}
              <div className="">
                {/* Close Button */}
                <button
                  type="button"
                  className="btn btn-secondary me-1"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>

                {/* Add Button */}
                <button type="submit" className="btn btn-success">
                  Add
                </button>

                {/* Success Message */}
                {successMessage}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
