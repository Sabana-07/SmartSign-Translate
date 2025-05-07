
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { aiImageService } from "@/services/aiImageService";

interface SignAnimationDisplayProps {
  inputText: string;
  isGenerating: boolean;
}

const SignAnimationDisplay: React.FC<SignAnimationDisplayProps> = ({
  inputText,
  isGenerating,
}) => {
  const [signImage, setSignImage] = useState<string | null>(null);
  const [matchedWord, setMatchedWord] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoadingImage, setIsLoadingImage] = useState<boolean>(false);

  // List of supported sign language words
  const supportedWords = [
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
        
        // Get the words from the input text and convert to lowercase
        const words = inputText.toLowerCase().split(/\s+/);
        
        // Try to find a match in our supported words list
        let foundMatch = false;
        
        for (const word of words) {
          if (supportedWords.includes(word)) {
            // Generate the sign language image for this word
            const imageUrl = await aiImageService.getSignLanguageImage(word);
            setSignImage(imageUrl);
            setMatchedWord(word);
            foundMatch = true;
            break;
          }
        }
        
        if (!foundMatch) {
          // If no exact match, use the first word for demonstration
          const firstWord = words[0];
          const imageUrl = await aiImageService.getSignLanguageImage(firstWord);
          setSignImage(imageUrl);
          setMatchedWord(null);
          setError(`No exact match found for "${inputText}". Showing approximation for "${firstWord}".`);
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
  }, [inputText, isGenerating]);

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Sign Animation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="sign-animation-container">
          {isGenerating || isLoadingImage ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : signImage ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img 
                src={signImage} 
                alt={`Sign language for "${matchedWord || inputText}"`} 
                className="max-w-full max-h-[80%] object-contain mb-2"
              />
              {matchedWord && (
                <p className="text-sm text-center font-medium">
                  Sign for: <span className="text-primary">{matchedWord}</span>
                </p>
              )}
              {error && (
                <p className="text-xs text-muted-foreground mt-1">
                  {error}
                </p>
              )}
            </div>
          ) : inputText && error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-center px-4">
                {error}
              </p>
            </div>
          ) : inputText ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-center px-4">
                Sign language for "{inputText}" would appear here.
                <br />
                <span className="text-xs">
                  (AI-generated sign language images)
                </span>
              </p>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-muted-foreground text-center">
                Enter text to see it translated to sign language
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SignAnimationDisplay;
