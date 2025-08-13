import { Textarea } from "@/components/ui/textarea";

interface TokenizerInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TokenizerInput = ({
  value,
  onChange,
  placeholder,
}: TokenizerInputProps) => {
  return (
    <Textarea
      id="tokenizer-input"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={
        placeholder || "Type or paste your text here to see it tokenized..."
      }
      className="min-h-[100px] sm:min-h-[120px] max-h-[120px] sm:max-h-[140px] resize-none bg-background/50 border-border/50 font-mono text-xs sm:text-xs focus:ring-2 !focus:ring-gray-400/50 !focus:border-gray-400/50 transition-all duration-200 backdrop-blur-sm"
      rows={3}
    />
  );
};
