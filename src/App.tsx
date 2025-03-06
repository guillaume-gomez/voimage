import { useState, useReducer } from 'react';
import AudioPermission from "./Components/AudioPermission";
import ThreeJSRendering from "./Components/ThreeJSRendering";
import InputFileWithPreview from "./Components/InputFileWithPreview";
import useKonamiCode from "./Components/Hooks/useKonamiCode";
import Range from "./Components/Range";
import ColorPicker from "./Components/ColorPicker";
import Mp3Player from "./Components/Mp3Player";
import useAudioContext from "./Components/Reducer/useAudioContext";


import './App.css'

function App() {
  const context = useAudioContext();
  const [count, setCount] = useState(0);
  const [imageBase64, setImageBase64] = useState<string|null>(null);
  const [amplitude, setAmplitude] = useState<number>(1.0);
  const [filter, setFilter] = useState<number>(10.0);
  const [meshSize, setMeshSize] = useState<number>(256);
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [background, setBackground] = useState<string>("#3D3E61");
  const konami = useKonamiCode();

  console.log(context)

  function onChange(imageBase64) {
    setImageBase64(imageBase64);
  }

  return (
    <>
      <h1>{konami ? "KONAMI" : "Vo Image"}</h1>
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Settings</h2>
          <Range
            label="Mesh Size"
            value={meshSize}
            min={16}
            max={256}
            step={1}
            onChange={setMeshSize}
          />
          <Range
            label="Amplitude"
            float
            value={amplitude}
            min={0.1}
            max={2.0}
            step={0.01}
            onChange={setAmplitude}
          />
          <Range
            label="Filter"
            float
            value={filter}
            min={0.0}
            max={255}
            step={0.5}
            onChange={setFilter}
          />
          <ColorPicker
            label="Background color"
            value={background}
            onChange={(value: string) => setBackground(value)}
          />
          <Mp3Player />
          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Wireframe</span>
              <input type="checkbox" className="toggle" checked={wireframe} onChange={() => setWireframe(!wireframe)} />
            </label>
          </div>
        </div>
      </div>
      <InputFileWithPreview onChange={onChange} imageBase64={imageBase64}/>
      {
        !imageBase64 ? 
          <p>Nothing to display</p> :
          <ThreeJSRendering
            backgroundColor={background}
            imageTexture={imageBase64}
            amplitude={amplitude}
            filter={filter}
            meshSize={meshSize}
            wireframe={wireframe}
          />
      }
    </>
  )
}

export default App
