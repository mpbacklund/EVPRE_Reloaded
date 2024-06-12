import React from 'react';
import { Handle, Position } from 'reactflow';
import { useNodeStore } from '../store';

function RouteNode() {
  const imageURL = useNodeStore((state) => state.imageURL);

  return (
    <div>
      <Handle
        type="target"
        position={Position.Top}
      />
      <div>
        <p className='upper_textbox'>Route</p>
        {imageURL ? (
          <img src={imageURL} alt="Map" />
        ) : (
          <div>
            <label className='small_text'>Map will appear here</label>
          </div>
        )}
      </div>
    </div>
  );
}

export default RouteNode;
