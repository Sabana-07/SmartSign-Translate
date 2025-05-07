
/**
 * Utility for matching words with supported sign language words
 */
export class WordMatcher {
  private supportedWords: string[];

  constructor(supportedWords: string[] = []) {
    this.supportedWords = supportedWords;
  }

  /**
   * Find a matching word from input text within the supported words list
   * @param inputText The text to find a match for
   * @returns An object containing the matched word and status
   */
  findMatch(inputText: string): { 
    matchedWord: string | null;
    firstWord: string | null;
    error: string | null;
  } {
    if (!inputText || inputText.trim() === "") {
      return { matchedWord: null, firstWord: null, error: null };
    }

    // Get the words from the input text and convert to lowercase
    const words = inputText.toLowerCase().split(/\s+/);
    let foundMatch = false;
    let matchedWord = null;
    
    // Try to find a match in our supported words list
    for (const word of words) {
      if (this.supportedWords.includes(word)) {
        matchedWord = word;
        foundMatch = true;
        break;
      }
    }

    // If no exact match, use the first word for demonstration
    const firstWord = words[0];
    const error = !foundMatch 
      ? `No exact match found for "${inputText}". Showing approximation for "${firstWord}".` 
      : null;
    
    return { matchedWord, firstWord, error };
  }
}

// List of supported sign language words
export const supportedWords = [
  "hello", "hi", "all", "animal", "bad", "because", "bird", "black", 
  "blood", "child", "count", "day", "die", "dirty", "dog", "dry", 
  "earth", "egg", "father", "fire", "fish", "flower", "good", "grass", 
  "green", "heavy", "how", "hunt", "husband", "ice", "if", "kill", 
  "laugh", "leaf", "lie", "live", "long", "man", "meat", "mother", 
  "mountain", "name", "night", "not", "old", "other", "person", "play", 
  "rain", "red", "right", "river", "rope", "salt", "sea", "sharp", 
  "short", "sing", "sit", "smooth", "snake", "snow", "stand", "star", 
  "stone", "sun", "tail", "thin", "tree", "vomit", "warm", "water", 
  "wet", "what", "when", "where", "white", "who", "wide", "wife", 
  "wind", "with", "woman", "wood", "worm", "year", "yellow", "full", 
  "moon", "brother", "cat", "dance", "pig", "sister", "work", 
  "thank", "you", "please", "help", "yes", "no"
];
