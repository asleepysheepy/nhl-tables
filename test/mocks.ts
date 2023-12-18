import { faker } from '@faker-js/faker'
import { type Game, type Team } from '@/models'

export function createMockTeam(overrides: Partial<Team> = {}): Team {
  const cityName = faker.location.city()

  return {
    teamId: faker.number.int({ min: 1000, max: 9999 }),
    franchiseId: faker.number.int({ min: 1000, max: 9999 }),
    conferenceName: faker.location.cardinalDirection(),
    divisionName: faker.location.ordinalDirection(),
    name: `${cityName} ${faker.animal.bird()}`,
    abbreviation: cityName.substring(0, 4),
    logo: {
      id: faker.number.int({ min: 1000, max: 9999 }),
      url: faker.image.url(),
    },
    darkLogo: {
      id: faker.number.int({ min: 1000, max: 9999 }),
      url: faker.image.url(),
    },
    ...overrides,
  }
}

export function createMockGame(overrides: Partial<Game> = {}): Game {
  const awayTeam = createMockTeam()
  const homeTeam = createMockTeam()

  return {
    gameId: faker.number.int({ min: 2023010001, max: 2023019999 }),
    gameDate: faker.date.between({ from: '2023-10-01', to: '2024-04-30' }),
    gameType: 2,
    homeTeam,
    awayTeam,
    homeTeamScore: faker.number.int({ min: 0, max: 2 }),
    awayTeamScore: faker.number.int({ min: 3, max: 5 }),
    isRegulation: true,
    isOvertime: false,
    isShootout: false,
    endedIn: 'REG',
    isFinal: true,
    getWinningTeam: () => awayTeam,
    ...overrides,
  }
}
