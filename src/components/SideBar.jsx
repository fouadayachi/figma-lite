import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { HexColorPicker } from "react-colorful";
import useStore from "@/store/useStore";
import { Textarea } from "@/components/ui/textarea";

export default function Sidebar() {
  const { nodes, selectedNodeId, updateNode, isSidebarOpen, closeSidebar } = useStore();
  const selectedNode = nodes.find((n) => n.id === selectedNodeId);

  if (!isSidebarOpen || !selectedNode) return null;

  const handleIconUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateNode(selectedNode.id, { icon: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="w-80 p-6 bg-white shadow-lg fixed top-0 right-0 h-full flex flex-col z-50 transition-all duration-300 transform translate-x-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Properties</h2>
        <button
          onClick={closeSidebar}
          className="text-gray-500 hover:text-gray-800 transition-colors"
          aria-label="Close sidebar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto">
        {/* Node Label Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Label</h3>
          <Textarea
            id="node-label"
            value={selectedNode.data.label || ""}
            onChange={(e) => updateNode(selectedNode.id, { label: e.target.value })}
            className="w-full text-sm min-h-[80px]"
          />
        </div>

        <Separator />

        {/* Notes Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Notes</h3>
          <Textarea
            id="node-notes"
            placeholder="Add notes for this node..."
            value={selectedNode.data.notes || ""}
            onChange={(e) => updateNode(selectedNode.id, { notes: e.target.value })}
            className="w-full text-sm min-h-[80px]"
          />
        </div>

        <Separator />

        {/* Icon Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Icon</h3>
          {selectedNode.data.icon && (
            <div className="flex flex-col items-center gap-2 mb-4">
              <img src={selectedNode.data.icon} alt="node icon" className="w-12 h-12 object-contain" />
              <button
                onClick={() => updateNode(selectedNode.id, { icon: null })}
                className="text-red-500 text-xs hover:underline"
              >
                Remove Icon
              </button>
            </div>
          )}
          <Label htmlFor="icon-upload" className="text-sm font-medium block">Upload PNG Icon</Label>
          <Input
            id="icon-upload"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleIconUpload}
            className="mt-1"
          />
        </div>

        <Separator />

        {/* Text Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Text</h3>
          <div className="space-y-4">
            {/* Font Color */}
            <div>
              <Label className="text-sm font-medium">Font Color</Label>
              <div className="flex flex-col items-start gap-3 mt-2">
                <HexColorPicker
                  color={selectedNode.data.fontColor || "#000000"}
                  onChange={(color) => updateNode(selectedNode.id, { fontColor: color })}
                  className="w-full"
                />
                <div className="w-full relative">
                  <Input
                    type="text"
                    value={selectedNode.data.fontColor || "#000000"}
                    onChange={(e) => updateNode(selectedNode.id, { fontColor: e.target.value })}
                    className="w-full text-xs pl-8"
                  />
                  <span
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border"
                    style={{ backgroundColor: selectedNode.data.fontColor }}
                  />
                </div>
              </div>
            </div>

            {/* Font Size */}
            <div>
              <Label htmlFor="font-size" className="text-sm font-medium">Font Size (px)</Label>
              <Input
                id="font-size"
                type="number"
                value={selectedNode.data.fontSize || 14}
                onChange={(e) => updateNode(selectedNode.id, { fontSize: parseInt(e.target.value) })}
                className="mt-1"
                min="8"
              />
            </div>
          </div>
        </div>

        <Separator />

        {/* Appearance Section */}
        <div className="p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">Appearance</h3>
          <div className="space-y-4">
            {/* Background Color */}
            <div>
              <Label className="text-sm font-medium">Background</Label>
              <div className="flex flex-col items-start gap-3 mt-2">
                <HexColorPicker
                  color={selectedNode.data.color || "#ffffff"}
                  onChange={(color) => updateNode(selectedNode.id, { color })}
                  className="w-full"
                />
                <div className="w-full relative">
                  <Input
                    type="text"
                    value={selectedNode.data.color || "#ffffff"}
                    onChange={(e) => updateNode(selectedNode.id, { color: e.target.value })}
                    className="w-full text-xs pl-8"
                  />
                  <span
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border"
                    style={{ backgroundColor: selectedNode.data.color }}
                  />
                </div>
              </div>
            </div>

            {/* Border Color */}
            <div>
              <Label className="text-sm font-medium">Border</Label>
              <div className="flex flex-col items-start gap-3 mt-2">
                <HexColorPicker
                  color={selectedNode.data.border || "#000000"}
                  onChange={(color) => updateNode(selectedNode.id, { border: color })}
                  className="w-full"
                />
                <div className="w-full relative">
                  <Input
                    type="text"
                    value={selectedNode.data.border || "#000000"}
                    onChange={(e) => updateNode(selectedNode.id, { border: e.target.value })}
                    className="w-full text-xs pl-8"
                  />
                  <span
                    className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border"
                    style={{ backgroundColor: selectedNode.data.border }}
                  />
                </div>
              </div>
            </div>

            {/* Border Radius */}
            <div>
              <Label htmlFor="border-radius" className="text-sm font-medium">Border Radius (px)</Label>
              <Input
                id="border-radius"
                type="number"
                value={selectedNode.data.borderRadius || 8}
                onChange={(e) => updateNode(selectedNode.id, { borderRadius: parseInt(e.target.value) })}
                className="mt-1"
                min="0"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}