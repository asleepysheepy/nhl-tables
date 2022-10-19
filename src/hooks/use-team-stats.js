import useSWR from 'swr'
import { TeamStats } from '../models'
import { useTeam } from './use-team'

export const useTeamStats = () => {
  const { team } = useTeam()
  const { data } = useSWR(team ? `https://statsapi.web.nhl.com/api/v1/teams/${team.getId()}?expand=team.stats` : null)
  if (!data) { return }

  return new TeamStats(data.teams[0].teamStats[0].splits[0].stat)
}
