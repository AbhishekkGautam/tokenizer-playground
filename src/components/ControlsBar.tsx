import { motion } from "framer-motion";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Hash, Type, Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ControlsBarProps {
  showRawIds: boolean;
  onShowRawIdsChange: (show: boolean) => void;
  showWhitespace: boolean;
  onShowWhitespaceChange: (show: boolean) => void;
  onClearText: () => void;
  tokenizedText: string;
}

export const ControlsBar = ({
  showRawIds,
  onShowRawIdsChange,
  showWhitespace,
  onShowWhitespaceChange,
  onClearText,
  tokenizedText,
}: ControlsBarProps) => {
  const { toast } = useToast();

  const handleCopyTokens = async () => {
    try {
      await navigator.clipboard.writeText(tokenizedText);
      toast({
        title: "Copied!",
        description: "Tokenized text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-token-border p-4"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center space-x-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <Switch
              id="show-raw-ids"
              checked={showRawIds}
              onCheckedChange={onShowRawIdsChange}
            />
            <label htmlFor="show-raw-ids" className="text-sm font-medium cursor-pointer">
              Show Token IDs
            </label>
          </div>

          <div className="flex items-center space-x-2">
            {showWhitespace ? (
              <Eye className="h-4 w-4 text-muted-foreground" />
            ) : (
              <EyeOff className="h-4 w-4 text-muted-foreground" />
            )}
            <Switch
              id="show-whitespace"
              checked={showWhitespace}
              onCheckedChange={onShowWhitespaceChange}
            />
            <label htmlFor="show-whitespace" className="text-sm font-medium cursor-pointer">
              Show Whitespace
            </label>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyTokens}
            disabled={!tokenizedText}
            className="h-8"
          >
            <Copy className="h-3 w-3 mr-1" />
            Copy
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={onClearText}
            className="h-8"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Clear
          </Button>
        </div>
      </div>
    </motion.div>
  );
};