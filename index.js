import clc from 'cli-color'

process.stdout.write(clc.reset);

class Bot {

    var = {};
    haveGold = false;

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    move(direction) {
        switch (direction) {
            case 'left':
                this.x--
                break
            case 'top':
                this.y++
                break
            case 'right':
                this.x++
                break
            case 'bottom':
                this.y--
                break
            default:
                throw Error('undefined direction')
        }
    }

    interact(entityCode) {
        switch (entityCode) {
            case code.lift:
                console.log('Бот поехал на лифте')
                break
            case code.dock:
                if (this.haveGold) {
                    console.log('Бот отгрузил золото')
                } else {
                    console.log('У бота нет золота для отгрузки')
                }
                break
            default:
                throw Error('undefined entityCode')
        }
    }

    take(entityCode) {
        if (entityCode === code.gold) {
            this.haveGold = true
            console.log('Бот взял золото')
        } else {
            throw Error('undefined entityCode')
        }
    }

    put() {
        this.haveGold = false
        console.log('Бот выложил золото')
    }

    bag() {
        return this.haveGold
    }
}

const code = {
    empty: 0,
    wall: 1,
    lift: 2,
    dock: 3,
    gold: 4,
    respawn: 5,
    fog: 9,
    routeSuccess: 'success',
    routeFinished: 'finished',
    routeFail: 'fail',
};

// let map = createMap(width, height);
let map = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,9,1,],
    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,],
];

// map = putCharge(map, 7, 7, 1, -2)

printMap(map)

function createMap(width, height) {
    let map = [];

    for (let x = 0; x < width; x++) {
        map[x] = [];

        for (let y = 0; y < height; y++) {
            map[x][y] = code.empty;

            if (x === 0 || x === width - 1 || y === 0 || y === height - 1) {
                map[x][y] = code.wall;
            }
        }
    }

    return map
}

function putCharge(map, x, y, size, charge) {
    let width = map.length
    let height = map[0].length
    let minX = x - size
    let maxX = x + size
    let minY = y - size
    let maxY = y + size

    //добавить проверку чтоб нельзя было выйти за размеры карты
    for (let pointX = minX; pointX <= maxX; pointX++) {
        for (let pointY = minY; pointY <= maxY; pointY++) {
            if (pointX < 0 || pointY < 0 || pointX > width - 1 || pointY > height - 1) continue;

            let resultCharge = Math.abs(charge) - calcCharge(x, y, pointX, pointY);

            if (charge > 0) {
                map[pointX][pointY] += resultCharge
            } else {
                map[pointX][pointY] -= resultCharge
            }
        }
    }

    return map
}

function calcCharge(x, y, pointX, pointY) {
    return Math.ceil(Math.hypot(x - pointX, y - pointY))
}

function printMap(map) {
    let width = map.length
    let height = map[0].length

    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            let value = map[x][y];

            if (value === code.wall) {
                value = clc.red(value)
            }
            if (x === 2 && y === 2) {
                value = clc.bold.green(value)
            }
            if (value > 1) {
                // value = clc.cyanBright(value)
            }

            process.stdout.write(value + ' ')
        }

        console.log('')
    }
}
