import { useRef, useCallback } from "react";
import Webcam from "react-webcam";

export const useWebCam = () => {
  const webcamRef = useRef<Webcam>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const captureAndCrop = useCallback((): Promise<File | null> => {
    return new Promise((resolve) => {
      const webcam = webcamRef.current;
      const overlay = overlayRef.current;
      if (!webcam || !overlay) return resolve(null);

      const screenshot = webcam.getScreenshot();
      if (!screenshot) return resolve(null);

      const video = webcam.video!;
      const overlayRect = overlay.getBoundingClientRect();
      const videoRect = video.getBoundingClientRect();

      const scaleX = video.videoWidth / video.clientWidth;
      const scaleY = video.videoHeight / video.clientHeight;

      const cropX = overlayRect.left - videoRect.left;
      const cropY = overlayRect.top - videoRect.top;
      const cropWidth = overlayRect.width;
      const cropHeight = overlayRect.height;

      const canvas = document.createElement("canvas");
      canvas.width = cropWidth * scaleX;
      canvas.height = cropHeight * scaleY;

      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(null);

      const img = new Image();
      img.onload = () => {
        ctx.drawImage(
          img,
          cropX * scaleX,
          cropY * scaleY,
          cropWidth * scaleX,
          cropHeight * scaleY,
          0,
          0,
          cropWidth * scaleX,
          cropHeight * scaleY
        );

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "capture.png", { type: "image/png" });
            resolve(file);
          } else {
            resolve(null);
          }
        }, "image/png");
      };
      img.src = screenshot;
    });
  }, []);

  return {
    webcamRef,
    overlayRef,
    captureAndCrop,
  };
};
