export const twitch = window.Twitch.ext;

export function loadTwitchConfig() {
    return new Promise((res, rej) => {
        // when the config changes, update the panel! 
        twitch.configuration.onChanged(function () {
            if (twitch.configuration.broadcaster) {
                try {
                    var config = JSON.parse(twitch.configuration.broadcaster.content)
                    if (typeof config === "object") {
                        res(config)
                    } else {
                        rej()
                    }
                } catch (e) {
                    rej()
                }
            }
        })
    })
}
