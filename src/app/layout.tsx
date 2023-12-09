type Props = {
  children: React.ReactNode
}

export default async function Layout({ children }: Props): Promise<React.ReactElement> {
  return (
    <html className={'h-full bg-gray-100'} lang={'en'}>
      <body className={'h-full'}>
        <div className={'min-h-full'}>{children}</div>
      </body>
    </html>
  )
}
