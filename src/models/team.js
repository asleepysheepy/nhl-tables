import { teamsData } from '../data'

export class Team {
  constructor(teamData) {
    this._teamData = teamData
  }

  getId() {
    return this._teamData.nhlId
  }

  getAbbreviation() {
    return this._teamData.abbreviation
  }

  getName() {
    return this._teamData.name
  }

  getSlug() {
    return this._teamData.slug
  }

  getConference() {
    return this._teamData.conference
  }

  getDivision() {
    return this._teamData.division
  }

  static getTeams() {
    return teamsData.map((team) => new Team(team))
  }

  static getTeamById(id) {
    // eslint-disable-next-line eqeqeq
    return Team.getTeams().find((team) => team.getId() == id)
  }

  static getTeamBySlug(slug) {
    return Team.getTeams().find((team) => team.getSlug() === slug)
  }
}
