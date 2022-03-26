import React from 'react';
import ReactDOM from 'react-dom';
import ProileMain from '../../components/users/ProfileMain';

const main = () => {
  const rootEl = document.getElementById('root');
  ReactDOM.render(<ProileMain />, rootEl);
};

if (document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main, false);
}