import React, { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Palette, RefreshCw, Save, FileUp } from "lucide-react";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { HexColorPicker } from "react-colorful";
import useStore from "@/store/useStore";

const Toolbar = () => {
  const { backgroundColor, setBackgroundColor, addNode, reset, nodes, edges, setNodes, setEdges } = useStore();
  const fileInputRef = useRef(null);

  const handleSave = () => {
    const flowData = {
      nodes,
      edges,
      backgroundColor,
    };
    const json = JSON.stringify(flowData);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flow-chart-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const loadedData = JSON.parse(e.target.result);
          if (loadedData.nodes && loadedData.edges) {
            setNodes(loadedData.nodes);
            setEdges(loadedData.edges);
            if (loadedData.backgroundColor) {
              setBackgroundColor(loadedData.backgroundColor);
            }
          } else {
            alert("Invalid file format. Please select a valid flow chart JSON file.");
          }
        } catch  {
          alert("Error parsing file. Please select a valid JSON file.");
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex gap-3 p-2 bg-white shadow-md rounded-2xl border border-gray-200 mx-4 mt-3">
      {/* Add Node */}
      <Button
        variant="default"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
        onClick={addNode}
      >
        <Plus size={18} />
        Add Node
      </Button>

      {/* Background Color Picker */}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2 border-gray-300 hover:bg-gray-100"
          >
            <Palette size={18} />
            Background Color
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-2">
          <HexColorPicker color={backgroundColor} onChange={setBackgroundColor} />
        </PopoverContent>
      </Popover>

      {/* Save Button */}
      <Button variant="outline" className="flex items-center gap-2 border-gray-300 hover:bg-gray-100" onClick={handleSave}>
        <Save size={18} />
        Save
      </Button>

      {/* Upload Button */}
      <Button variant="outline" className="flex items-center gap-2 border-gray-300 hover:bg-gray-100" onClick={() => fileInputRef.current.click()}>
        <FileUp size={18} />
        Upload
      </Button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: 'none' }}
        accept=".json"
      />

      {/* Reset Canvas */}
      <Button variant="destructive" className="flex items-center gap-2" onClick={reset}>
        <RefreshCw size={18} />
        Reset
      </Button>
    </div>
  );
};

export default Toolbar;