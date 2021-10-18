import { FC } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Axios from "axios";

type Inputs = {
  meal_name: string;
  season: "All" | "Cold" | "Hot";
};

type Meal = {
  meal_name: string;
  last_serving: Date | null;
  season: "All" | "Cold" | "Hot";
};

const regex_for_meals = /^[\w /&'-]+/g;

const AddMealModal: FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const addMealToDatabase: SubmitHandler<Inputs> = ({ meal_name, season }) => {
    /* Add meal to the "meals" collection with a last_serving of null */

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
                  {...register("meal_name", {
                    required: true,
                    maxLength: 100,
                    minLength: 5,
                    pattern: regex_for_meals,
                  })}
                  className="form-control"
                />
                {errors.meal_name && (
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMealModal;
