import React from 'react';
import styles from './App.module.scss';
import Axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production' ? 'SOME_URL' : 'http://localhost:5001/api';

Axios.defaults.baseURL = API_URL;

export const App = () => {
  const fetchData = async () => {
    const { data } = await Axios.get('/meals');

    console.log(data);
  };

  fetchData();

  return <div className={styles.app}></div>;
};
