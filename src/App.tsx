import { useState } from 'react';
import AudioPermission from "./Components/AudioPermission";
import ThreeJSRendering from "./Components/ThreeJSRendering";
import InputFileWithPreview from "./Components/InputFileWithPreview";
import useKonamiCode from "./Components/Hooks/useKonamiCode";
import Range from "./Components/Range";
import ColorPicker from "./Components/ColorPicker";
import Mp3Player from "./Components/Mp3Player";
import Card from "./Components/Card";
import AppContextProvider from "./Components/Reducer/AudioReducer";

function App() {
  const [imageBase64, setImageBase64] = useState<string|null>(null);
  const [amplitude, setAmplitude] = useState<number>(1.0);
  const [filter, setFilter] = useState<number>(10.0);
  const [meshSize, setMeshSize] = useState<number>(256);
  const [wireframe, setWireframe] = useState<boolean>(true);
  const [background, setBackground] = useState<string>("#000000");
  const konami = useKonamiCode();

  
  function onChange(imageBase64: string) {
    setImageBase64(imageBase64);
  }

  return (
    <div className="animate-gradient bg-[length:200%_200%] min-h-screen h-full bg-radial-[at_50%_50%] from-zinc-700 to-zinc-900 to-55%">
      <div className="container m-auto flex flex-col gap-5">
        <h1 className="p-2 text-4xl font-title">{konami ? "KONAMI" : "Vo Image"}</h1>
        <Card title="Settings">
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
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text">Wireframe</span>
                <input type="checkbox" className="toggle toggle-primary" checked={wireframe} onChange={() => setWireframe(!wireframe)} />
              </label>
            </div>
        </Card>
        <AppContextProvider>
          <div className="flex flex-col gap-5">
            <Card title="Sound settings">
              <div>
                <div className="flex flex-row items-center gap-4">
                  <Mp3Player />
                  OR 
                  <AudioPermission />
                </div>
                <InputFileWithPreview
                    onChange={onChange}
                    imageBase64={imageBase64}
                />
              </div>
            </Card>
            {
              !imageBase64 ? 
                <div className="flex flex-col gap-5 items-center">
                  <span className="loading loading-bars w-16 text-primary"></span>
                  <span>render explanation</span>
                </div> :
                <ThreeJSRendering
                  backgroundColor={background}
                  imageTexture={imageBase64}
                  amplitude={amplitude}
                  filter={filter}
                  meshSize={meshSize}
                  wireframe={wireframe}
                />
            }
          </div>
        </AppContextProvider>
      </div>
    </div>
  )
}

export default App
