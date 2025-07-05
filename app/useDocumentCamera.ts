import { useEffect, useRef } from "react";

type Options = {
  onError?: (message: string) => void;
};

const getCameraStream = async (
  constraints: MediaStreamConstraints,
  shouldThrow?: boolean
): Promise<MediaStream | null> => {
  try {
    console.log("getCameraStream", constraints);
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    if (shouldThrow) {
      throw err;
    }
    return null;
  }
};

const highResConstraints: MediaStreamConstraints = {
  video: {
    facingMode: { ideal: "environment" },
    height: { ideal: 1920, max: 2560 },
    width: { ideal: 1080, max: 1920 },
  },
  audio: false,
};

const lowResConstraints: MediaStreamConstraints = {
  video: {
    facingMode: { ideal: "environment" },
    height: 640,
    width: 480,
  },
  audio: false,
};

export function useDocumentCamera(options?: Options) {
  const { onError } = options || {};
  const guideRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stopCamera = () => {
    const video = videoRef.current;
    const stream = video?.srcObject as MediaStream;
    if (stream && stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => {
        if (track.readyState == "live" && track.kind === "video") {
          console.log("stop track", track.readyState, track.kind);
          track.stop();
        }
        // track.stop();
        // stream.removeTrack(track);
      });
    }
    if (video) {
      video.srcObject = null;
    }
  };

  useEffect(() => {
    const startCamera = async () => {
      try {
        stopCamera();

        const stream =
          (await getCameraStream(highResConstraints)) ??
          (await getCameraStream(lowResConstraints, { shouldThrow: true }));

        const video = videoRef.current;
        if (video) {
          video.srcObject = stream;
          video.onloadedmetadata = () => video.play();
        }
      } catch (err: unknown) {
        let message = "カメラの起動に失敗しました";
        console.error(err?.name);
        if (err instanceof DOMException) {
          if (err.name === "NotAllowedError") {
            message = "カメラの使用が許可されていません";
          } else if (err.name === "NotFoundError") {
            message = "カメラが見つかりません";
          } else if (err.name === "OverconstrainedError") {
            message = "制約に適合するカメラが見つかりません";
          }
        }
        onError?.(message);
      }
    };

    startCamera();

    return () => {
      stopCamera();
    };
  }, [onError]);

  const takePhoto = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const guide = guideRef.current;
    if (!video || !canvas || !guide) return null;

    const videoRect = video.getBoundingClientRect();
    const guideRect = guide.getBoundingClientRect();

    console.log(
      "videoRect",
      videoRect,
      "guideRect",
      guideRect,
      "video",
      video.videoHeight,
      video.videoWidth
    );

    const scaleX = video.videoWidth / videoRect.width;
    const scaleY = video.videoHeight / videoRect.height;

    console.log("scaleX", scaleX, "scaleY", scaleY);

    const cropX = (guideRect.left - videoRect.left) * scaleX;
    const cropY = (guideRect.top - videoRect.top) * scaleY;
    console.log("cropX", cropX, "cropY", cropY);

    const cropWidth = guideRect.width * scaleX;
    const cropHeight = guideRect.height * scaleY;

    canvas.width = cropWidth;
    canvas.height = cropHeight;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(
      video,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      cropWidth,
      cropHeight
    );

    return new Promise<File>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) {
          const file = new File([blob], "captured.png", { type: "image/png" });
          resolve(file);
        } else {
          resolve(null);
        }
      }, "image/png");
    });
  };

  return {
    videoRef,
    canvasRef,
    guideRef,
    takePhoto,
    stopCamera,
  };
}
