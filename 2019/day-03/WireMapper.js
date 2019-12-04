module.exports = class WireMapper {
  constructor(opts) {
    this.wires = opts.wires
    this.wireMap = []
    this.intersectingCoordinates = new Set()
  }

  // method takes two arrays as parameters where each array is an x/y pair of Cartesian coordinates
  // it returns the distance between the points using the Manhattan distance measurement
  getManhattanDistanceBetweenCoordinates([px, py], [qx, qy]) {
    return Math.abs(px - qx) + Math.abs(py - qy)
  }

  mapWireCoordinates(wire) {
    let currentCoordinates = [0, 0]
    this.wireMap.push(new Set())
    const lastIndex = this.wireMap.length - 1
    let wireCopy = [...wire]

    while (wireCopy.length > 0) {
      const instruction = wireCopy.shift()
      const [dir, num] = this.parseWireInstruction(instruction)

      for (let i = 0; i < num; i++) {
        currentCoordinates = this.getNextCoordinate(currentCoordinates, dir)
        const strCoords = currentCoordinates.join('.')
        this.wireMap[lastIndex].add(strCoords)

        for (let j = 0; j < lastIndex; j++) {
          if (this.wireMap[j].has(strCoords)) {
            this.intersectingCoordinates.add(strCoords)
          }
        }
      }
    }
  }

  getNextCoordinate([x, y], dir) {
    switch (dir) {
      case 'U':
        y += 1
        break
      case 'D':
        y -= 1
        break
      case 'R':
        x += 1
        break
      case 'L':
        x -= 1
        break
    }

    return [x, y]
  }

  parseWireInstruction(str) {
    const dir = str.charAt(0)
    const num = parseInt(str.substring(1), 10)
    return [dir, num]
  }

  run() {
    this.wires.forEach(wire => {
      this.mapWireCoordinates(wire)
    })
    
    let intersecting = Array.from(this.intersectingCoordinates)
    let shortestDistance = Infinity
    const originPortCoordinates = [0, 0]

    intersecting.forEach(coord => {
      const xy = coord.split('.').map(it => parseInt(it))
      const distance = this.getManhattanDistanceBetweenCoordinates(originPortCoordinates, xy)
      if (distance < shortestDistance) {
        shortestDistance = distance
      }
    })

    return shortestDistance
  }
}