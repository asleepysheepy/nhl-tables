import * as Logos from '../logos'
import { Disclosure } from '@headlessui/react'

const MobileDropdown = () => {
  const teams = [
    { name: 'Anaheim Ducks', Logo: Logos.AnaheimDucksLogo },
    { name: 'Arizona Coyotes', Logo: Logos.ArizonaCoyotesLogo },
    { name: 'Boston Bruins', Logo: Logos.BostonBruinsLogo },
    { name: 'Buffalo Sabres', Logo: Logos.BuffaloSabresLogo },
    { name: 'Calgary Flames', Logo: Logos.CalgaryFlamesLogo },
    { name: 'Carolina Hurricanes', Logo: Logos.CarolinaHurricanesLogo },
    { name: 'Chicago Blackhawks', Logo: Logos.ChicagoBlackhawksLogo },
    { name: 'Colorado Avalanche', Logo: Logos.ColoradoAvalancheLogo },
    { name: 'Columbus Blue Jackets', Logo: Logos.ColumbusBlueJacketsLogo },
    { name: 'Dallas Stars', Logo: Logos.DallasStarsLogo },
    { name: 'Detroit Red Wings', Logo: Logos.DetroitRedWingsLogo },
    { name: 'Edmonton Oilers', Logo: Logos.EdmontonOilersLogo },
    { name: 'Florida Panthers', Logo: Logos.FloridaPanthersLogo },
    { name: 'Los Angeles Kings', Logo: Logos.LosAngelesKingsLogo },
    { name: 'Minnesota Wild', Logo: Logos.MinnesotaWildLogo },
    { name: 'Montreal Canadiens', Logo: Logos.MontrealCanadiensLogo },
    { name: 'Nashville Predators', Logo: Logos.NashvillePredatorsLogo },
    { name: 'New Jersey Devils', Logo: Logos.NewJerseyDevilsLogo },
    { name: 'New York Islanders', Logo: Logos.NewYorkIslandersLogo },
    { name: 'New York Rangers', Logo: Logos.NewYorkRangersLogo },
    { name: 'Ottawa Senators', Logo: Logos.OttawaSenatorsLogo },
    { name: 'Philadelphia Flyers', Logo: Logos.PhiladelphiaFlyersLogo },
    { name: 'Pittsburgh Penguins', Logo: Logos.PittsburghPenguinsLogo },
    { name: 'San Jose Sharks', Logo: Logos.SanJoseSharksLogo },
    { name: 'Seattle Kraken', Logo: Logos.SeattleKrakenLogo },
    { name: 'St. Louis Blues', Logo: Logos.StLouisBluesLogo },
    { name: 'Tampa Bay Lightning', Logo: Logos.TampaBayLightningLogo },
    { name: 'Toronto Maple Leafs', Logo: Logos.TorontoMapleLeafsLogo },
    { name: 'Vancouver Canucks', Logo: Logos.VancouverCanucksLogo },
    { name: 'Vegas Golden Knights', Logo: Logos.VegasGoldenKnightsLogo },
    { name: 'Washington Capitals', Logo: Logos.WashingtonCapitalsLogo },
    { name: 'Winnipeg Jets', Logo: Logos.WinnipegJetsLogo },
  ]

  return (
    <Disclosure.Panel className={'border-b border-neutral-700 md:hidden'}>
      <div className={'px-2 py-3 space-y-1 sm:px-3'}>
        {teams.map(({ name, Logo }) => (
          <a className={'text-neutral-300 group flex items-center px-4 py-2'} href={'/'} key={name}>
            <Logo height={30} width={30} />
            <span className={'ml-3'}>{name}</span>
          </a>
        ))}
      </div>
    </Disclosure.Panel>
  )
}

export { MobileDropdown }
