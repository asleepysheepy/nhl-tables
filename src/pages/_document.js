import { Head, Html, Main, NextScript } from 'next/document'

const Document = () => {
  return (
    <Html className={'h-full bg-neutral-100'} lang={'en'}>
      <Head />
      <body className={'h-full'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}

export default Document
