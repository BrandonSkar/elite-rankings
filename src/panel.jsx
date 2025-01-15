import React from 'react';
import ReactDOM from 'react-dom/client';
import ViewerPage from "./viewerPage.jsx";
import { loadTwitchConfig } from './loadTwitchConfig.js';

window.addEventListener("DOMContentLoaded", async () => {
    const twitchConfig = await loadTwitchConfig();
    const url = `https://fhx6gb34z2.execute-api.us-east-2.amazonaws.com/default/the-elite?playerAlias=${twitchConfig.playerAlias}`;
    const data = await fetch(url).then((res) => res.json())

    const playerData = data.data.players[0];
    let defaultGame = null;
    if (playerData.plays_ge)
        defaultGame = "GE";
    else if (playerData.plays_pd)
        defaultGame = "PD";

    ReactDOM.createRoot(document.getElementById('root')).render(
        <React.StrictMode>
            <ViewerPage data={playerData} defaultGame={defaultGame}/>
        </React.StrictMode>
    )
});


// const fetchGameName = async (channelId, clientId, accessToken) => {
//     const url = `https://api.twitch.tv/helix/streams?user_id=${channelId}`;
//     const headers = {
//         'Client-ID': clientId,
//         'Authorization': `Bearer ${accessToken}`
//     };

//     const response = await fetch(url, { headers });
//     const data = await response.json();
//     return data.data[0]?.game_name || null;
// };

// window.addEventListener("DOMContentLoaded", async () => {
//     const twitchConfig = await loadTwitchConfig();

//     Twitch.ext.onAuthorized(async (auth) => {
//         const {clientId, channelId, token} = auth;

//         const gameName = await fetchGameName(channelId, clientId, token);

//         let currentStream = null;
//         if (gameName === "GoldenEye 007") {
//             currentStream = "GE";
//         } else if (gameName === "Perfect Dark") {
//             currentStream = "PD";
//         }

//         const url = `https://fhx6gb34z2.execute-api.us-east-2.amazonaws.com/default/the-elite?playerAlias=${twitchConfig.playerAlias}`;
//         const data = await fetch(url).then((res) => res.json())

//         const playerData = data.players[0];
//         let defaultGame = null;
//         if (playerData.plays_ge === true) defaultGame = "GE";
//         else if (playerData.plays_pd === true) defaultGame = "PD";
        
//         if (currentStream === "GE" && defaultGame === "GE") defaultGame = "GE";
//         else if (currentStream === "PD" && defaultGame === "PD") defaultGame = "PD";

//         ReactDOM.createRoot(document.getElementById('root')).render(
//             <React.StrictMode>
//                 <ViewerPage data={playerData} defaultGame={defaultGame} />
//             </React.StrictMode>
//         )
//     })
// });

