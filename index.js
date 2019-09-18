const promisify = require('util').promisify
const exec = promisify(require('child_process').exec)
const path = require('path')

const findWithRegex = (array, regex) => {
    return array.reduce((prev, curr) => {
        if (prev) return prev;
        try {
            return curr.match(regex)[1].trim()
        } catch (error) {
            return null;
        }
    }, null)
}

class Pulsemixer {
    constructor(id) {
        this.id = id;
    }
    _exec(args) {
        return exec(`${Pulsemixer.PULSEMIXER_PATH} ${this.id ? '--id ' + this.id : ''} ${args}`)
    }
    mute() {
        return this._exec('--mute')
    }
    unmute() {
        return this._exec('--unmute')
    }
    toggleMute() {
        return this._exec('--toggle-mute')
    }
    getMute() {
        return this._exec('--get-mute')
            .then(({ stdout }) => {
                return !!+stdout.trim()
            })
    }
    changeVolume(volume) {
        return this._exec(`--change-volume ${volume}`)

    }
    setVolume(volume) {
        return this._exec(`--set-volume ${volume}`)
    }
    getVolume() {
        return this._exec(`--get-volume`)
            .then(({ stdout }) => {
                try {
                    return stdout.trim().match(/(\d+)/)[1]
                } catch (error) {
                    throw new Error('Cannot parse volume.')
                }
            })
    }
    static getSinks() {
        return exec('./pulsemixer --list-sinks')
            .then(({ stdout }) => {
                return stdout.split('\n')
                    .map(line => {
                        const data = line.split(',')
                        return {
                            id: findWithRegex(data, /ID:(\s*\d+)/),
                            name: findWithRegex(data, /Name:(.*)/)
                        }
                    })
                    .filter(sink => sink.id)
            })

    }
}
Pulsemixer.PULSEMIXER_PATH = path.resolve(__dirname, 'pulsemixer')

module.exports = Pulsemixer;