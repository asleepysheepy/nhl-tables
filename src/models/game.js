import { Team } from './team'

export class Game {
  constructor(gameData) {
    this._gameData = gameData
  }

  getId() {
    return this._gameData.gamePk
  }

  getFormattedDate() {
    const date = new Date(this._gameData.gameDate)

    return date.toLocaleDateString('en-CA', {
      month: 'short',
      day: '2-digit',
    })
  }

  getHomeTeam() {
    const homeTeamId = this._gameData.teams.home.team.id
    return Team.getTeamById(homeTeamId)
  }

  getAwayTeam() {
    const awayTeamId = this._gameData.teams.away.team.id
    return Team.getTeamById(awayTeamId)
  }

  getOpposingTeam(team) {
    if (this.getAwayTeam().getId() === team.getId()) {
      return this.getHomeTeam()
    } else {
      return this.getAwayTeam()
    }
  }

  isHomeTeam(team) {
    return this.getHomeTeam().getId() === team.getId()
  }

  wasOvertime() {
    return this._gameData.linescore.currentPeriodOrdinal === 'OT'
  }

  wasShootout() {
    return this._gameData.linescore.currentPeriodOrdinal === 'SO'
  }

  isFinal() {
    return this._gameData.linescore.currentPeriodTimeRemaining === 'Final'
  }

  getFinalScore() {
    const homeTeamScore = this._gameData.teams.home.score
    const awayTeamScore = this._gameData.teams.away.score

    let otSuffix = ''
    if (this.wasOvertime()) {
      otSuffix = ' (OT)'
    } else if (this.wasShootout()) {
      otSuffix = ' (SO)'
    }

    return `${homeTeamScore} - ${awayTeamScore}${otSuffix}`
  }

  getWinningTeam() {
    if (!this.isFinal()) {
      return null
    }

    const homeTeamScore = this._gameData.teams.home.score
    const awayTeamScore = this._gameData.teams.away.score

    const didHomeTeamWin = homeTeamScore > awayTeamScore

    if (didHomeTeamWin) {
      return this.getHomeTeam()
    } else {
      return this.getAwayTeam()
    }
  }

  wasWinFor(team) {
    return this.getWinningTeam()?.getId() === team.getId()
  }

  wasLossFor(team) {
    return this.getWinningTeam().getId() !== team.getId()
  }

  wasOvertimeLossFor(team) {
    return this.wasOvertime() && this.wasLossFor(team)
  }

  wasShootoutLossFor(team) {
    return this.wasShootout() && this.wasLossFor(team)
  }
}
