import { type Season } from '@/models'

export const divisions = ['Pacific', 'Central', 'Metropolitan', 'Atlantic']

export const seasons: Record<string, Season> = {
  20232024: {
    key: '20232024',
    name: '2023 - 2024',
  },
  20222023: {
    key: '20222023',
    name: '2022 - 2023',
  },
  20212022: {
    key: '20212022',
    name: '2021 - 2022',
  },
}

export const defaultSeason = seasons['20232024']
