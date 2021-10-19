import { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./menu-list.css";
import { AddMealModal } from "./add-meal-modal/add-meal-modal.component";

const button_text = " Add Meal";

export const MenuList: FC = () => {
  return (
    <div className="side-menu">
      <button
        className="btn btn-success add-button"
        data-bs-toggle="modal"
        data-bs-target="#addMealModal"
      >
        <FontAwesomeIcon icon={faPlus} />
        {button_text}
      </button>

      <AddMealModal />
    </div>
  );
};
