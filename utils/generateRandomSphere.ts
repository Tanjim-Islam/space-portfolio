export const generateRandomSphere = (count: number, radius: number) => {
  const points = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = radius * Math.cbrt(Math.random())
    const theta = Math.random() * 2 * Math.PI
    const phi = Math.acos(2 * Math.random() - 1)
    const x = r * Math.sin(phi) * Math.cos(theta)
    const y = r * Math.sin(phi) * Math.sin(theta)
    const z = r * Math.cos(phi)
    points[i * 3] = x
    points[i * 3 + 1] = y
    points[i * 3 + 2] = z

    const intensity = Math.random() * 0.3 + 0.7
    colors[i * 3] = intensity
    colors[i * 3 + 1] = intensity
    colors[i * 3 + 2] = intensity
  }
  return { positions: points, colors: colors }
}

