/**
 * Utility functions for generating consistent token colors
 */

// More subtle pastel colors for tokens
const PASTEL_COLORS = [
  'hsl(350, 50%, 80%)', // Soft pink
  'hsl(30, 50%, 80%)',  // Soft orange
  'hsl(60, 50%, 80%)',  // Soft yellow
  'hsl(120, 50%, 80%)', // Soft green
  'hsl(180, 50%, 80%)', // Soft cyan
  'hsl(240, 50%, 80%)', // Soft blue
  'hsl(300, 50%, 80%)', // Soft purple
  'hsl(15, 50%, 80%)',  // Soft coral
  'hsl(200, 50%, 80%)', // Soft sky blue
  'hsl(280, 50%, 80%)', // Soft magenta
  'hsl(45, 50%, 80%)',  // Soft gold
  'hsl(160, 50%, 80%)', // Soft mint
];

// Darker versions for text to ensure readability
const PASTEL_TEXT_COLORS = [
  'hsl(350, 50%, 30%)', // Dark pink
  'hsl(30, 50%, 30%)',  // Dark orange
  'hsl(60, 50%, 30%)',  // Dark yellow
  'hsl(120, 50%, 30%)', // Dark green
  'hsl(180, 50%, 30%)', // Dark cyan
  'hsl(240, 50%, 30%)', // Dark blue
  'hsl(300, 50%, 30%)', // Dark purple
  'hsl(15, 50%, 30%)',  // Dark coral
  'hsl(200, 50%, 30%)', // Dark sky blue
  'hsl(280, 50%, 30%)', // Dark magenta
  'hsl(45, 50%, 30%)',  // Dark gold
  'hsl(160, 50%, 30%)', // Dark mint
];

/**
 * Generate a consistent color for a token ID
 */
export function getTokenColor(tokenId: number): { background: string; text: string } {
  const colorIndex = tokenId % PASTEL_COLORS.length;
  return {
    background: PASTEL_COLORS[colorIndex],
    text: PASTEL_TEXT_COLORS[colorIndex],
  };
}

/**
 * Generate a hash-based color for consistent coloring across sessions
 */
export function hashTokenToColor(token: string): { background: string; text: string } {
  let hash = 0;
  for (let i = 0; i < token.length; i++) {
    const char = token.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  const colorIndex = Math.abs(hash) % PASTEL_COLORS.length;
  return {
    background: PASTEL_COLORS[colorIndex],
    text: PASTEL_TEXT_COLORS[colorIndex],
  };
}

/**
 * Get a special color for whitespace tokens
 */
export function getWhitespaceColor(): { background: string; text: string } {
  return {
    background: 'hsl(220, 20%, 85%)',
    text: 'hsl(220, 30%, 45%)',
  };
}