import { useCallback, useEffect } from 'react';
import { Handle, Position, useNodeId } from 'reactflow';
import { useNodeStore } from '../store.js';

function CarNode() {
  const { nodes, addToFlow } = useNodeStore((state) => ({
    nodes: state.nodes,
    addToFlow: state.addToFlow,
  }));

  let options = {
    "Ford Focus": "FORDFOCUSELECTRIC2012",
    "Cheverolet Spark": "CHEVSPARK2016",
    "Nissan Leaf 24KWH": "NISSANLEAF24KWH2016",
    "Nissan Leaf 30KWH": "NISSANLEAF30KWH2016"
  };

  const id = useNodeId();

  useEffect(() => {
    // Set default value when component is mounted, if it doesn't already exist
    if (!nodes[id]) {
      const defaultValue = Object.values(options)[0]; // Assuming the first option is the default
      addToFlow(id, defaultValue);
    }
  }, [id, addToFlow, options, nodes]);

  const onChange = useCallback((evt) => {
    addToFlow(id, evt.target.value);
  }, [id, addToFlow]);

  return (
    <>
      <div>
        <label className="textbox">Select a car:</label>
        <select
          style={{ width: '120px' }}
          className="nodrag inputbox"
          id="vehicle"
          onChange={onChange}
        >
          {
            Object.entries(options).map(([userName, backendName]) => (
              <option key={backendName} value={backendName}>{userName}</option>
            ))
          }
        </select>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}

export default CarNode;
