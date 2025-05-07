
import { useState, useEffect } from "react";
import { aiImageService } from "@/services/aiImageService";
import { WordMatcher } from "./WordMatcher";

interface UseSignImageProps {
  inputText: string;
  isGenerating: boolean;
  wordMatcher: WordMatcher;
}

interface UseSignImageResult {
  signImage: string | null;
  matchedWord: string | null;
  error: string | null;
  isLoadingImage: boolean;
}

export const useSignImage = ({
  inputText,
  isGenerating,
  wordMatcher
}: UseSignImageProps): UseSignImageResult => {
  const [signImage, setSignImage] = useState<string | null>(null);
  const [matchedWord, setMatchedWord] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

  useEffect(() => {
    const findSignImage = async () => {
      if (!inputText || inputText.trim() === "") {
        setSignImage(null);
        setMatchedWord(null);
        setError(null);
        return;
      }

      try {
        setIsLoadingImage(true);
        setError(null);
        
        // Find a match for the input text
        const { matchedWord, firstWord, error } = wordMatcher.findMatch(inputText);
        
        // Generate image based on matched word or first word
        const wordToUse = matchedWord || firstWord;
        if (wordToUse) {
          const imageUrl = await aiImageService.getSignLanguageImage(wordToUse);
          setSignImage(imageUrl);
          setMatchedWord(matchedWord);
          setError(error);
        }
      } catch (err) {
        console.error("Error finding sign image:", err);
        setSignImage(null);
        setMatchedWord(null);
        setError("Failed to load sign language animation");
      } finally {
        setIsLoadingImage(false);
      }
    };

    if (!isGenerating && inputText) {
      findSignImage();
    }
  }, [inputText, isGenerating, wordMatcher]);

  return { signImage, matchedWord, error, isLoadingImage };
};
