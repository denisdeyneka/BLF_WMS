
export const categoryMap = {
  lz: 'ЛЗ',
  md: 'МВ',
  vet: 'Вет. преп.',
  diet: 'Дієт. доб./вода',
  cosmetic: 'КЗ',
  other: 'Інше',
};

export const storageZoneMap = {
  A: '+2...+8°C',
  B: '15...25°C Rh<65%',
  C: '-20...-10°C',
  NA: 'Н/З',
};

export function buildCharacteristics(p) {
  const parts = [];

  if (p.primary_packaging) parts.push(p.primary_packaging);
  if (p.fill_volume) parts.push(`${p.fill_volume} мл`);
  if (p.fill_dose) parts.push(`${p.fill_dose} мг`);
  if (p.units_per_pack) parts.push(`${p.units_per_pack} шт/уп`);
  if (p.packs_per_box) parts.push(`${p.packs_per_box} уп/кор`);
  if (p.country) parts.push(p.country);

  return parts.join(' | ');
}

export function buildShortCharacteristics(p) {
  const parts = [];

  if (p.primary_packaging) parts.push(p.primary_packaging);
  if (p.fill_volume) parts.push(`${p.fill_volume} мл`);
  if (p.fill_dose) parts.push(`${p.fill_dose} мг`);

  return parts.join(' / ');
}

export function buildDisplayName(data) {
  return `${data.name || ''} | ${buildCharacteristics(data)}`;
}