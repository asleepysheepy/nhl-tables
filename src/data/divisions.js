const atlantic = {
  nhlId: 17,
  name: 'Atlantic',
  nameShort: 'ATL',
  abbreviation: 'A',
}

const central = {
  nhlId: 16,
  name: 'Central',
  nameShort: 'CEN',
  abbreviation: 'C',
}

const metropolitan = {
  nhlId: 18,
  name: 'Metropolitan',
  nameShort: 'Metro',
  abbreviation: 'M',
}

const pacific = {
  nhlId: 15,
  name: 'Pacific',
  nameShort: 'PAC',
  abbreviation: 'P',
}

export const divisions = {
  atlantic,
  central,
  metropolitan,
  pacific,
  all: [
    pacific,
    central,
    metropolitan,
    atlantic,
  ],
}
