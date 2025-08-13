
export interface Token {
  id: number;
  text: string;
  start: number;
  end: number;
}

const COMMON_SUBWORDS = [
  // Prefixes
  "un",
  "re",
  "pre",
  "dis",
  "in",
  "im",
  "ex",
  "de",
  "sub",
  "over",
  "under",
  "out",
  // Suffixes
  "ing",
  "ed",
  "er",
  "est",
  "ly",
  "tion",
  "sion",
  "ness",
  "ment",
  "able",
  "ible",
  // Common words
  "the",
  "and",
  "that",
  "have",
  "for",
  "not",
  "with",
  "you",
  "this",
  "but",
  "his",
  "from",
  "they",
  "she",
  "her",
  "been",
  "than",
  "its",
  "who",
  "did",
  "get",
  "may",
  // Common patterns
  "th",
  "he",
  "in",
  "er",
  "an",
  "re",
  "nd",
  "on",
  "en",
  "at",
  "ou",
  "ed",
  "ha",
];

// Sort by length (descending) for greedy matching
const SORTED_SUBWORDS = COMMON_SUBWORDS.sort((a, b) => b.length - a.length);

const createVocab = () => {
  const vocab = new Map<string, number>();
  const reverseVocab = new Map<number, string>();
  let nextId = 0;

  const addToVocab = (token: string): number => {
    if (!vocab.has(token)) {
      const id = nextId++;
      vocab.set(token, id);
      reverseVocab.set(id, token);
      return id;
    }
    return vocab.get(token)!;
  };

  // Add special tokens
  addToVocab("<|pad|>");
  addToVocab("<|unk|>");
  addToVocab("<|space|>");

  // Add common subwords
  SORTED_SUBWORDS.forEach(subword => {
    addToVocab(subword);
  });

  // Add common punctuation and symbols
  const punctuation = [
    ".",
    ",",
    "!",
    "?",
    ";",
    ":",
    "'",
    '"',
    "(",
    ")",
    "[",
    "]",
    "{",
    "}",
    "-",
    "_",
    "@",
    "#",
    "$",
    "%",
    "&",
    "*",
    "+",
    "=",
    "/",
    "\\",
    "|",
    "~",
    "`",
  ];
  punctuation.forEach(char => {
    addToVocab(char);
  });

  // Add digits
  for (let i = 0; i <= 9; i++) {
    addToVocab(i.toString());
  }

  // Add common single characters
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  for (const char of chars) {
    addToVocab(char);
  }

  return { vocab, reverseVocab, addToVocab };
};

const { vocab, reverseVocab, addToVocab } = createVocab();

const tokenizeWord = (word: string): Token[] => {
  const tokens: Token[] = [];
  let remaining = word.toLowerCase();
  let position = 0;

  while (remaining.length > 0) {
    let matched = false;

    // Try to match the longest possible subword
    for (const subword of SORTED_SUBWORDS) {
      if (remaining.startsWith(subword)) {
        const id = vocab.get(subword) || addToVocab(subword);
        tokens.push({
          id,
          text: subword,
          start: position,
          end: position + subword.length,
        });
        remaining = remaining.slice(subword.length);
        position += subword.length;
        matched = true;
        break;
      }
    }

    // If no subword matches, take single character
    if (!matched) {
      const char = remaining[0];
      const id = vocab.get(char) || addToVocab(char);
      tokens.push({
        id,
        text: char,
        start: position,
        end: position + 1,
      });
      remaining = remaining.slice(1);
      position += 1;
    }
  }

  return tokens;
};

const tokenize = (text: string): Token[] => {
  if (!text) return [];

  const tokens: Token[] = [];
  let currentPos = 0;

  // Split by spaces but keep track of positions
  const parts = text.split(/(\s+)/);

  for (const part of parts) {
    if (part.match(/^\s+$/)) {
      // Handle whitespace
      const spaceId = vocab.get("<|space|>") || addToVocab("<|space|>");
      tokens.push({
        id: spaceId,
        text: part,
        start: currentPos,
        end: currentPos + part.length,
      });
    } else if (part.length > 0) {
      // Handle words
      const wordTokens = tokenizeWord(part);
      wordTokens.forEach(token => {
        tokens.push({
          ...token,
          start: currentPos + token.start,
          end: currentPos + token.end,
        });
      });
    }
    currentPos += part.length;
  }

  return tokens;
};

const decode = (tokens: Token[]): string => {
  return tokens
    .map(token => {
      if (token.id === vocab.get("<|space|>")) {
        return token.text;
      }
      const tokenText = reverseVocab.get(token.id);
      if (tokenText === "<|space|>") {
        return " ";
      }
      return tokenText || "<|unk|>";
    })
    .join("");
};

const getTokenText = (id: number): string => {
  return reverseVocab.get(id) || "<|unk|>";
};

const getVocabSize = (): number => {
  return vocab.size;
};

export const tokenizer = {
  tokenize,
  decode,
  getTokenText,
  getVocabSize,
};
