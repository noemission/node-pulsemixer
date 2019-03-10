const Pulsemixer = require('./index');

Pulsemixer.getSinks()
    .then(sinks => {
        sinks.forEach(({ id, name }) => {
            new Pulsemixer(id).getVolume()
                .then(vol => console.log(`Sink with id ${id} and name ${name} has ${vol} volume`))
        })
    })
    .catch(err => console.error('ERROR...', err));



const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async function () {

    const pulsemixer = new Pulsemixer();

    console.log('Muting') || await pulsemixer.mute()

    console.log('Waiting 2s') || await sleep(2000)

    console.log('Unmuting') || await pulsemixer.unmute()

    console.log('Waiting 2s') || await sleep(2000)

    console.log('Toggling mute') || await pulsemixer.toggleMute()

    console.log('Waiting 2s') || await sleep(2000)

    console.log('Toggling mute') || await pulsemixer.toggleMute()

    console.log('Waiting 2s') || await sleep(2000)

    console.log('Setting volume to 25') || await pulsemixer.setVolume(25)
    await sleep(1000)
    console.log('Volume:', await pulsemixer.getVolume())

    console.log('Waiting 2s') || await sleep(2000)

    console.log('Changing volume by 5') || await pulsemixer.changeVolume(5)
    await sleep(1000)
    console.log('Volume:', await pulsemixer.getVolume())

    console.log('Changing volume by -5') || await pulsemixer.changeVolume(-5)
    await sleep(1000)
    console.log('Volume:', await pulsemixer.getVolume())

})();