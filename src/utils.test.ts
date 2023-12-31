import { describe, expect, it } from 'vitest'
import * as Utils from '@/utils'
import { createMockGame, createMockTeam } from '@test/mocks'
import { type Team } from './models'

describe('Utils', () => {
  describe('getHeaderColorClass()', () => {
    it("should return the team's colors class when there is a team", () => {
      const mockTeam = { abbreviation: 'ana' } as Team

      expect(Utils.getHeaderColorClass(mockTeam)).toEqual('bg-[--color-ana]')
    })

    it('should return the generic class when there is no team', () => {
      expect(Utils.getHeaderColorClass()).toEqual('bg-black dark:bg-gray-900')
    })
  })

  describe('calculatePointsPercentage', () => {
    it('should return 0 when possible points is 0', () => {
      expect(Utils.calculatePointsPercentage(0, 0)).toEqual(0)
    })

    it('should return the percentage of points earned of the total possible points', () => {
      expect(Utils.calculatePointsPercentage(5, 10)).toEqual(50)
    })
  })

  describe('getOpposingTeam()', () => {
    it('should return the home team when given the away team', () => {
      const mockHomeTeam = createMockTeam()
      const mockAwayTeam = createMockTeam()

      const mockGame = createMockGame({
        homeTeam: mockHomeTeam,
        awayTeam: mockAwayTeam,
      })

      expect(Utils.getOpposingTeam(mockGame, mockAwayTeam.name)).toEqual(mockHomeTeam)
    })

    it('should return the away team when given the home team', () => {
      const mockHomeTeam = createMockTeam()
      const mockAwayTeam = createMockTeam()

      const mockGame = createMockGame({
        homeTeam: mockHomeTeam,
        awayTeam: mockAwayTeam,
      })

      expect(Utils.getOpposingTeam(mockGame, mockHomeTeam.name)).toEqual(mockAwayTeam)
    })
  })

  describe('groupGamesByTeam()', () => {
    it('should return games grouped by teams, excluding the given team', () => {
      const mockTeam = createMockTeam()
      const mockGroupingTeam1 = createMockTeam()
      const mockGroupingTeam2 = createMockTeam()
      const mockGroupingTeam3 = createMockTeam()
      const mockGames = [
        createMockGame({ homeTeam: mockTeam, awayTeam: mockGroupingTeam1 }),
        createMockGame({ homeTeam: mockTeam, awayTeam: mockGroupingTeam2 }),
        createMockGame({ homeTeam: mockTeam, awayTeam: mockGroupingTeam3 }),
        createMockGame({ homeTeam: mockGroupingTeam1, awayTeam: mockTeam }),
        createMockGame({ homeTeam: mockGroupingTeam2, awayTeam: mockTeam }),
        createMockGame({ homeTeam: mockGroupingTeam3, awayTeam: mockTeam }),
      ]

      const expectedResult = {
        [mockGroupingTeam1.name]: [mockGames[0], mockGames[3]],
        [mockGroupingTeam2.name]: [mockGames[1], mockGames[4]],
        [mockGroupingTeam3.name]: [mockGames[2], mockGames[5]],
      }

      const result = Utils.groupGamesByTeam(mockGames, mockTeam)

      expect(result).toEqual(expectedResult)
    })
  })

  describe('calculateTeamStandings', () => {
    it('should calculate the stnadings info', () => {
      const mockTeam = createMockTeam()
      const mockGames = [
        createMockGame({
          awayTeam: mockTeam,
          homeTeamScore: 0,
          awayTeamScore: 1,
          isRegulation: true,
        }),
        createMockGame({
          awayTeam: mockTeam,
          homeTeamScore: 0,
          awayTeamScore: 1,
          isOvertime: true,
          isRegulation: false,
        }),
        createMockGame({
          awayTeam: mockTeam,
          homeTeamScore: 0,
          awayTeamScore: 1,
          isShootout: true,
          isRegulation: false,
        }),
        createMockGame({
          homeTeam: mockTeam,
          homeTeamScore: 0,
          awayTeamScore: 1,
          isShootout: true,
          isRegulation: false,
        }),
        createMockGame({
          homeTeam: mockTeam,
          homeTeamScore: 0,
          awayTeamScore: 1,
          isOvertime: true,
          isRegulation: false,
        }),
        createMockGame({
          homeTeam: mockTeam,
          homeTeamScore: 0,
          awayTeamScore: 1,
          isRegulation: true,
        }),
      ]

      expect(Utils.calculateTeamStandings(mockGames, mockTeam)).toEqual({
        realPoints: 8,
        realPossiblePoints: 12,
        realPointsPercentage: 67,
        hypoPoints: 9,
        hypoPossiblePoints: 18,
        hypoPointsPercentage: 50,
      })
    })
  })
})
