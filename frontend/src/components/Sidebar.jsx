import React from 'react';

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode group" onDragStart={(event) => onDragStart(event, 'carNode')} draggable>
        Vehicle
      </div>
      <div className="dndnode group" onDragStart={(event) => onDragStart(event, 'addressNode')} draggable>
        Address
      </div>
      <div className="dndnode group" onDragStart={(event) => onDragStart(event, 'routeNode')} draggable>
        Get Best Route
      </div>
    </aside>
  );
};
