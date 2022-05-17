import { Navigation } from '../components/navigation'
import '../../styles/globals.css'

const App = ({ Component, pageProps }) => {
  return (
    <div className={'min-h-full'}>
      <div className={'bg-neutral-900 pb-32'}>
        <Navigation />
        <header className={'py-10'}>
          <div className={'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
            <h1 className={'text-3xl font-bold text-white'}>Something About Hockey</h1>
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
