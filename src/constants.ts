import type { Division, Season } from '@/models'

export const atlantic: Division = {
  id: 17,
  name: 'Atlantic'
}

export const central: Division = {
  id: 16,
  name: 'Central'
}

export const metropolitan: Division = {
  id: 18,
  name: 'Metropolitan'
}

export const pacific: Division = {
  id: 15,
  name: 'Pacific'
}

export const divisions = [
  pacific,
  central,
  metropolitan,
  atlantic
]

export const seasons: Record<string, Season> = {
  20232024: {
    key: '20232024',
    name: '2023 - 2024'
  },
  20222023: {
    key: '20222023',
    name: '2022 - 2023'
  },
  20212022: {
    key: '20212022',
    name: '2021 - 2022'
  }
}

export const defaultSeason = seasons['20222023']
