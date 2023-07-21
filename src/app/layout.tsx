import './globals.css'

import Header from './header'
import { fetchTeamsData } from '@/api'

export default async function Layout({ children }: { children: React.ReactNode}) {
  const teams = await fetchTeamsData()

  return (
    <html className={'h-full bg-gray-100'} lang={'en'}>
      <body className={'h-full'}>
        <div className={'min-h-full'}>
          <Header teams={teams} />
          <main className={'-mt-32'}>
            <div className={'max-w-7xl mx-auto pb-12 px-4 sm:px-6 lg:px-8'}>
              <div className={'bg-white rounded-lg shadow px-5 py-6 sm:px-6'}>
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  )
}