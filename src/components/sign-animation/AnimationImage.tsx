
import React from "react";

interface AnimationImageProps {
  src: string;
  alt: string;
  matchedWord: string | null;
}

const AnimationImage: React.FC<AnimationImageProps> = ({ src, alt, matchedWord }) => {
  return (
    <>
      <img 
        src={src} 
        alt={alt} 
        className="max-w-full max-h-[80%] object-contain mb-2"
      />
      {matchedWord && (
        <p className="text-sm text-center font-medium">
          Sign for: <span className="text-primary">{matchedWord}</span>
        </p>
      )}
    </>
  );
};

export default AnimationImage;
