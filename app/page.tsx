"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CameraOverlay from "@/app/CameraOverlay";

const isDev = false;

export default function LicensePhotoCapture() {
  const [showCamera, setShowCamera] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [bitmap, setBitmap] = useState<ImageBitmap | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const inputRef = useRef<HTMLInputElement | null>(null);

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
      {isDev && (
        <input
          type="file"
          accept="image/jpeg, image/png, image/webp, image/heic, image/heif"
          capture="environment"
          ref={inputRef}
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              console.log("Input file:", file);
              setFile(file);
              setCapturedImage(URL.createObjectURL(file));
              createImageBitmap(file).then((bitmap) => {
                console.log("Bitmap created:", bitmap.width, bitmap.height);
                setBitmap(bitmap);
              });
            }
          }}
        />
      )}
      {!isDev && showCamera && (
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
            if (isDev) {
              console.log("Opening file input", inputRef.current);
              inputRef.current?.click();
            } else {
              setShowCamera(true);
            }
          }}
        >
          撮影
        </Button>
        {file && (
          <span className="text-sm text-gray-500">
            {`${file.name} ${file.type} (${(file.size / (1024 * 1024)).toFixed(
              2
            )} MB) ${bitmap?.width ?? ""}x${bitmap?.height ?? ""} px`}
          </span>
        )}
      </div>
    </>
  );
}
