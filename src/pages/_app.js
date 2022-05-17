import { Navigation } from '../components/navigation'
import { teams } from '../data'
import { useRouter } from 'next/router'
import '../../styles/globals.css'

const App = ({ Component, pageProps }) => {
  const router = useRouter()
  const { team: teamSlug } = router.query

  const team = teams.all.find((t) => t.slug === teamSlug)
  const headerText = team ? team.name : 'Hockey Stuff'
  const headerClass = team ? `${team.slug}-primary` : 'bg-black text-white'

  return (
    <div className={'min-h-full'}>
      <div className={`${headerClass} pb-32`}>
        <Navigation />
        <header className={'pb-10 pt-3'}>
          <div className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
            <h1 className={'text-3xl font-bold'}>{headerText}</h1>
          </div>
        </header>
      </div>
      <main className={'-mt-32'}>
        <div className={'max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'}>
          <div className={'bg-white rounded-lg shadow px-5 py-6 sm:px-6'}>
            <Component {...pageProps} />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
