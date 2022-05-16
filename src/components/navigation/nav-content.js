import * as Logos from '../logos'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { Menu } from '@headlessui/react'
import { NavDropdown } from './nav-dropdpwn'

const NavContent = () => {
  const teams = {
    pacific: [
      { name: 'Anaheim Ducks', Logo: Logos.AnaheimDucksLogo },
      { name: 'Calgary Flames', Logo: Logos.CalgaryFlamesLogo },
      { name: 'Edmonton Oilers', Logo: Logos.EdmontonOilersLogo },
      { name: 'Los Angeles Kings', Logo: Logos.LosAngelesKingsLogo },
      { name: 'San Jose Sharks', Logo: Logos.SanJoseSharksLogo },
      { name: 'Seattle Kraken', Logo: Logos.SeattleKrakenLogo },
      { name: 'Vancouver Canucks', Logo: Logos.VancouverCanucksLogo },
      { name: 'Vegas Golden Knights', Logo: Logos.VegasGoldenKnightsLogo },
    ],
    central: [
      { name: 'Arizona Coyotes', Logo: Logos.ArizonaCoyotesLogo },
      { name: 'Chicago Blackhawks', Logo: Logos.ChicagoBlackhawksLogo },
      { name: 'Colorado Avalanche', Logo: Logos.ColoradoAvalancheLogo },
      { name: 'Dallas Stars', Logo: Logos.DallasStarsLogo },
      { name: 'Minnesota Wild', Logo: Logos.MinnesotaWildLogo },
      { name: 'Nashville Predators', Logo: Logos.NashvillePredatorsLogo },
      { name: 'St. Louis Blues', Logo: Logos.StLouisBluesLogo },
      { name: 'Winnipeg Jets', Logo: Logos.WinnipegJetsLogo },
    ],
    metropolitan: [
      { name: 'Carolina Hurricanes', Logo: Logos.CarolinaHurricanesLogo },
      { name: 'Columbus Blue Jackets', Logo: Logos.ColumbusBlueJacketsLogo },
      { name: 'New Jersey Devils', Logo: Logos.NewJerseyDevilsLogo },
      { name: 'New York Islanders', Logo: Logos.NewYorkIslandersLogo },
      { name: 'New York Rangers', Logo: Logos.NewYorkRangersLogo },
      { name: 'Philadelphia Flyers', Logo: Logos.PhiladelphiaFlyersLogo },
      { name: 'Pittsburgh Penguins', Logo: Logos.PittsburghPenguinsLogo },
      { name: 'Washington Capitals', Logo: Logos.WashingtonCapitalsLogo },
    ],
    atlantic: [
      { name: 'Boston Bruins', Logo: Logos.BostonBruinsLogo },
      { name: 'Buffalo Sabres', Logo: Logos.BuffaloSabresLogo },
      { name: 'Detroit Red Wings', Logo: Logos.DetroitRedWingsLogo },
      { name: 'Florida Panthers', Logo: Logos.FloridaPanthersLogo },
      { name: 'Montreal Canadiens', Logo: Logos.MontrealCanadiensLogo },
      { name: 'Ottawa Senators', Logo: Logos.OttawaSenatorsLogo },
      { name: 'Tampa Bay Lightning', Logo: Logos.TampaBayLightningLogo },
      { name: 'Toronto Maple Leafs', Logo: Logos.TorontoMapleLeafsLogo },
    ],
  }

  return (
    <div className={'ml-10 flex items-baseline space-x-4'}>
      {Object.keys(teams).map((division) => (
        <Menu as={'div'} className={'relative inline-block text-left'} key={division}>
          <div>
            <Menu.Button className={'inline-flex justify-center w-full px-4 py-2 font-medium text-neutral-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-500 focus:ring-neutral-200'}>
              {division.charAt(0).toUpperCase() + division.slice(1)}
              <ChevronDownIcon aria-hidden={'true'} className={'-mr-1 ml-2 h-5 w-5'} />
            </Menu.Button>
          </div>
          <NavDropdown teams={teams[division]} />
        </Menu>
      ))}
    </div>
  )
}

export { NavContent }
