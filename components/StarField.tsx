"use client"

import { useRef, useState, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import { Points, PointMaterial } from "@react-three/drei"
import { generateRandomSphere } from "@/utils/generateRandomSphere"

export const StarField = () => {
  const ref = useRef()
  const [sphere] = useState(() => generateRandomSphere(5000, 1.5))

  const sizes = useMemo(() => {
    const array = new Float32Array(5000)
    for (let i = 0; i < 5000; i++) {
      array[i] = Math.random() * 0.002 + 0.002
    }
    return array
  }, [])

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10
    ref.current.rotation.y -= delta / 15
    const time = state.clock.getElapsedTime()
    ref.current.material.size = Math.sin(time) * 0.0000000001 + 0.0015
  })

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere.positions} colors={sphere.colors} stride={3} frustumCulled={false}>
        <PointMaterial transparent vertexColors size={0.003} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  )
}

