import { memo } from "react";
import { motion } from "framer-motion";
import { Token } from "@/lib/tokenizer";
import { getTokenColor, getWhitespaceColor } from "@/lib/colorUtils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TokenChipProps {
  token: Token;
  index: number;
  showRawIds: boolean;
  showWhitespace: boolean;
}

export const TokenChip = memo(
  ({ token, index, showRawIds, showWhitespace }: TokenChipProps) => {
    const isWhitespace = token.text.match(/^\s+$/);
    const colors = isWhitespace
      ? getWhitespaceColor()
      : getTokenColor(token.id);

    const displayText =
      showWhitespace && isWhitespace
        ? token.text.replace(/ /g, "␣").replace(/\t/g, "→").replace(/\n/g, "↵")
        : token.text;

    const chipContent = showRawIds
      ? `${token.id}`
      : displayText;

    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.span
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.02,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              <span
                className="inline-flex items-center px-2 py-1 rounded-sm text-xs font-mono font-medium shadow-token transition-all duration-200 hover:scale-105 cursor-pointer select-none"
                style={{
                  backgroundColor: colors.background,
                  color: colors.text,
                  // borderColor: colors.text + "20",
                }}
              >
                {chipContent}
              </span>
            </motion.span>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className="font-mono text-xs max-w-xs z-[99999] !important bg-background"
            sideOffset={8}
            collisionPadding={20}
            // align="start"
          >
            <div className="space-y-2 px-0.5 py-1">
              <div className="font-semibold text-xs border-b border-border pb-1">
                Token Details
              </div>
              <div className="space-y-1">
                <div>
                  <strong>ID:</strong> {token.id}
                </div>
                <div>
                  <strong>Text:</strong>{" "}
                  <span className="px-1 py-0.5 bg-muted rounded text-xs">
                    "{token.text}"
                  </span>
                </div>
                <div>
                  <strong>Position:</strong> {token.start}–{token.end}
                </div>
                <div>
                  <strong>Length:</strong> {token.text.length} character
                  {token.text.length !== 1 ? "s" : ""}
                </div>
              </div>
              {/* {isWhitespace && (
                <div className="text-muted-foreground text-xs bg-muted/50 px-2 py-1 rounded">
                  💭 This is a whitespace token representing spaces, tabs, or
                  newlines
                </div>
              )}
              {!isWhitespace && (
                <div className="text-muted-foreground text-xs bg-muted/50 px-2 py-1 rounded">
                  This token represents "{token.text}" in the vocabulary
                </div>
              )} */}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }
);

TokenChip.displayName = "TokenChip";
