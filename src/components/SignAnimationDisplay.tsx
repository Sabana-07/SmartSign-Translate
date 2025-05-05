
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Map of sign language words to placeholder image URLs
// This would be replaced with AI-generated images in a production environment
const signImageMap: Record<string, string> = {
  // Common greeting signs
  hello: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  hi: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  
  // Words from the sign language list (using rotation of placeholder images)
  all: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  animal: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  bad: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  because: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  bird: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  black: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  blood: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  child: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  count: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  day: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  die: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  dirty: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  dog: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  dry: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  earth: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  egg: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  father: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  fire: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  fish: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  flower: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  good: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  grass: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  green: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  heavy: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  how: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  hunt: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  husband: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  ice: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  if: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  kill: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  laugh: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  leaf: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  lie: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  live: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  long: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  
  // Continue with more words from the image
  man: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  meat: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  mother: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  mountain: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  name: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  night: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  not: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  old: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  other: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  person: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  play: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  rain: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  red: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  right: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  river: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  rope: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  salt: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  sea: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  sharp: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  short: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  sing: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  sit: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  smooth: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  snake: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  snow: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  stand: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  star: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  stone: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  sun: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  tail: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  thin: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  tree: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  vomit: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  warm: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  water: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  wet: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  what: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  when: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  where: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  white: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  who: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  wide: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  wife: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  wind: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  with: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  woman: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  wood: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  worm: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  year: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  yellow: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  full: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  moon: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  brother: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  cat: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  dance: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  pig: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  sister: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  work: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  
  // Common phrases
  thank: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1", 
  you: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  please: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  help: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  yes: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  no: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
};

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

  useEffect(() => {
    const findSignImage = () => {
      if (!inputText || inputText.trim() === "") {
        setSignImage(null);
        setMatchedWord(null);
        return;
      }

      try {
        // Get the words from the input text and convert to lowercase
        const words = inputText.toLowerCase().split(/\s+/);
        
        // Try to find a match in our sign image map
        let foundMatch = false;
        
        for (const word of words) {
          if (signImageMap[word]) {
            setSignImage(signImageMap[word]);
            setMatchedWord(word);
            setError(null);
            foundMatch = true;
            break;
          }
        }
        
        if (!foundMatch) {
          // Use a random image if no match is found
          const keys = Object.keys(signImageMap);
          const randomKey = keys[Math.floor(Math.random() * keys.length)];
          setSignImage(signImageMap[randomKey]);
          setMatchedWord(null);
          setError(`No exact match found for "${inputText}". Showing a random sign.`);
        }
      } catch (err) {
        console.error("Error finding sign image:", err);
        setSignImage(null);
        setMatchedWord(null);
        setError("Failed to load sign language animation");
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
          {isGenerating ? (
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
                  (Using static sign language images)
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
