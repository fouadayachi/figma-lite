/* eslint-disable no-unused-vars */
import { create } from "zustand";
import { applyNodeChanges, applyEdgeChanges, addEdge } from "reactflow";
import { nanoid } from 'nanoid';

const useStore = create((set, get) => ({
  backgroundColor: "#ffffff",
  nodes: [],
  edges: [],
  selectedNodeId: null,
  isSidebarOpen: false,

  setBackgroundColor: (color) => set({ backgroundColor: color }),
  setNodes: (nodes) => set({ nodes }),
  setEdges: (edges) => set({ edges }),
  setSelectedNode: (id) => set({ selectedNodeId: id }),

  openSidebar: (id) =>
    set({
      selectedNodeId: id ?? get().selectedNodeId,
      isSidebarOpen: true,
    }),
  closeSidebar: () => set({ isSidebarOpen: false }),

  onNodesChange: (changes) =>
    set((state) => ({
      nodes: applyNodeChanges(changes, state.nodes),
    })),

  onEdgesChange: (changes) =>
    set((state) => ({
      edges: applyEdgeChanges(changes, state.edges),
    })),

  onConnect: (connection) =>
    set((state) => ({
      edges: addEdge({ ...connection }, state.edges),
    })),

  addNode: () =>
    set((state) => {
      const newNode = {
        id: nanoid(),
        type: "custom",
        position: {
          x: window.innerWidth / 2 - 75,
          y: window.innerHeight / 2 - 25,
        },
        data: {
          label: `Node ${state.nodes.length + 1}`,
          color: "#ffffff",
          border: "#000000",
          fontColor: "#000000",
          fontSize: 14,
          borderRadius: 8,
          icon: null,
          notes: "", // New property for notes
        },
      };
      return { nodes: [...state.nodes, newNode] };
    }),

  updateNode: (id, updates) =>
    set((state) => ({
      nodes: state.nodes.map((n) =>
        n.id === id ? { ...n, data: { ...n.data, ...updates } } : n
      ),
    })),

  deleteNode: (nodeId) =>
    set((state) => {
      const filteredNodes = state.nodes.filter((n) => n.id !== nodeId);
      const filteredEdges = state.edges.filter(
        (e) => e.source !== nodeId && e.target !== nodeId
      );
      const isDeletingSelected = state.selectedNodeId === nodeId;
      return {
        nodes: filteredNodes,
        edges: filteredEdges,
        selectedNodeId: isDeletingSelected ? null : state.selectedNodeId,
        isSidebarOpen: isDeletingSelected ? false : state.isSidebarOpen,
      };
    }),

  duplicateNode: (nodeId) =>
    set((state) => {
      const nodeToDuplicate = state.nodes.find((n) => n.id === nodeId);
      if (!nodeToDuplicate) return state;

      const duplicatedNode = JSON.parse(JSON.stringify(nodeToDuplicate));
      const newId = nanoid();
      const newPosition = {
        x: duplicatedNode.position.x + 50,
        y: duplicatedNode.position.y + 50,
      };

      const newNodes = state.nodes.map((n) => ({
        ...n,
        selected: false,
      }));

      newNodes.push({
        ...duplicatedNode,
        id: newId,
        position: newPosition,
        selected: true,
      });

      return {
        nodes: newNodes,
        selectedNodeId: newId,
        isSidebarOpen: true,
      };
    }),

  reset: () =>
    set({
      nodes: [],
      edges: [],
      backgroundColor: "#ffffff",
      selectedNodeId: null,
      isSidebarOpen: false,
    }),
}));

export default useStore;