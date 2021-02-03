let [timestamp, busIds] = require('../../readInput')(__dirname).split('\n')
timestamp = parseInt(timestamp)
busIds = busIds.split(',').filter(it => it !== 'x').map(it => parseInt(it, 10))

function getNearestDepartureTime(busId) {
    let departure = 0
    while (departure < timestamp) {
        departure += busId
    }
    return departure
}

const departureTimes = busIds.map(id => {
    return {
        id,
        departure: getNearestDepartureTime(id)
    }
}).sort((a, b) => (a.departure - b.departure))

const soonestDeparture = departureTimes[0]
const answer = soonestDeparture.id * (soonestDeparture.departure - timestamp)
console.log(answer)
