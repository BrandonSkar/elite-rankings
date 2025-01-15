import {loadTwitchConfig, twitch} from "./loadTwitchConfig";

let twitchConfig = {};
loadTwitchConfig()
    .then((config) => {
        if(config instanceof Object && !Array.isArray(config)) {
            twitchConfig = config
        }
    })

function saveTwitchConfig() {
    twitch.configuration.set("broadcaster", "1", JSON.stringify(twitchConfig))
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById('submitBtn').addEventListener('click', async function () {
        const playerAlias = document.getElementById('playerAlias').value;
        twitchConfig.playerAlias = playerAlias;
        saveTwitchConfig();
        data = (await fetchPlayerData(playerAlias)).data
        document.getElementById('fail').innerHTML = "";
        document.getElementById('success').innerHTML = "";
        if (Array.isArray(data.players) && data.players.length === 0){
            document.getElementById('fail').innerHTML = `No data found for ${playerAlias}`;
        } else {
            document.getElementById('success').innerHTML = `Data found for ${data.players[0]?.alias}`;
        }
    });
})

const fetchPlayerData = async (playerAlias) => {
    if (playerAlias) {
        playerAliasLastCall = Date.now();
        const url = `https://fhx6gb34z2.execute-api.us-east-2.amazonaws.com/default/the-elite?playerAlias=${playerAlias}`;
        return await fetch(url)
            .then((res) => res.json());
    }
};
