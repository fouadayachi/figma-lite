import { Button } from "@/components/ui/button";
import useStore from "@/store/useStore";
import { Edit3, Trash2, CopyPlus, MessageSquare, AlertCircle } from "lucide-react";
import { Handle, Position } from "reactflow";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const CustomNode = ({ id, data }) => {
  const { deleteNode, setSelectedNode, openSidebar, duplicateNode } = useStore();

  return (
    <div
      onClick={() => setSelectedNode(id)}
      className="relative group px-2 py-1 rounded-lg shadow border text-sm text-center transition cursor-pointer flex flex-col items-center justify-center gap-2"
      style={{
        backgroundColor: data.color || "#ffffff",
        border: `2px solid ${data.border || "#ddd"}`,
        maxWidth: 200,
        minWidth: 100,
        wordBreak: "break-word",
        borderRadius: data.borderRadius,
      }}
    >
      {/* Notes Popover Button (Top Right) */}
      {data.notes && (
        <Popover>
          <div className="absolute top-0 right-0.5 z-10">
            <PopoverTrigger asChild>
              <Button
                size="icon"
                className="p-0 w-4 h-4 rounded-full bg-transparent hover:bg-transparent flex items-center justify-center"
                style={{ color: data.fontColor }}
                title="Notes"
                onClick={(e) => e.stopPropagation()}
              >
                <AlertCircle size={8} />
              </Button>
            </PopoverTrigger>
          </div>
          <PopoverContent className="w-48 text-sm p-3 ml-10" side="center" align="end">
            <div className="text-xs font-semibold mb-2"> Notes</div>
            <p className="text-gray-600 whitespace-pre-wrap">{data.notes}</p>
          </PopoverContent>
        </Popover>
      )}

      {/* Conditionally render the icon */}
      {data.icon && (
        <img
          src={data.icon}
          alt="node icon"
          className="w-8 h-8 object-contain"
        />
      )}

      <p
        className="text-xs break-words whitespace-pre-wrap"
        style={{ color: data.fontColor, fontSize: data.fontSize }}
      >
        {data.label}
      </p>

      {/* Hover toolbar (small) */}
      <div className="absolute -top-[25px] left-1/2 -translate-x-1/2 hidden group-hover:flex gap-1 bg-white shadow rounded-sm px-0.5 py-0.5 text-xs">
        {/* Duplicate Button */}
        <Button
          size="icon"
          className="p-[1px] w-5 h-5 flex items-center justify-center cursor-pointer"
          variant="ghost"
          title="Duplicate"
          onClick={(e) => {
            e.stopPropagation();
            duplicateNode(id);
          }}
        >
          <CopyPlus size={10} />
        </Button>

        {/* Edit -> open sidebar */}
        <Button
          size="icon"
          className="p-[1px] w-5 h-5 flex items-center justify-center cursor-pointer"
          variant="ghost"
          title="Edit (open sidebar)"
          onClick={(e) => {
            e.stopPropagation();
            openSidebar(id);
          }}
        >
          <Edit3 size={10} />
        </Button>


        {/* Delete */}
        <Button
          size="icon"
          className="p-[1px] w-5 h-5 flex items-center justify-center text-red-600 cursor-pointer"
          variant="ghost"
          title="Delete"
          onClick={(e) => {
            e.stopPropagation();
            deleteNode(id);
          }}
        >
          <Trash2 size={10} />
        </Button>
      </div>

      {/* Handles */}
      <Handle type="target" id="t-top" position={Position.Top} className="!opacity-0 group-hover:!opacity-100 transition-opacity" style={{ top: -1 }} />
      <Handle type="target" id="t-left" position={Position.Left} className="!opacity-0 group-hover:!opacity-100 transition-opacity" style={{ left: -1 }} />
      <Handle type="source" id="s-right" position={Position.Right} className="!opacity-0 group-hover:!opacity-100 transition-opacity" style={{ right: -1 }} />
      <Handle type="source" id="s-bottom" position={Position.Bottom} className="!opacity-0 group-hover:!opacity-100 transition-opacity" style={{ bottom: -1 }} />
    </div>
  );
};

export default CustomNode;