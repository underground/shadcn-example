"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CameraOverlay from "@/app/CameraOverlay";

export default function LicensePhotoCapture() {
  const [showCamera, setShowCamera] = useState(true);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  // 撮影開始画面
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      {showCamera && (
        <CameraOverlay
          aspectRatio={1.4}
          onCapture={(file) => {
            setCapturedImage(URL.createObjectURL(file));
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
      <div>
        <Button
          onClick={() => {
            setCapturedImage(null);
            setShowCamera(true);
          }}
        >
          撮影
        </Button>
      </div>
    </div>
  );
}
