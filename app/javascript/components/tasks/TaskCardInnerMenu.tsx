import React from 'react';

type Props = {
  onDelete: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};
const TaskCardInnerMenu: React.FC<Props> = ({ onDelete }) => {
  return (
    <div className="absolute -bottom-8 -right-8 rounded-md shadow bg-white">
      <ul>
        <li className="p-2 border-b">
          <a onClick={onDelete}>delete</a>
        </li>
      </ul>
    </div>
  );
};
export default TaskCardInnerMenu;
