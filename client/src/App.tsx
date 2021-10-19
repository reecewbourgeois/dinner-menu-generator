import { FC } from "react";

import "./App.css";
import { MenuList } from "./components/menu-list/menu-list.component";

export const App: FC = () => {
  return (
    <div className="App">
      <MenuList />
    </div>
  );
};
