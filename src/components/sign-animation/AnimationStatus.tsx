
import React from "react";

interface AnimationStatusProps {
  isLoading?: boolean;
  error?: string | null;
  inputText?: string;
}

const AnimationStatus: React.FC<AnimationStatusProps> = ({ 
  isLoading = false, 
  error = null, 
  inputText = "" 
}) => {
  if (isLoading) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (error && inputText) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground text-center px-4">
          {error}
        </p>
      </div>
    );
  }
  
  if (inputText) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <p className="text-muted-foreground text-center px-4">
          Sign language for "{inputText}" would appear here.
          <br />
          <span className="text-xs">
            (AI-generated sign language images)
          </span>
        </p>
      </div>
    );
  }
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <p className="text-muted-foreground text-center">
        Enter text to see it translated to sign language
      </p>
    </div>
  );
};

export default AnimationStatus;
