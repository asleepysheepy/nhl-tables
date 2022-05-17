import { teams } from '../../data'
import { useRouter } from 'next/router'

const TeamViewPage = () => {
  const router = useRouter()
  const { team: teamSlug } = router.query

  const team = teams.all.find((t) => t.slug === teamSlug)

  return (
    <team.Logo height={500} width={500} />
  )
}

export default TeamViewPage
