import '../../styles/globals.css'

import { Layout } from '../components'
import { SWRConfig } from 'swr'

const App = ({ Component, pageProps }) => {
  // Fetch is a part of the JS language and doesn't need importing
  // Eslint doesn't like this for some reason?
  // eslint-disable-next-line no-undef
  const swrFetchFunction = (url) => fetch(url).then((r) => r.json())

  return (
    <SWRConfig value={{fetcher: swrFetchFunction}}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default App
