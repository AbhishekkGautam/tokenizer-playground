import { useState } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Wand2 } from "lucide-react";
import { Token, tokenizer } from "@/lib/tokenizer";
import { useToast } from "@/hooks/use-toast";

interface TokenDecoderProps {
  tokens: Token[];
}

export const TokenDecoder = ({ tokens }: TokenDecoderProps) => {
  const [tokenIds, setTokenIds] = useState("");
  const [decodedText, setDecodedText] = useState("");
  const { toast } = useToast();

  const handleDecode = () => {
    try {
      const ids = tokenIds
        .split(/[,\s]+/)
        .filter(id => id.trim())
        .map(id => parseInt(id.trim()));

      const mockTokens = ids.map(id => {
        const tokenText = tokenizer.getTokenText(id);
        return {
          id,
          text: tokenText === "<|space|>" ? " " : tokenText,
          start: 0,
          end: 0,
        };
      });

      const decoded = tokenizer.decode(mockTokens);
      setDecodedText(decoded);
    } catch (error) {
      toast({
        title: "Decode Error",
        description:
          "Please enter valid token IDs (numbers separated by commas or spaces)",
        variant: "destructive",
      });
    }
  };

  const handleCopyDecoded = async () => {
    try {
      await navigator.clipboard.writeText(decodedText);
      toast({
        title: "Copied!",
        description: "Decoded text copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const handleUseCurrentTokens = () => {
    const ids = tokens.map(token => token.id).join(", ");
    setTokenIds(ids);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="h-full"
    >
      <Card className="h-full bg-card border-border/50 shadow-sm">
        <CardHeader className="pb-1 sm:pb-2 p-4 lg:p-6">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <Wand2 className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
            Token Decoder
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 sm:space-y-3 h-full flex flex-col p-4 lg:p-6 !pt-0">
          <div className="space-y-1.5">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
              <label className="text-xs font-medium text-foreground/80">
                Enter Token IDs (comma or space separated)
              </label>
              {tokens.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUseCurrentTokens}
                  className="h-6 px-2 text-xs self-start sm:self-auto border-border/50 bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground"
                >
                  Use Current Tokens
                </Button>
              )}
            </div>
            <Textarea
              value={tokenIds}
              onChange={e => setTokenIds(e.target.value)}
              placeholder="e.g., 1, 5, 10, 23"
              className="h-[120px] lg:h-[80px] bg-card/50 border-border/50 font-mono text-xs resize-none focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400/50 transition-all duration-200"
              rows={2}
            />
          </div>

          <Button
            onClick={handleDecode}
            size="sm"
            className="w-full h-7 sm:h-8 text-xs border-border/50 bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground"
            variant="outline"
          >
            Decode Tokens
          </Button>

          {decodedText && (
            <div className="space-y-1.5 flex-1 min-h-0">
              <div className="flex items-center justify-between gap-1 mt-1 lg:mt-0">
                <label className="text-xs font-medium text-foreground/80">
                  Decoded Text Result
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyDecoded}
                  className="h-6 px-2 text-xs self-start sm:self-auto border-border/50 bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground"
                >
                  <Copy className="!w-3.5 !h-3.5" />
                  Copy
                </Button>
              </div>
              <div className="p-2 bg-card/50 border border-border/50 rounded-md flex-1 overflow-y-auto min-h-0 max-h-[120px] lg:max-h-[90px]">
                <p className="text-xs font-mono text-foreground whitespace-pre-wrap">
                  {decodedText}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};
