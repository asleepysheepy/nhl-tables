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
})
