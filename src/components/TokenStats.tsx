import { motion } from "framer-motion";
import { Token } from "@/lib/tokenizer";
import { Card, CardContent } from "@/components/ui/card";
import { Hash, Type, Layers, Zap } from "lucide-react";

interface TokenStatsProps {
  tokens: Token[];
  text: string;
  tokenizerVocabSize: number;
}

export const TokenStats = ({
  tokens,
  text,
  tokenizerVocabSize,
}: TokenStatsProps) => {
  const uniqueTokenIds = new Set(tokens.map(token => token.id));
  const compressionRatio = text.length > 0 ? tokens.length / text.length : 0;

  const stats = [
    {
      icon: Hash,
      label: "Total Tokens",
      value: tokens.length,
      color: "text-slate-600 dark:text-slate-300",
      bg: "bg-slate-100 dark:bg-slate-700/30",
    },
    {
      icon: Type,
      label: "Characters",
      value: text.length,
      color: "text-gray-600 dark:text-gray-300",
      bg: "bg-gray-100 dark:bg-gray-700/30",
    },
    {
      icon: Layers,
      label: "Unique Tokens",
      value: uniqueTokenIds.size,
      color: "text-zinc-600 dark:text-zinc-300",
      bg: "bg-zinc-100 dark:bg-zinc-700/30",
    },
    {
      icon: Zap,
      label: "Compression",
      value: `${(compressionRatio * 100).toFixed(1)}%`,
      color: "text-stone-600 dark:text-stone-300",
      bg: "bg-stone-100 dark:bg-stone-700/30",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
    >
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Card className="bg-card border-border/50 shadow-sm hover:shadow transition-all duration-200">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bg}`}>
                  <stat.icon
                    className={`h-3 w-3 sm:h-4 sm:w-4 ${stat.color}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground font-medium truncate">
                    {stat.label}
                  </p>
                  <p className="text-sm sm:text-base font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};
