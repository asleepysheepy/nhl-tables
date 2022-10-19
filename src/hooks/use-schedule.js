import useSWR from 'swr'
import { Game } from '../models'
import { useTeam } from './use-team'

const getScheduleUrl = (team, season) => {
  if (!team) { return null }

  const baseUrl = 'https://statsapi.web.nhl.com/api/v1/schedule'
  const teamParam = `teamId=${team.getId()}`
  const seasonParam = `season=${season}`
  const expandParam = 'expand=schedule.linescore'
  const typeParam = 'gameType=R'

  return `${baseUrl}?${teamParam}&${seasonParam}&${expandParam}&${typeParam}`
}

export const useSchedule = (season) => {
  const { team } = useTeam()

  const teamScheduleUrl = getScheduleUrl(team, season)
  const { data } = useSWR(teamScheduleUrl)

  if (!data) { return }

  const games = data.dates.map((date) => new Game(date.games[0]))

  return games.reduce((gamesObject, game) => {
    const opposingTeamId = game.getOpposingTeam(team).getId()

    if (gamesObject[opposingTeamId]) {
      gamesObject[opposingTeamId].push(game)
    } else {
      gamesObject[opposingTeamId] = [game]
    }

    return gamesObject
  }, {})
}
