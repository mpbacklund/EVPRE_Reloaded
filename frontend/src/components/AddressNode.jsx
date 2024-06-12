import React, { useEffect, useCallback } from 'react';
import { Handle, Position, useNodeId } from 'reactflow';
import { useNodeStore } from '../store';

function AddressNode() {
  const { nodes, addToFlow } = useNodeStore((state) => ({
    nodes: state.nodes,
    addToFlow: state.addToFlow,
  }));

  const id = useNodeId();

  useEffect(() => {
    // Set default value when component is mounted, if it doesn't already exist
    if (id && !nodes[id]) {
      addToFlow(id, ''); // Set a specific default value if needed
    }
  }, [id, nodes, addToFlow]);

  const onChange = useCallback((evt) => {
    addToFlow(id, evt.target.value);
  }, [id, addToFlow]);

  return (
    <div>
      <div>
      <label className="textbox">Address:</label>
        <input
          type="text"
          style={{ width: '120px' }}
          className="nodrag inputbox"
          onChange={onChange}
          placeholder="address"
          id="address"
        />
        <br />
        <div id="displayAddress"></div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

export default AddressNode;
