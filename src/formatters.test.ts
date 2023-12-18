import { describe, expect, it } from 'vitest'
import * as Formatters from '@/formatters'
import { type Game, type TeamStats } from '@/models'

describe('Formatters', () => {
  describe('formatTeamRecord()', () => {
    it('should return a correctly formatted record', () => {
      const mockTeamStats = {
        wins: 10,
        losses: 10,
        otLosses: 5,
      } as TeamStats

      expect(Formatters.formatTeamRecord(mockTeamStats)).toEqual('10 - 10 - 5')
    })
  })

  describe('formatPointsPercentage()', () => {
    it('should return a correctly formatted percentage with the pts% is < 100 but < 0', () => {
      expect(Formatters.formatPointsPercentage(0.54364)).toEqual('.544')
    })

    it('should return a correctly formatted percentage with the pts% is 100', () => {
      expect(Formatters.formatPointsPercentage(100)).toEqual('1.000')
    })

    it('should return a correctly formatted percentage with the pts% is 0', () => {
      expect(Formatters.formatPointsPercentage(0)).toEqual('.000')
    })
  })

  describe('formatGameScore()', () => {
    it('should correctly format a regulation final when the home team won', () => {
      const mockGame = {
        homeTeamScore: 1,
        awayTeamScore: 0,
        isShootout: false,
        isOvertime: false,
      } as Game

      expect(Formatters.formatGameScore(mockGame)).toEqual('1 - 0')
    })

    it('should correctly format a regulation final when the away team won', () => {
      const mockGame = {
        homeTeamScore: 1,
        awayTeamScore: 2,
        isShootout: false,
        isOvertime: false,
      } as Game

      expect(Formatters.formatGameScore(mockGame)).toEqual('1 - 2')
    })

    it('should correctly format an overtime final', () => {
      const mockGame = {
        homeTeamScore: 1,
        awayTeamScore: 2,
        isShootout: false,
        isOvertime: true,
      } as Game

      expect(Formatters.formatGameScore(mockGame)).toEqual('1 - 2 (OT)')
    })

    it('should correctly format a shootout final', () => {
      const mockGame = {
        homeTeamScore: 1,
        awayTeamScore: 2,
        isShootout: true,
        isOvertime: false,
      } as Game

      expect(Formatters.formatGameScore(mockGame)).toEqual('1 - 2 (SO)')
    })
  })

  describe('formatGameDate()', () => {
    it('should format the date correctly', () => {
      const mockDate = new Date('2023-12-05')

      expect(Formatters.formatGameDate(mockDate)).toEqual('Dec 05')
    })
  })
})
