/** biome-ignore-all lint/suspicious/noConsole: dev */
import { useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'

type RoomParams = {
  roomId: string
}

const isRecordingSupported =
  Boolean(navigator.mediaDevices) &&
  typeof navigator.mediaDevices.getUserMedia === 'function' &&
  typeof window.MediaRecorder === 'function'

export function RecordRoomAudioPage() {
  const params = useParams<RoomParams>()

  const [isRecording, setIsRecording] = useState(false)
  const recorder = useRef<MediaRecorder | null>(null)

  const intervalRef = useRef<NodeJS.Timeout>(null)

  function stopRecording() {
    setIsRecording(false)

    if (recorder.current && recorder.current.state !== 'inactive') {
      recorder.current.stop()
    }

    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  async function uploadAudio(audio: Blob) {
    const formData = new FormData()

    formData.append('file', audio, 'audio.webm')

    await fetch(`http://localhost:3333/rooms/${params.roomId}/audio`, {
      method: 'POST',
      body: formData,
    })
  }

  function createRecorder(audio: MediaStream) {
    recorder.current = new MediaRecorder(audio, {
      mimeType: 'audio/webm',
      audioBitsPerSecond: 64_000,
    })

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data)
      }
    }

    // For development:
    // recorder.current.onstart = () => {
    //   console.log('Recording started')
    // }

    // recorder.current.onstop = () => {
    //   console.log('Recording stopped')
    // }

    recorder.current.start()
  }

  async function startRecording() {
    if (!isRecordingSupported) {
      alert('Your browser do not support audio recording')
      return
    }

    setIsRecording(true)

    try {
      const audio = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44_100, // 44K bitrate
        },
      })

      createRecorder(audio)

      intervalRef.current = setInterval(() => {
        recorder.current?.stop()

        createRecorder(audio)
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  if (!params.roomId) {
    return <Navigate replace to="/" />
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <>
          <Button onClick={stopRecording}>Stop Recording</Button>
          <p>Recording...</p>
        </>
      ) : (
        <>
          <Button onClick={startRecording}>Record audio</Button>
          <p>Paused</p>
        </>
      )}
    </div>
  )
}
