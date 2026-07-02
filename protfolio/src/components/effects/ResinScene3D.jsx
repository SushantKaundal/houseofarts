import { useRef, useMemo } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, MeshDistortMaterial } from "@react-three/drei"

function ResinBlob({ position, color, scale, speed }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.15
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <MeshDistortMaterial
          color={color}
          transparent
          opacity={0.55}
          distort={0.35}
          speed={2}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  const blobs = useMemo(
    () => [
      { position: [-3, 1.5, -2], color: "#E8B4C8", scale: 0.7, speed: 1.2 },
      { position: [3.5, -1, -3], color: "#7EB8DA", scale: 0.9, speed: 0.9 },
      { position: [-2, -2, -1], color: "#C4B5D9", scale: 0.5, speed: 1.5 },
      { position: [2, 2.5, -2.5], color: "#E3C58E", scale: 0.4, speed: 1.1 },
      { position: [0, 0, -4], color: "#F5DDE6", scale: 1.1, speed: 0.7 },
    ],
    []
  )

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} color="#fff8f0" />
      <pointLight position={[-3, 2, 2]} intensity={0.4} color="#E8B4C8" />
      {blobs.map((blob, i) => (
        <ResinBlob key={i} {...blob} />
      ))}
    </>
  )
}

/**
 * Subtle 3D floating resin blobs — hidden on mobile for performance.
 */
export default function ResinScene3D({ className = "" }) {
  return (
    <div className={`pointer-events-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
