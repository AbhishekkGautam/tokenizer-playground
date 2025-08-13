import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Github, Zap, PenTool, Blocks } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { TokenStats } from "@/components/TokenStats";
import { TokenizerInput } from "@/components/TokenizerInput";
import { TokenDecoder } from "@/components/TokenDecoder";
import { TokenChip } from "@/components/TokenChip";
import { ThemeToggle } from "@/components/ThemeToggle";
import { tokenizer } from "@/lib/tokenizer";
import { useDebounce } from "@/hooks/useDebounce";

const Home = () => {
  const [text, setText] = useState("");
  const [showRawIds, setShowRawIds] = useState(false);
  const [showWhitespace, setShowWhitespace] = useState(false);

  const debouncedText = useDebounce(text, 150);

  const tokens = useMemo(() => {
    return tokenizer.tokenize(debouncedText);
  }, [debouncedText]);

  const handleClearText = () => {
    setText("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex-shrink-0 border-b border-token-border/50 bg-background backdrop-blur-sm"
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div>
                <h1 className="text-base sm:text-lg lg:text-xl font-bold text-foreground">
                  Tokenizer Playground
                </h1>
                <p className="text-[10px] sm:text-xs text-muted-foreground sm:block">
                  Real-time BPE tokenization
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="flex h-7 sm:h-8 px-2 sm:px-3 text-xs"
              >
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-0.5"
                >
                  <Github className="h-3 w-3" />
                  <span className="hidden lg:inline">GitHub</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="h-full w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-4">
          <div className="h-full flex flex-col space-y-3 sm:space-y-4">
            {/* Compact Stats */}
            <div className="flex-shrink-0">
              <TokenStats
                tokens={tokens}
                text={debouncedText}
                tokenizerVocabSize={tokenizer.getVocabSize()}
              />
            </div>

            {/* Main Grid */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 min-h-0">
              <div className="xl:col-span-2 flex flex-col space-y-3 min-h-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="min-h-0 flex-shrink-0"
                >
                  <Card className="h-full bg-card border-border/50 shadow-sm">
                    <CardHeader className="pb-1 sm:pb-2 p-4 lg:p-6">
                      <CardTitle className="text-sm font-semibold flex items-center gap-2">
                        <PenTool className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                        Text Encoder
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 sm:space-y-3 p-4 lg:p-6 !pt-0">
                      <div className="space-y-1.5">
                        <label className="text-xs font-medium text-foreground/80">
                          Enter text to analyze and tokenize
                        </label>
                        <TokenizerInput
                          value={text}
                          onChange={setText}
                          placeholder="Type or paste your text here to see it tokenized..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Token Visualization Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="h-[280px] sm:h-[320px] flex-shrink-0"
                >
                  <Card className="h-full bg-card border-border/50 shadow-sm flex flex-col">
                    <CardHeader className="pb-1 sm:pb-2 flex-shrink-0 p-4 lg:p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-0">
                        <CardTitle className="text-sm font-semibold flex items-center gap-2">
                          <Blocks className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                          Token Visualization
                        </CardTitle>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                          <div className="flex items-center space-x-1">
                            <label
                              htmlFor="show-token-ids"
                              className="text-xs text-muted-foreground whitespace-nowrap"
                            >
                              Token IDs
                            </label>
                            <Switch
                              id="show-token-ids"
                              checked={showRawIds}
                              onCheckedChange={setShowRawIds}
                              className="scale-75"
                            />
                          </div>
                          <div className="flex items-center space-x-1">
                            <label
                              htmlFor="show-whitespace"
                              className="text-xs text-muted-foreground whitespace-nowrap"
                            >
                              Spaces
                            </label>
                            <Switch
                              id="show-whitespace"
                              checked={showWhitespace}
                              onCheckedChange={setShowWhitespace}
                              className="scale-75"
                            />
                          </div>
                          {text && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={handleClearText}
                              className="h-7 px-2 text-xs border-border/50 bg-background/50 hover:bg-background/80 text-muted-foreground hover:text-foreground"
                            >
                              Clear
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 min-h-0 p-3 sm:p-4 !pt-0">
                      <div className="h-full overflow-y-auto border border-dashed border-border/30 rounded-lg bg-card/20 p-2 sm:p-3">
                        {tokens.length === 0 ? (
                          <div className="h-full flex items-center justify-center opacity-60 text-muted-foreground text-xs sm:text-sm">
                            Enter text above to see tokens appear here
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1">
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
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>

              {/* Right Sidebar */}
              <div className="xl:col-span-2 flex flex-col space-y-3 min-h-0">
                {/* Token Decoder */}
                <div className="min-h-0 flex-shrink-0">
                  <TokenDecoder tokens={tokens} />
                </div>

                {/* How it works */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="flex-1 min-h-0"
                >
                  <Card className="h-fit bg-card border-border/50 shadow-sm">
                    <CardContent className="p-3 sm:p-4 h-full flex flex-col">
                      <h3 className="text-sm font-semibold mb-2 text-foreground flex items-center gap-2">
                        <Zap className="h-4 w-4 text-zinc-600 dark:text-zinc-300" />
                        How It Works
                      </h3>
                      <div className="space-y-1.5 text-xs text-muted-foreground flex-1 overflow-auto">
                        <p>
                          This tokenizer uses a{" "}
                          <strong>BPE-like algorithm</strong> combining subword
                          and character-level tokenization:
                        </p>
                        <ul className="list-disc list-inside space-y-0.5 ml-2 text-xs">
                          <li>
                            Identifies common English subwords and patterns
                          </li>
                          <li>Falls back to character-level when needed</li>
                          <li>Preserves whitespace as special tokens</li>
                          <li>Assigns consistent colors to tokens</li>
                        </ul>
                        <p className="pt-1 text-xs">
                          <strong>Compression ratio</strong> shows tokenization
                          efficiency - lower percentages indicate better
                          compression.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex-shrink-0 border-t border-border/30 bg-background backdrop-blur-sm"
      >
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-4 text-center">
          <p className="text-xs text-muted-foreground/70">
            Built with React - TypeScript - Shadcn UI - Framer Motion
          </p>
          <p className="text-xs text-muted-foreground/60 mt-1">
            Created by{" "}
            <a
              href="https://x.com/helloAbhishekk"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors duration-200"
            >
              @helloAbhishekk
            </a>
          </p>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
