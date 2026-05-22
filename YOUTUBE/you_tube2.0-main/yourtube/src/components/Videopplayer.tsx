"use client";

import { useRef, useEffect } from "react";
import { useUser } from "@/lib/AuthContext";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle: string;
    filepath: string;
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user } = useUser();
  const watchLimits: any = {
    free: 4,
    bronze: 6,
    silver: 8,
    gold: Infinity,
  };

  const currentPlan = user?.plan || "free";
  const allowedTime = watchLimits[currentPlan];

  const videos = "/video/vdo.mp4";

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const handleTimeUpdate = () => {
      if (
        videoElement.currentTime >=
        allowedTime
      ) {
        videoElement.pause();
        alert(
          `Your ${currentPlan} plan watch limit has been reached. Upgrade your plan to continue watching.`
        );
      }
    };
    videoElement.addEventListener(
      "timeupdate",
      handleTimeUpdate
    );
    return () => {
      videoElement.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );
    };

  }, [allowedTime, currentPlan]);

  return (
    <div className="aspect-video bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="w-full h-full"
        controls
        poster={`/placeholder.svg?height=480&width=854`}
      >
        <source
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${video?.filepath}`}
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
