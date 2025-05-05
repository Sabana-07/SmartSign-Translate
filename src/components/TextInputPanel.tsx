
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface TextInputPanelProps {
  onTextSubmit: (text: string) => void;
}

const TextInputPanel: React.FC<TextInputPanelProps> = ({ onTextSubmit }) => {
  const [inputText, setInputText] = useState("");

  const handleSubmit = () => {
    if (inputText.trim()) {
      onTextSubmit(inputText.trim());
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Text to Sign</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea
            placeholder="Enter text to translate into sign language..."
            className="resize-none min-h-24"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button 
            onClick={handleSubmit}
            className="w-full"
            disabled={!inputText.trim()}
          >
            Translate to Sign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TextInputPanel;
