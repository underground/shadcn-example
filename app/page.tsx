"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CameraOverlay from "@/app/CameraOverlay";

export default function LicensePhotoCapture() {
  const [showCamera, setShowCamera] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  useEffect(() => {
    const handler = (event: BeforeUnloadEvent) => {
      console.log("beforeunload");
      event.preventDefault();
      event.returnValue = "custom message";
    };
    window.addEventListener("beforeunload", handler);
    return () => {
      window.removeEventListener("beforeunload", handler);
    };
  }, []);

  // 撮影開始画面
  return (
    <>
      {showCamera && (
        <CameraOverlay
          aspectRatio={1.4}
          onCapture={(file) => {
            console.log("Captured file:", file);
            setCapturedImage(URL.createObjectURL(file));
            setFile(file);
            setShowCamera(false);
          }}
          onClose={() => {
            setShowCamera(false);
          }}
        />
      )}
      {capturedImage && (
        <div className="w-full h-auto flex-1">
          <Image
            src={capturedImage}
            alt="撮影された写真"
            width={0}
            height={0}
            className="w-full h-auto block"
          />
        </div>
      )}
      <div className="flex items-center gap-2">
        <Button
          onClick={() => {
            setCapturedImage(null);
            setShowCamera(true);
          }}
        >
          撮影
        </Button>
        {file && (
          <span className="text-sm text-gray-500">
            {file.name} {file.type} ({(file.size / 1024).toFixed(2)} KB)
          </span>
        )}
      </div>
    </>
  );
}
