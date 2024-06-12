import { create } from 'zustand';

export const useNodeStore = create((set) => ({
  nodes: {},
  imageURL: "",
  setImageURL: (url) => set(() => ({ imageURL: url })),
  addToFlow: (nodeID, nodeValue) => set((state) => {
    // Only update if the value has actually changed
    if (state.nodes[nodeID] !== nodeValue) {
      return {
        nodes: {
          ...state.nodes,
          [nodeID]: nodeValue,
        },
      };
    }
    return state;
  }),
}));

// stores global variables like node values to be used by the simulation since they are pretty much impossible to access otherwise