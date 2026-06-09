// D:\my_projects\BLF_WMS\modules\ui\productlibrary\validation.js

export function validateProduct(data) {
  const errors = [];

  if (!data.code) errors.push('Code required');
  if (!data.name) errors.push('Name required');
  if (!data.category) errors.push('Category required');
  if (!data.fill_volume) errors.push('Fill volume required');
  if (!data.units_per_pack) errors.push('Units per pack required');

  return errors;
}