export const TeamColorKey = ({ teamClassName, labelText }) => {
  return (
    <div className={'flex flex-col justify-center'}>
      <div className={'w-48 text-md font-medium text-center mb-2'}>{labelText}</div>
      <div className={'flex'}>
        <p className={`${teamClassName}-primary border-l w-16 text-sm text-center border-y border-gray-400`}>
          Win
        </p>
        <p className={`${teamClassName}-secondary border-x w-16 text-sm text-center border-y border-gray-400`}>
          OTL
        </p>
        <p className={`${teamClassName}-tertiary border-r w-16 text-sm text-center border-y border-gray-400`}>
          Loss
        </p>
      </div>
    </div>
  )
}
