import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useFullscreen } from "rooks";
import { OrbitControls, Stage, GizmoHelper, GizmoViewport } from '@react-three/drei';
import ImageMesh from "./ImageMesh";
import Range from "./Range";


interface ThreejsRenderingProps {
  backgroundColor: string;
  imageTexture: string;
  width: number;
  height: number;
  amplitude: number;
  filter: number;
  meshSize: number;
  wireframe: boolean;
}


function ThreejsRendering({
    backgroundColor,
    imageTexture,
    width,
    height,
    amplitude,
    filter,
    meshSize,
    wireframe
  } : ThreejsRenderingProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toggleFullscreen } = useFullscreen({ target: canvasRef });


  return (
    <div className="flex flex-col gap-5 w-full">
      <Canvas
        camera={{ position: [0, 0.0, 1], fov: 35, far: 5 }}
        dpr={window.devicePixelRatio}
        onDoubleClick={toggleFullscreen}
        ref={canvasRef}
        style={{width, height}}
      >
        <color attach="background" args={[backgroundColor]} />
        <Stage
          intensity={0.5}
          preset="rembrandt"
          shadows={{ type: 'accumulative', color: '#8B7D41', colorBlend: 2, opacity: 1 }}
          >
          <group
            position={[
            0, 0, 0]}
          >
            <ImageMesh
              base64Texture={imageTexture}
              wireframe={wireframe}
              amplitude={amplitude}
              meshSize={meshSize}
              filter={filter}
            />
          </group>
          <OrbitControls minPolarAngle={0} maxPolarAngle={Math.PI / 1.9} makeDefault />
          <GizmoHelper alignment="bottom-right" margin={[50, 50]}>
            <GizmoViewport labelColor="white" axisHeadScale={1} />
          </GizmoHelper>
        </Stage>
      </Canvas>
    </div>
  );
}

export default ThreejsRendering;