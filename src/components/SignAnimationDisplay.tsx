
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SignAnimationDisplayProps {
  inputText: string;
  isGenerating: boolean;
}

const SignAnimationDisplay: React.FC<SignAnimationDisplayProps> = ({
  inputText,
  isGenerating,
}) => {
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGif = async () => {
      if (!inputText || inputText.trim() === "") {
        setGifUrl(null);
        return;
      }

      try {
        // Using the public beta key for demonstration purposes
        // In a production app, you should use an API key from environment variables
        const apiKey = "hCvQHi6GNjP4fI9xQ8kffiYDaKGLDQA1";
        const searchTerm = `sign language ${inputText.split(" ")[0]}`; // Search for the first word
        const response = await fetch(
          `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(
            searchTerm
          )}&limit=1&offset=0&rating=g&lang=en`
        );

        const data = await response.json();
        
        if (data.data && data.data.length > 0) {
          setGifUrl(data.data[0].images.fixed_height.url);
          setError(null);
        } else {
          setGifUrl(null);
          setError("No sign language GIF found for this text");
        }
      } catch (err) {
        console.error("Error fetching GIF:", err);
        setGifUrl(null);
        setError("Failed to load sign language animation");
      }
    };

    if (!isGenerating && inputText) {
      fetchGif();
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
          ) : gifUrl ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <img 
                src={gifUrl} 
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
                Sign animation for "{inputText}" would appear here.
                <br />
                <span className="text-xs">
                  (Loading sign language GIFs...)
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
