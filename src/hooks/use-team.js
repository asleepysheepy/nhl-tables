import { Team } from '../models'
import { useRouter } from 'next/router'

export const useTeam = () => {
  const router = useRouter()
  const { team: teamSlug } = router.query

  const team = Team.getTeamBySlug(teamSlug)

  return {
    team,
    teamClassName: team ? team.getSlug() : 'neutral',
  }
}
