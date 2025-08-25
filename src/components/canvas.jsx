import useStore from "@/store/useStore";
import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import CustomNode from "./nodes/CustomNode";
import Sidebar from "./Sidebar";

const nodeTypes = { custom: CustomNode };

const Canvas = () => {
  const { backgroundColor, nodes, onNodesChange, edges, onEdgesChange, onConnect } = useStore();

  return (
    <div className="w-full h-full relative">
      <ReactFlow
        nodes={nodes}
        onNodesChange={onNodesChange}
        edges={edges}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        style={{ backgroundColor: backgroundColor }}
      >
        <Controls />
      </ReactFlow>

      {/* Slide-in Sidebar (overlay) */}
      <Sidebar />
    </div>
  );
};

export default Canvas;
