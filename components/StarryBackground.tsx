import { Canvas } from "@react-three/fiber"
import { StarField } from "./StarField"

export const StarryBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{
          width: "100%",
          height: "100%",
          background: "#030303",
        }}
      >
        <ambientLight intensity={0.5} />
        <StarField />
      </Canvas>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, rgba(255,255,255,0) 0%,rgba(255,255,255,0.03) 100%)`,
          mixBlendMode: "screen",
        }}
      />
    </div>
  )
}

