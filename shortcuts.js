class Application {

    constructor() {

        this._platforms = {
            "WINDOWS": {
                name: "Windows",
                modifiers: {
                    control: "ctrl",
                    alt: "alt",
                    shift: "shift"
                }
            },
            "LINUX": {
                name: "Linux",
                modifiers: {
                    control: "ctrl",
                    alt: "alt",
                    shift: "shift",
                }
            },
            "MAC": {
                name: "Mac",
                modifiers: {
                    control: "command",
                    alt: "option",
                    shift: "shift"
                }
            }
        };

        this._os = this.getCurrentPlatform();

        this._keybindings = {
            "Windows": new Map([
                ["?", this.showShortcuts],
                ["alt + m", this.toggleMenu],
                ["alt + t", this.toggleQuickLaunch],
                ["alt + s", this.showShortcuts]
                ]
            )
        };

    }

    showShortcuts() {

        console.log("show the cheat sheet")
    }

    toggleMenu() {
        console.log("toggle the menu");
    }

    toggleQuickLaunch() {
        console.log("toggle quick launch");
    }

    showRecord() {
        console.log("show record");
    }

    getKeyCombination(event) {

        if(this._os === this._platforms.WINDOWS) {

            // Get windows key combinations

            if(event.ctrlKey === true && event.altKey == true)
                return `${this._os.modifiers.control} + ${this._os.modifiers.alt} + ${event.key}`;

            if(event.ctrlKey === true && !event.altKey)
                return `${this._os.modifiers.control} + ${event.key}`;

            if(!event.ctrlKey && event.altKey === true)
                return `${this._os.modifiers.alt} + ${event.key}`;

            return event.key;
        }

        if(this._os === this._platforms.MAC) {

            // Get Mac key combinations
        }

    }

    getCurrentPlatform() {

        if(window.navigator) {

            if(window.navigator.userAgent.indexOf(this._platforms.WINDOWS.name) != -1)
                return this._platforms.WINDOWS;

            if(window.navigator.userAgent.indexOf(this._platforms.LINUX.name) != -1)
                return this._platforms.LINUX;

            if(window.navigator.userAgent.indexOf(this._platforms.MAC.name) != -1)
                return this._platforms.MAC;
        }
    }

    onKeyPressed(e) {

        const combination = this.getKeyCombination(e);
        const mappings = this._keybindings[this._os.name];

        if(mappings && mappings.has(combination)) {

            const action = mappings.get(combination);

            action.call();
        }
    }


}