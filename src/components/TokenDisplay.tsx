import { motion } from "framer-motion";
import { Token } from "@/lib/tokenizer";
import { TokenChip } from "./TokenChip";

interface TokenDisplayProps {
  tokens: Token[];
  showRawIds: boolean;
  showWhitespace: boolean;
}

export const TokenDisplay = ({
  tokens,
  showRawIds,
  showWhitespace,
}: TokenDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="h-full flex flex-col"
    >
      <div
        className="flex-1 p-2 sm:p-3 bg-card/30 border border-border/50 rounded-lg backdrop-blur-sm"
        style={{ overflow: "visible" }}
      >
        <div
          className="h-full overflow-y-auto"
          style={{ overflow: "visible auto" }}
        >
          <div
            className="flex flex-wrap gap-1 relative"
            style={{ overflow: "visible" }}
          >
            {tokens.map((token, index) => (
              <TokenChip
                key={`${token.id}-${index}-${token.start}`}
                token={token}
                index={index}
                showRawIds={showRawIds}
                showWhitespace={showWhitespace}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
