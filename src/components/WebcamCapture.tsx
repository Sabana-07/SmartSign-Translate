
import React, { useRef, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Pause } from "lucide-react";

interface WebcamCaptureProps {
  onFrame?: (imageData: ImageData) => void;
  isCapturing: boolean;
  toggleCapture: () => void;
}

const WebcamCapture: React.FC<WebcamCaptureProps> = ({
  onFrame,
  isCapturing,
  toggleCapture,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrameId: number;

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        setHasPermission(false);
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  useEffect(() => {
    let animationFrameId: number;
    
    const captureFrame = () => {
      if (!isCapturing) return;
      
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0);
          
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          if (onFrame) {
            onFrame(imageData);
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(captureFrame);
    };
    
    if (isCapturing) {
      captureFrame();
    } else if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isCapturing, onFrame]);

  return (
    <Card className="border-2 overflow-hidden">
      <CardContent className="p-0">
        <div className="webcam-container">
          {hasPermission === false && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <p className="text-center text-muted-foreground">
                Camera access denied. Please enable camera access to use the sign language translator.
              </p>
            </div>
          )}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className={hasPermission === false ? "opacity-0" : ""}
          />
          <canvas ref={canvasRef} className="opacity-0 absolute" />
        </div>
        <div className="p-4 flex justify-center">
          <Button 
            onClick={toggleCapture} 
            variant={isCapturing ? "destructive" : "default"}
            className="rounded-full h-14 w-14 flex items-center justify-center"
          >
            {isCapturing ? <Pause size={24} /> : <Camera size={24} />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default WebcamCapture;
