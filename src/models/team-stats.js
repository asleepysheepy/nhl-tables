export class TeamStats {
  constructor(stats) {
    this._stats = stats
  }

  getRecord() {
    return `${this._stats.wins} - ${this._stats.losses} - ${this._stats.ot}`
  }

  getGamesPlayed() {
    return this._stats.gamesPlayed
  }

  getPointsPercentage() {
    return Math.round(this._stats.ptPctg)
  }
}
