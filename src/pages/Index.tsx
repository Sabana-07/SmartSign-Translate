
import React, { useState, useCallback, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WebcamCapture from "@/components/WebcamCapture";
import LanguageSelector, { Language } from "@/components/LanguageSelector";
import TextOutputDisplay from "@/components/TextOutputDisplay";
import SignAnimationDisplay from "@/components/SignAnimationDisplay";
import TextInputPanel from "@/components/TextInputPanel";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockApiService } from "@/services/mockApiService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("english");
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [textToAnimate, setTextToAnimate] = useState<string>("");
  const [isGeneratingAnimation, setIsGeneratingAnimation] = useState<boolean>(false);
  const [recognizedSigns, setRecognizedSigns] = useState<string[]>([]);
  const { toast } = useToast();

  const toggleCapture = useCallback(() => {
    setIsCapturing(prev => !prev);
    if (!isCapturing) {
      setRecognizedSigns([]);
      setRecognizedText("");
    }
  }, [isCapturing]);

  const handleVideoFrame = useCallback(async (imageData: ImageData) => {
    try {
      const sign = await mockApiService.processVideoFrame(imageData);
      if (sign && !recognizedSigns.includes(sign)) {
        setRecognizedSigns(prev => [...prev, sign]);
      }
    } catch (error) {
      console.error("Error processing video frame:", error);
    }
  }, [recognizedSigns]);

  const handleTextToSignSubmit = useCallback(async (text: string) => {
    setTextToAnimate(text);
    setIsGeneratingAnimation(true);
    
    try {
      await mockApiService.textToSignAnimation(text, selectedLanguage);
    } catch (error) {
      console.error("Error generating sign animation:", error);
      toast({
        title: "Error",
        description: "Failed to generate sign animation",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingAnimation(false);
    }
  }, [selectedLanguage, toast]);

  // Update the recognized text when signs change
  useEffect(() => {
    setRecognizedText(recognizedSigns.join(" "));
  }, [recognizedSigns]);

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    toast({
      title: "Language Changed",
      description: `Selected language: ${language}`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-8 px-4 md:px-6">
        <h1 className="text-3xl font-bold mb-8 text-center">Sign Language Translator</h1>
        
        <div className="grid gap-6 md:grid-cols-12">
          {/* Left column - Language selection */}
          <div className="md:col-span-3">
            <LanguageSelector 
              selectedLanguage={selectedLanguage}
              onLanguageChange={handleLanguageChange}
            />
          </div>
          
          {/* Main content area */}
          <div className="md:col-span-9">
            <Tabs defaultValue="recognize" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recognize">Recognize Signs</TabsTrigger>
                <TabsTrigger value="translate">Text to Sign</TabsTrigger>
              </TabsList>
              
              {/* Recognize signs tab */}
              <TabsContent value="recognize" className="space-y-6 mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <WebcamCapture 
                      onFrame={handleVideoFrame}
                      isCapturing={isCapturing}
                      toggleCapture={toggleCapture}
                    />
                  </div>
                  <div>
                    <TextOutputDisplay recognizedText={recognizedText} />
                  </div>
                </div>
                
                {/* Instructions card */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">How to use Sign Recognition</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Click the camera button to start capturing</li>
                      <li>Position yourself in frame and make sign gestures</li>
                      <li>The system will recognize signs and display them as text</li>
                      <li>Use the speaker button to hear the recognized text</li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
              
              {/* Text to sign tab */}
              <TabsContent value="translate" className="space-y-6 mt-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <TextInputPanel onTextSubmit={handleTextToSignSubmit} />
                  </div>
                  <div>
                    <SignAnimationDisplay 
                      inputText={textToAnimate}
                      isGenerating={isGeneratingAnimation}
                    />
                  </div>
                </div>
                
                {/* Instructions card */}
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="font-medium mb-2">How to use Text to Sign</h3>
                    <ol className="list-decimal pl-5 space-y-2 text-sm text-muted-foreground">
                      <li>Type text you want to translate in the input field</li>
                      <li>Click "Translate to Sign" button</li>
                      <li>Wait for the animation to generate</li>
                      <li>The sign language animation will display on the right</li>
                    </ol>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
