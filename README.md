# node-pulsemixer
Nodejs wrapper for [pulsemixer](https://github.com/GeorgeFilipkin/pulsemixer).
Control system's audio through nodeJS.

### Requirements (for pulsemixer)
- `Python` >= 3
- `PulseAudio` >= 1.0

## Instalation
`npm i pulsemixer`

## Basic Usage
```javascript
const Pulsemixer = require('pulsemixer');

(async function () {
    const pulsemixer = new Pulsemixer(); 

    await pulsemixer.mute()
    await pulsemixer.unmute()
    const volume = await pulsemixer.getVolume();
    await pulsemixer.setVolume(25);
})();
```
## API
### Constructor
```javascript
const pulsemixer = new Pulsemixer();
```
`pulsemixer` will be an interface for the default sink. In other words it will create an interface for the default audio card that is currently running.

```javascript
const pulsemixer = new Pulsemixer(a_sink_id);
```
You can also pass a sink id to control a specific sound card or sound interface.

### Instance methods
|Method|Parameters|Returns|Description|
|:--:|:--:|:-----:|:----------|
|**`mute`**|`-`|`Promise:Void`|Mutes system volume|
|**`unmute`**|`-`|`Promise:Void`|Unmutes system volume|
|**`toggleMute`**|`-`|`Promise:Void`|Toggle mute|
|**`getMute`**|`-`|`Promise:Boolean`|Gets current mute status|
|**`setVolume`**|`{Number}`|`Promise:Void`|Sets system volume|
|**`getVolume`**|`-`|`Promise:Number`|Get current system volume|
|**`changeVolume`**|`{Number}`|`Promise:Void`|Increase or decrease system volume by a number|

### Static methods
Method|Parameters|Returns|Description|
|:--:|:--:|:-----:|:----------|
|**`getSinks`**|`-`|`Promise:Array`|Returns system's available sinks|
```javascript
const Pulsemixer = require('pulsemixer');
Pulsemixer.getSinks()
    .then(sinks => {
        /*
            An array of the available sound cards (sinks)
            Each sink has an `id` and `name`
            id can be used to instantiate a new Pulsemixer
        */
    })
    .catch(err => console.error('ERROR...', err));
```