import React from 'react';
import ReactDOM from 'react-dom';
import TaskMain from '../../components/tasks/TaskMain';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root');
  ReactDOM.render(<TaskMain />, rootEl);
});
