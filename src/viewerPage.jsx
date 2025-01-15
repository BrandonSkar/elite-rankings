import React, {useState} from 'react';

function ViewerPage({data, defaultGame}) {
    const [selectedView, setSelectedView] = useState(defaultGame)

    return (
        <div className="panel-body">
            {data.plays_ge && data.plays_pd && (
                <div className="tabs-container">
                    <div
                        className={selectedView === "GE" ? "selected-tab tab" : "tab"}
                        onClick={() => setSelectedView("GE")}
                    >
                        <div className="ge-tab">
                            GoldenEye 007
                        </div>
                    </div>

                    <div
                        className={selectedView === "PD" ? "selected-tab tab" : "tab"}
                        onClick={() => setSelectedView("PD")}
                    >
                        <div className="pd-tab">
                            Perfect Dark
                        </div>
                    </div>
                </div>
            )}
            
            <div className="data-container">
                <div className="data-panel" onClick={() => window.open(`https://rankings.the-elite.net/~${data.alias}/${selectedView === "GE" ? "goldeneye" : "perfect-dark"}`, '_blank')}>
                    <div className="icon-container">
                        <div className="icon">
                            <img src={`assets/images/${selectedView === "GE" ? "ge-crosshair.png" : "pd-crosshair.png"}`} />
                        </div>
                    </div>

                    <div className="left-container">
                        <div>
                            <div className="game-name">
                                <div>{selectedView === "GE" ? "GoldenEye" : "Perfect Dark"}</div>
                            </div>
                            <div className="record-type">
                                <div>point rank</div>
                            </div>
                        </div>
                    </div>

                    <div className="right-container">
                        <div>
                            <div className="rank">{selectedView === "GE" ? numberToRank(data.rankings_data.ge.points_rank) : numberToRank(data.rankings_data.pd.points_rank)}</div>
                            <div className="rank-description">with <span className="yellow-font">{selectedView === "GE" ? data.rankings_data.ge.points_total : data.rankings_data.pd.points_total}</span> points</div>
                        </div>
                    </div>
                </div>

                <div className="data-panel" onClick={() => window.open(`https://rankings.the-elite.net/~${data.alias}/${selectedView === "GE" ? "goldeneye" : "perfect-dark"}`, '_blank')}>
                    <div className="icon-container">
                        <div className="icon">
                            <img src={`assets/images/${selectedView === "GE" ? "ge-crosshair.png" : "pd-crosshair.png"}`} />
                        </div>
                    </div>

                    <div className="left-container">
                        <div>
                            <div className="game-name">
                                <div>{selectedView === "GE" ? "GoldenEye" : "Perfect Dark"}</div>
                            </div>
                            <div className="record-type">
                                <div>time rank</div>
                            </div>
                        </div>
                    </div>

                    <div className="right-container">
                        <div>
                            <div className="rank">{selectedView === "GE" ? numberToRank(data.rankings_data.ge.time_rank) : numberToRank(data.rankings_data.pd.time_rank)}</div>
                            <div className="rank-description">with <span className="yellow-font">{selectedView === "GE" ? formatTime(data.rankings_data.ge.time_total) : formatTime(data.rankings_data.pd.time_total)}</span></div>
                        </div>
                    </div>
                </div>

                <div className="data-panel" onClick={() => window.open(`https://rankings.the-elite.net/~${data.alias}/${selectedView === "GE" ? "goldeneye" : "perfect-dark"}`, '_blank')}>
                    <div className="icon-container">
                        <div className="icon">
                            <img src={`assets/images/${selectedView === "GE" ? "ge-crosshair.png" : "pd-crosshair.png"}`} />
                        </div>
                    </div>

                    <div className="left-container">
                        <div>
                            <div className="game-name">
                                <div>{selectedView === "GE" ? "GoldenEye" : "Perfect Dark"}</div>
                            </div>
                            <div className="record-type">
                                <div>sum of ranks</div>
                            </div>
                        </div>
                    </div>

                    <div className="right-container">
                        <div>
                            <div className="rank">{selectedView === "GE" ? numberToRank(data.rankings_data.ge.sum_average_rank) : numberToRank(data.rankings_data.pd.sum_average_rank)}</div>
                            <div className="rank-description">with <span className="yellow-font">{selectedView === "GE" ? data.rankings_data.ge.sum_total : data.rankings_data.pd.sum_total}</span></div>
                        </div>
                    </div>
                </div>

                <div className="data-panel" onClick={() => window.open(`https://rankings.the-elite.net/~${data.alias}/${selectedView === "GE" ? "goldeneye" : "perfect-dark"}`, '_blank')}>
                    <div className="icon-container">
                        <div className="icon">
                            <img src={`assets/images/${selectedView === "GE" ? "ge-crosshair.png" : "pd-crosshair.png"}`} />
                        </div>
                    </div>

                    <div className="left-container">
                        <div>
                            <div className="game-name">
                                <div>{selectedView === "GE" ? "GoldenEye" : "Perfect Dark"}</div>
                            </div>
                            <div className="record-type">
                                <div>average rank</div>
                            </div>
                        </div>
                    </div>

                    <div className="right-container">
                        <div>
                            <div className="rank">{selectedView === "GE" ? numberToRank(data.rankings_data.ge.sum_average_rank) : numberToRank(data.rankings_data.pd.sum_average_rank)}</div>
                            <div className="rank-description">with <span className="yellow-font">{selectedView === "GE" ? data.rankings_data.ge.average_total : data.rankings_data.pd.average_total}</span></div>
                        </div>
                    </div>
                </div>

            </div>
            <script src="https://extension-files.twitch.tv/helper/v1/twitch-ext.min.js"></script>
        </div>
    );
}

export default ViewerPage;

const formatTime = (seconds) => {
    // Calculate hours
    let hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600; // Remaining seconds after extracting hours

    // Calculate minutes
    let minutes = Math.floor(seconds / 60);

    // Calculate remaining seconds
    let remainingSeconds = seconds % 60;
    let fullSeconds = Math.floor(remainingSeconds);

    // Format the output
    let formattedHours = hours.toString();
    let formattedMinutes = minutes.toString().padStart(2, '0');
    let formattedSeconds = fullSeconds.toString().padStart(2, '0');

    // Return the formatted string in h:mm:ss format
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const numberToRank = (num) => {
    if (!num || Number.isNaN(num)) return "";

    let suffix;
    const digit0 = String(num).at(-1);
    const digit1 = String(num).at(-2) ?? "0";
    if (digit1 === "1" || digit0 === "0" || Number(digit0) > 3) {
        suffix = "th";
    } else if (digit0 === "1") {
        suffix = "st";
    } else if (digit0 === "2") {
        suffix = "nd";
    } else if (digit0 === "3") {
        suffix = "rd";
    }

    return `${num}${suffix}`;
};