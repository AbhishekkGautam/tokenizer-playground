# Tokenizer Playground

A modern, interactive web application for real-time text tokenization visualization using BPE (Byte Pair Encoding) algorithms.

<!-- ![Token Visualizer Demo](https://img.shields.io/badge/Status-Production%20Ready-green) -->
![TypeScript](https://img.shields.io/badge/TypeScript-100%25-blue)
![React](https://img.shields.io/badge/Framework-React%2018-61dafb)
![Vite](https://img.shields.io/badge/Build-Vite-646cff)

## 🚀 Features

- **Real-time Tokenization**: See your text tokenized instantly as you type
- **Interactive Token Visualization**: Color-coded tokens with detailed hover tooltips
- **Bidirectional Conversion**: Convert text to tokens and decode token IDs back to text
- **Comprehensive Statistics**: View token count, character count, unique tokens, and compression ratios
- **Special Token Handling**: Support for whitespace visualization and special token markers
- **Dark/Light Mode**: Seamless theme switching with modern UI
- **Responsive Design**: Works perfectly across desktop, tablet, and mobile devices
- **Clean Architecture**: Modular, maintainable React components with TypeScript

## 🏗️ Architecture

### Core Components

1. **Tokenizer Engine** (`src/lib/tokenizer.ts`)

   - BPE-like tokenization algorithm
   - Vocabulary management with greedy matching
   - Special token handling (`<|space|>`, `<|pad|>`, `<|unk|>`)
   - Bidirectional encoding/decoding

2. **Token Visualization** (`src/components/TokenDisplay.tsx` & `TokenChip.tsx`)

   - Color-coded token rendering
   - Interactive tooltips with token details
   - Whitespace character visualization
   - Toggle between text and ID display

3. **Statistics Dashboard** (`src/components/TokenStats.tsx`)

   - Real-time tokenization metrics
   - Compression ratio analysis
   - Token frequency insights

4. **Token Decoder** (`src/components/TokenDecoder.tsx`)
   - Manual token ID input interface
   - Decode functionality with error handling
   - Copy-to-clipboard integration

## 🧠 How It Works

### Tokenization Algorithm

The visualizer uses a sophisticated BPE-like approach:

1. **Text Preprocessing**:

   ```typescript
   // Greedy matching algorithm
   for (let i = 0; i < text.length; i++) {
     let matched = false;
     // Try longest matches first
     for (
       let len = Math.min(maxSubwordLength, text.length - i);
       len >= 1;
       len--
     ) {
       const candidate = text.slice(i, i + len);
       if (vocab.has(candidate)) {
         // Found match, create token
         matched = true;
         break;
       }
     }
   }
   ```

2. **Vocabulary Management**:

   - Pre-built vocabulary with common subwords and patterns
   - Character-level fallback for unknown sequences
   - Special token handling for whitespace and control characters
   - Consistent color assignment based on token hash

3. **Encoding Process**:

   - Greedy longest-match tokenization
   - Position tracking for detailed tooltips
   - Special token insertion for whitespace preservation
   - Return structured token objects with metadata

4. **Decoding Process**:
   - Map token IDs back to text representations
   - Handle special tokens appropriately
   - Reconstruct original spacing and formatting
   - Error handling for invalid token IDs

### Special Tokens

- `<|space|>`: Whitespace tokens for space preservation
- `<|pad|>`: Padding tokens for sequence alignment
- `<|unk|>`: Unknown tokens for out-of-vocabulary handling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd token-palette-visualizer
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Built With

- **React 18** - Frontend framework
- **TypeScript** - Type safety and better development experience
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Beautiful and accessible UI components
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful, customizable icons

### Usage

1. **Text Input**:

   - Enter or paste text in the "Text Encoder" section
   - See real-time tokenization with color-coded tokens
   - View comprehensive statistics in the dashboard

2. **Token Visualization**:

   - Hover over tokens to see detailed information
   - Toggle "Token IDs" to switch between text and numeric display
   - Toggle "Spaces" to visualize whitespace characters

3. **Token Decoding**:
   - Use "Use Current Tokens" to populate decoder with current tokens
   - Manually enter token IDs (comma or space separated)
   - Click "Decode Tokens" to convert back to text
   - Copy decoded result to clipboard

## 🔧 API Reference

### Core Tokenizer Functions

**`tokenize(text: string): Token[]`**

- Convert text to array of token objects
- Returns structured tokens with position and metadata

**`decode(tokens: Token[]): string`**

- Convert token array back to readable text
- Handles special tokens and spacing correctly

**`getTokenText(id: number): string`**

- Get text representation for specific token ID
- Returns token string or special token marker

**`getVocabSize(): number`**

- Returns total vocabulary size
- Includes all subwords and special tokens

### Token Object Structure

```typescript
interface Token {
  id: number; // Unique token identifier
  text: string; // Token text representation
  start: number; // Start position in original text
  end: number; // End position in original text
}
```

### Color Utilities

**`getTokenColor(tokenId: number): ColorPair`**

- Generate consistent colors for token visualization
- Returns background and text color pair

**`getWhitespaceColor(): ColorPair`**

- Special color scheme for whitespace tokens
- Enhanced visibility for space characters

## 📊 Statistics & Metrics

The visualizer provides comprehensive tokenization analytics:

- **Total Tokens**: Count of generated tokens
- **Characters**: Total character count in input
- **Unique Tokens**: Number of distinct token IDs used
- **Compression Ratio**: Efficiency metric (lower = better compression)

## 🎯 Example Usage

### Basic Tokenization

```typescript
import { tokenizer } from "@/lib/tokenizer";

// Tokenize text
const text = "Hello, world! This is a sample text.";
const tokens = tokenizer.tokenize(text);
console.log(tokens);
// Output: [
//   { id: 15, text: "Hello", start: 0, end: 5 },
//   { id: 42, text: ",", start: 5, end: 6 },
//   { id: 3, text: " ", start: 6, end: 7 },
//   ...
// ]

// Decode back to text
const decoded = tokenizer.decode(tokens);
console.log(decoded); // "Hello, world! This is a sample text."
```

### Advanced Features

```typescript
// Get vocabulary information
const vocabSize = tokenizer.getVocabSize();
console.log(`Vocabulary size: ${vocabSize}`);

// Handle specific token lookups
const tokenText = tokenizer.getTokenText(15);
console.log(`Token 15: "${tokenText}"`);

// Color generation for visualization
import { getTokenColor } from "@/lib/colorUtils";
const colors = getTokenColor(15);
console.log(colors); // { background: "#...", text: "#..." }
```

<!-- ### Performance Considerations

- **Memory Usage**: Scales with input text length
- **Tokenization Speed**: O(n×m) where n = text length, m = max subword length
- **Rendering Performance**: Optimized with React.memo and efficient re-renders -->

## Limitations & Considerations

### Current Limitations

1. **Fixed Vocabulary**: Uses pre-built vocabulary, not trainable
2. **Greedy Algorithm**: May not find optimal tokenization
3. **English-focused**: Optimized for English text patterns
4. **Client-side Only**: No server-side processing or persistence

### Performance Considerations

- **Large Texts**: Performance may degrade with very long inputs
- **Token Count**: High token counts affect rendering performance
- **Memory Usage**: Token objects and color calculations use browser memory

<!-- ### Potential Improvements

1. **Trainable Vocabulary**: Allow custom vocabulary training
2. **Multiple Languages**: Support for non-English text
3. **Advanced Algorithms**: Implement true BPE or WordPiece
4. **Export Features**: Save/load tokenizations and vocabularies
5. **Batch Processing**: Handle multiple texts efficiently
6. **Performance Optimization**: Virtual scrolling for large token sets -->

<!-- ## 🎨 UI Design Principles

- **Immediate Feedback**: Real-time tokenization as you type
- **Visual Clarity**: Color-coded tokens with clear boundaries
- **Information Density**: Rich tooltips without cluttering interface
- **Responsive Layout**: Optimal experience across all devices
- **Accessibility**: High contrast colors and keyboard navigation
- **Progressive Disclosure**: Advanced features available but not overwhelming -->

<!-- ## 📈 Future Enhancements

1. **Advanced Tokenization**:

   - True BPE algorithm implementation
   - WordPiece and SentencePiece support
   - Custom vocabulary training interface

2. **Enhanced Visualization**:

   - Token frequency heatmaps
   - Vocabulary overlap analysis
   - Interactive token relationship graphs

3. **Export & Integration**:

   - JSON/CSV export for tokenizations
   - API endpoints for programmatic access
   - Integration with ML frameworks

4. **Performance & Scale**:

   - Web Workers for heavy computations
   - Virtual scrolling for large token sets
   - Streaming tokenization for large texts

5. **Educational Features**:
   - Step-by-step algorithm visualization
   - Comparison between different algorithms
   - Interactive tutorials and examples -->

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes with proper TypeScript types
4. Add tests for new functionality
5. Commit: `git commit -m 'Add amazing feature'`
6. Push: `git push origin feature/amazing-feature`
7. Open a Pull Request with detailed description
