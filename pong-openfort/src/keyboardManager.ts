export class KeyboardManager {
    static keys: {[key: string]: boolean} = {}

    constructor() {
        document.addEventListener('keydown', this._handleKeyDown)
        document.addEventListener('keyup', this._handleKeyUp)
    }

    destructor() {
        document.removeEventListener('keydown', this._handleKeyDown)
        document.removeEventListener('keyup', this._handleKeyUp)
    }

    private _handleKeyDown(e: KeyboardEvent) {
        if (!e.repeat) {
            KeyboardManager.keys[e.key] = true;
            // console.log(e.key)
        }
    }
    private _handleKeyUp(e: KeyboardEvent) {
        KeyboardManager.keys[e.key] = false;
    }

    static isKeyPressed(key: string) {
        return KeyboardManager.keys[key]
    }


}