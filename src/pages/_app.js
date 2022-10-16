import '../../styles/globals.css'

import { Navigation } from '../components/navigation'
import { SWRConfig } from 'swr'
import { TeamHeader } from '../components/team-header'
import { useTeam } from '../hooks'

const App = ({ Component, pageProps }) => {
  const team = useTeam()
  const headerClass = team ? `${team.getSlug()}-primary` : 'bg-black text-white'

  // Fetch is a part of the JS language and doesn't need importing
  //Eslint doesn't like this for some reason?
  // eslint-disable-next-line no-undef
  const swrFetchFunction = (url) => fetch(url).then((r) => r.json())

  return (
    <SWRConfig value={{fetcher: swrFetchFunction}}>
      <div className={'min-h-full'}>
        <div className={`${headerClass} pb-32`}>
          <Navigation />
          <TeamHeader />
        </div>
        <main className={'-mt-32'}>
          <div className={'max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'}>
            <div className={'bg-white rounded-lg shadow px-5 py-6 sm:px-6'}>
              <Component {...pageProps} />
            </div>
          </div>
        </main>
      </div>
    </SWRConfig>
  )
}

export default App
