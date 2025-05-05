
import { Language } from "@/components/LanguageSelector";

// Simulated sign recognition results
const mockSignRecognitions: Record<string, string[]> = {
  "frame1": ["hello", "hi"],
  "frame2": ["thank", "you"],
  "frame3": ["name"],
  "frame4": ["help", "please"],
  "frame5": ["yes", "no"],
};

// Simulate delay for asynchronous operations
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockApiService = {
  // Simulate sending a video frame to the backend and getting a recognition result
  async processVideoFrame(imageData: ImageData): Promise<string | null> {
    await delay(300); // Simulate processing delay
    
    // Randomly select from mock recognitions to simulate different results
    const randomKey = Object.keys(mockSignRecognitions)[
      Math.floor(Math.random() * Object.keys(mockSignRecognitions).length)
    ];
    
    const possibleSigns = mockSignRecognitions[randomKey];
    const recognizedSign = possibleSigns[Math.floor(Math.random() * possibleSigns.length)];
    
    return recognizedSign;
  },
  
  // Simulate sending text to be converted to sign language animation
  async textToSignAnimation(text: string, language: Language): Promise<string> {
    await delay(1000); // Simulate processing delay
    
    // In a real implementation, this would return a URL or data for the animation
    return `Animation for: "${text}" in ${language} language`;
  }
};
