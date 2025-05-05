
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Map of common signs to placeholder image URLs
const signImageMap: Record<string, string> = {
  hello: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  hi: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
  thank: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1", 
  you: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
  please: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  help: "https://images.unsplash.com/photo-1501286353178-1ec881214838",
  name: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const findSignImage = () => {
      if (!inputText || inputText.trim() === "") {
        setSignImage(null);
        return;
      }

      try {
        // Get the first word of the input text and convert to lowercase
        const firstWord = inputText.split(" ")[0].toLowerCase();
        
        // Check if we have a matching sign in our map
        if (signImageMap[firstWord]) {
          setSignImage(signImageMap[firstWord]);
          setError(null);
        } else {
          // Use a random image if no match is found
          const randomKey = Object.keys(signImageMap)[Math.floor(Math.random() * Object.keys(signImageMap).length)];
          setSignImage(signImageMap[randomKey]);
          setError(null);
        }
      } catch (err) {
        console.error("Error finding sign image:", err);
        setSignImage(null);
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
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={signImage} 
                alt={`Sign language for "${inputText}"`} 
                className="max-w-full max-h-full object-contain"
              />
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
