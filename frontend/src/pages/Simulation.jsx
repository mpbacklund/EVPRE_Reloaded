import React, { useState, useRef, useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  getIncomers,
  getOutgoers,
  getConnectedEdges,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Button } from 'react-bootstrap'
import useFetch from '../useFetch';
import { useNodeStore } from '../store';
import axios from 'axios'

import Sidebar from '../components/Sidebar';
import NavBar from '../components/NavBar';
import RightSideBar from '../components/rightSidebar';

import CarNode from '../components/CarNode'
import AddressNode from '../components/AddressNode';
import RouteNode from '../components/RouteNode';

const initialNodes = [
  {
    id: '1',
    type: 'carNode',
    data: {value: 123},
    position: { x: 0, y: 0 },
  },
  {
    id: '2',
    type: 'routeNode',
    data: {value: 123},
    position: { x: 38, y: 200 },
  },
  {
    id: '3',
    type: 'addressNode',
    data: {value: 123},
    position: { x: -250, y: 0 },
  },
  {
    id: '4',
    type: 'addressNode',
    data: {value: 123},
    position: { x: 250, y: 0 },
  },
];

const initialEdges = [
  {
    id: '1-2',
    source: '1',
    target: '2',
  },
  {
    id: '3-2',
    source: '3',
    target: '2',
  },
  {
    id: '4-2',
    source: '4',
    target: '2',
  },
]

let id = 0;
const getId = () => `dndnode_${id++}`;

const nodeTypes = {carNode: CarNode, addressNode: AddressNode, routeNode: RouteNode}

const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [fetchingRoute, setFetchingRoute] = useState(false);

  const { nodeValues, setImageURL } = useNodeStore((state) => ({
    nodeValues: state.nodes,
    setImageURL: state.setImageURL,
  }));

  const { data, loading, error, refetch} = useFetch();

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance],
  );

  const onNodesDelete = useCallback(
    (deleted) => {
      setEdges(
        deleted.reduce((acc, node) => {
          const incomers = getIncomers(node, nodes, edges);
          const outgoers = getOutgoers(node, nodes, edges);
          const connectedEdges = getConnectedEdges([node], edges);

          const remainingEdges = acc.filter((edge) => !connectedEdges.includes(edge));

          const createdEdges = incomers.flatMap(({ id: source }) =>
            outgoers.map(({ id: target }) => ({ id: `${source}->${target}`, source, target }))
          );

          return [...remainingEdges, ...createdEdges];
        }, edges)
      );
    },
    [nodes, edges]
  );

  const handleKeyDown = useCallback(
    (event) => {
      const activeElementTag = document.activeElement.tagName;
  
      // Check if the active element is an input, textarea or contenteditable element
      if (activeElementTag === 'INPUT' || activeElementTag === 'TEXTAREA' || document.activeElement.isContentEditable) {
        return;
      }
  
      if (event.key === 'Delete' || event.key === 'Backspace') {
        const selectedNodes = reactFlowInstance.getNodes().filter(node => node.selected);
        if (selectedNodes.length > 0) {
          onNodesDelete(selectedNodes);
          setNodes((nds) => nds.filter((node) => !node.selected));
        }
      }
    },
    [reactFlowInstance, onNodesDelete, setNodes]
  );
  

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const proOptions = { hideAttribution: true };
  
  const submit = async () => {
    setFetchingRoute(true);
    const routeNodes = nodes.filter(node => node.type === 'routeNode');
    if (routeNodes.length !== 1) {
      return false;
    }

    const routeNode = routeNodes[0]
    let connectedAddressNodes = [];
    let connectedCarNodes = [];
    for (let edge of edges) {
      if (edge.target === routeNode.id) {
        const source = nodes.find(node => node.id === edge.source)
        if (source.type === 'addressNode') {
          connectedAddressNodes.push(source);
        }
        else if (source.type === 'carNode') {
          connectedCarNodes.push(source);
        }
      }
    }

    if (connectedAddressNodes.length === 2 && connectedCarNodes.length == 1) {
      try {
        const startLocation = await getLatLon(nodeValues[connectedAddressNodes[0].id])
        const endLocation = await getLatLon(nodeValues[connectedAddressNodes[1].id])
        console.log(startLocation);
        console.log(endLocation);

        const params = {
          'startLat': startLocation[0].lat,
          'startLon': startLocation[0].lon,
          'endLat': endLocation[0].lat,
          'endLon': endLocation[0].lon,
          'vehicle': nodeValues[connectedCarNodes[0].id]
        }
        console.log(params)

        const route = await axios.get('http://localhost:8000/getRoute', {params: params});
        console.log(route.data)
        setImageURL(route.data)
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    }
    else {
      console.log("failed")
    }
    setFetchingRoute(false);
  }

  const getLatLon = async (address) => {
    let url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + address;
    try {
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('error fetching lat lon:', error);
      throw error;
    }
  }
  

  return (
    <div className="dndflow">

      <ReactFlowProvider>
        <NavBar />
        <Sidebar />
        <div className="reactflow-wrapper" style={{background: "#fff"}} ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodesDelete={onNodesDelete}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            proOptions={proOptions}
          >
            <Controls />
            <Background variant="dots" gap={10} size={1}/>
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <Button className="submit-button" disabled={fetchingRoute} onClick={submit}> { fetchingRoute ? <div className='spinner'></div> : 'Run' } </Button>
    </div>
  );
};

export default DnDFlow;
