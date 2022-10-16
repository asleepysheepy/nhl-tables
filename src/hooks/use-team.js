import { Team } from '../models'
import { useRouter } from 'next/router'

const useTeam = () => {
  const router = useRouter()
  const { team: teamSlug } = router.query

  return Team.getTeamBySlug(teamSlug)
}

export { useTeam }
