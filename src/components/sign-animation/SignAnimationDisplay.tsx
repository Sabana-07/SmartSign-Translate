
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WordMatcher, supportedWords } from "./WordMatcher";
import { useSignImage } from "./useSignImage";
import AnimationImage from "./AnimationImage";
import AnimationStatus from "./AnimationStatus";

interface SignAnimationDisplayProps {
  inputText: string;
  isGenerating: boolean;
}

const SignAnimationDisplay: React.FC<SignAnimationDisplayProps> = ({
  inputText,
  isGenerating,
}) => {
  // Create a word matcher with supported words
  const wordMatcher = React.useMemo(() => new WordMatcher(supportedWords), []);
  
  // Use our custom hook to handle image loading and word matching
  const { signImage, matchedWord, error, isLoadingImage } = useSignImage({
    inputText,
    isGenerating,
    wordMatcher
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Sign Animation</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="sign-animation-container">
          {isGenerating || isLoadingImage ? (
            <AnimationStatus isLoading={true} />
          ) : signImage ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimationImage 
                src={signImage} 
                alt={`Sign language for "${matchedWord || inputText}"`}
                matchedWord={matchedWord} 
              />
              {error && (
                <p className="text-xs text-muted-foreground mt-1">
                  {error}
                </p>
              )}
            </div>
          ) : (
            <AnimationStatus 
              inputText={inputText} 
              error={error} 
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SignAnimationDisplay;
