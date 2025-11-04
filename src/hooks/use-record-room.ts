/** biome-ignore-all lint/suspicious/noConsole: dev */
import { env } from "@/env";
import { useQueryClient } from "@tanstack/react-query";
import { useRef, useState } from "react";

const isRecordingSupported =
  Boolean(navigator.mediaDevices) &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

export function useRecordRoomAudio(roomId: string) {
  const queryClient = useQueryClient();
  const [isRecording, setIsRecording] = useState(false);
  const recorder = useRef<MediaRecorder | null>(null);

  const intervalRef = useRef<NodeJS.Timeout>(null);

  function stopRecording() {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    await fetch(`${env.VITE_APP_API_URL}/rooms/${roomId}/audio`, {
      method: "POST",
      body: formData,
    });

    await queryClient.invalidateQueries({
      queryKey: ["get-room", "audio", roomId],
    });
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    // For development:
    // recorder.current.onstart = () => {
    //   console.log('Recording started')
    // }

    // recorder.current.onstop = () => {
    //   console.log('Recording stopped')
    // }

    recorder.current.start();
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert("Your browser do not support audio recording");
      return;
    }

    setIsRecording(true);

    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100, // 44K bitrate
        },
      });

      createRecorder(audio);

      intervalRef.current = setInterval(() => {
        recorder.current?.stop();

        createRecorder(audio);
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  }

  return {
    isRecording,
    stopRecording,
    startRecording,
  };
}
