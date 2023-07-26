import React from 'react';
import styles from './App.module.scss';
import Axios from 'axios';
import { WinPop } from './modules/WinPop/WinPop';

const API_URL = process.env.NODE_ENV === 'production' ? 'SOME_URL' : 'http://localhost:5001/api';

Axios.defaults.baseURL = API_URL;

export const App = () => {
  const [open, setOpen] = React.useState(false);

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    const { data } = await Axios.get('/meals');

    // console.log(data);
  };

  fetchData();

  return (
    <div className={styles.app}>
      <button onClick={openDialog}>Sup</button>

      <WinPop
        open={open}
        onClose={closeDialog}
        startingSize={{
          height: '500px',
          width: '500px',
        }}
      />
    </div>
  );
};
