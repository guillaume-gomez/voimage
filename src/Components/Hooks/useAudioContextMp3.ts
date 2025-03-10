import { useRef, useEffect } from "react";
import useAudioContext from "../Reducer/useAudioContext";

interface useAudioContextMp3Props {
  frequencySize: number;
  onUpdate: () => void;
}

function useAudioContextMp3({ frequencySize, onUpdate } : useAudioContextMp3Props) {
  const audioRef = useRef();
  const source = useRef();
  const analyzer = useRef();
  const { state: { audio } } = useAudioContext();


  useEffect(() => {
    return () => cancelAnimationFrame(audioRef.current);
  }, []);

  function handleAudioPlay() {
    if(audioRef.current && !audioRef.current.paused) {
      return;
    }
    let audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyzer.current = audioContext.createAnalyser();
    if (!source.current) {
      source.current = audioContext.createMediaElementSource(audio);
      source.current.connect(analyzer.current);
      //analyzer.current.connect(context.destination);

      analyzer.current.fftSize = frequencySize;
      update();
    }
  }

  function update() {
    const audioRef.current = window.requestAnimationFrame(update);
    if (audioRef.current || audioRef.current.paused) {
      return cancelAnimationFrame(audioRef.current);
    }
    const data = new Uint8Array(frequencySize);
    analyzer.current.getByteFrequencyData(data);
    onUpdate(data);
  };

  return { handleAudioPlay };

}

export default useAudioContextMp3;