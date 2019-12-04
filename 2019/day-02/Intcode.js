module.exports = class Intcode {
  constructor(memory) {
    this.memory = memory
    this.currentIndex = 0
  }

  processInstruction() {
    const instruction = this.memory.slice(this.currentIndex, this.currentIndex + 4)
    const [opcode, ...params] = instruction

    const firstValue = this.memory[params[0]]
    const secondValue = this.memory[params[1]]

    let result
    if (opcode === 1) {
      result = firstValue + secondValue
    } else if (opcode === 2) {
      result = firstValue * secondValue
    } else {
      console.log(this.memory[0])
      throw new Error('an error has occurred')
    }

    this.memory[params[2]] = result
    this.currentIndex += 4
  }

  run() {
    while (this.memory[this.currentIndex] !== 99) {
      this.processInstruction()
    }
  }

  get output() {
    return this.memory[0]
  }
}