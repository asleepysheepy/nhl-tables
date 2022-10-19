import NextLink from 'next/link'

export const Link = ({ children, href, ...restProps }) => {
  return (
    <NextLink href={href} >
      <a {...restProps}>
        {children}
      </a>
    </NextLink>
  )
}
