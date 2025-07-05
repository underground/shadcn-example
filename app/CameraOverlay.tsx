import React from "react";
import { useDocumentCamera } from "./useDocumentCamera";
import { Button } from "@/components/ui/button";
import { GridOverlay } from "@/app/GridOverlay";
import { MousePositionOverlay } from "@/app/MousePositionOverlay";

type CameraOverlayProps = {
  aspectRatio: number;
  onClose: () => void;
  onCapture: (file: File) => void;
};

export default function CameraOverlay({
  aspectRatio,
  onClose,
  onCapture,
}: CameraOverlayProps) {
  const { videoRef, canvasRef, guideRef, takePhoto, stopCamera } =
    useDocumentCamera({
      onError: (message) => {
        alert(message);
        onClose();
      },
    });

  const handleCapture = async () => {
    const data = await takePhoto();
    if (data) {
      console.log("stop camera -------");
      stopCamera();
      console.log("onCapture -------");
      onCapture(data);
      console.log("onClose -------");
      onClose(); // 撮影後に閉じる
    }
  };

  return (
    <div className="h-full w-full flex flex-col overflow-hidden absolute top-0 left-0 z-2 bg-black bg-opacity-50">
      <div className="relative h-full w-full flex flex-col justify-center">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          disablePictureInPicture
          className="inset-0 w-full h-auto object-contain"
        />
        {/* ガイド */}
        <div
          ref={guideRef}
          className="absolute left-1/2 top-1/2 border-1 border-dashed pointer-events-none"
          style={{
            width: "90vw",
            maxHeight: "90vh",
            aspectRatio: `${aspectRatio}`,
            transform: "translate(-50%, -50%)",
          }}
        >
          <CornerLines />
        </div>
        <canvas ref={canvasRef} className="hidden" />
        <GridOverlay />
        <MousePositionOverlay />
      </div>
      <div className="flex items-center w-full absolute left-0 bottom-16 right-0">
        {/* 撮影ボタン */}
        <Button onClick={handleCapture}>撮影</Button>
        <Button onClick={stopCamera}>停止</Button>
      </div>
    </div>
  );
}

const CornerLines = () => {
  const common = "absolute w-6 h-6 border-white z-10 pointer-events-none"; // z-10 で破線より前に

  return (
    <>
      <div
        className={`${common} border-t-4 border-l-4`}
        style={{ top: -3, left: -3 }}
      />
      <div
        className={`${common} border-t-4 border-r-4`}
        style={{ top: -3, right: -3 }}
      />
      <div
        className={`${common} border-b-4 border-l-4`}
        style={{ bottom: -3, left: -3 }}
      />
      <div
        className={`${common} border-b-4 border-r-4`}
        style={{ bottom: -3, right: -3 }}
      />
    </>
  );
};
