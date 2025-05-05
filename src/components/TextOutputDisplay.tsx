
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2, Volume } from "lucide-react";

interface TextOutputDisplayProps {
  recognizedText: string;
}

const TextOutputDisplay: React.FC<TextOutputDisplayProps> = ({
  recognizedText,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const speakText = () => {
    if (!('speechSynthesis' in window)) {
      console.error("Speech synthesis not supported");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(recognizedText);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Recognized Text</CardTitle>
        <Button 
          onClick={speakText}
          size="icon" 
          variant="ghost"
          disabled={!recognizedText}
        >
          {isSpeaking ? <Volume className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="min-h-20 p-4 bg-muted rounded-md">
          {recognizedText ? (
            <p>{recognizedText}</p>
          ) : (
            <p className="text-muted-foreground text-center">
              Sign language recognition will appear here
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TextOutputDisplay;
