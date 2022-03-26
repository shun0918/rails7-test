import React from 'react';
import ReactDOM from 'react-dom';
import TaskMain from '../../components/tasks/TaskMain';

const main = () => {
  const rootEl = document.getElementById('root');
  ReactDOM.render(<TaskMain />, rootEl);
};

if (document.readyState !== 'loading') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main, false);
}