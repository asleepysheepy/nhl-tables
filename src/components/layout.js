import { Navigation } from './navigation'
import { TeamHeader } from './team-header'
import { useTeam } from '../hooks'

export const Layout = ({ children }) => {
  const { teamClassName } = useTeam()

  return (
    <div className={'min-h-full'}>
      <div className={`${teamClassName} text-white pb-32`}>
        <Navigation />
        <TeamHeader />
      </div>
      <main className={'-mt-32'}>
        <div className={'max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'}>
          <div className={'bg-white rounded-lg shadow px-5 py-6 sm:px-6'}>
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
