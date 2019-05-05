export const GENERIC_ENTITY_TYPE = 'default';

export const DUMMY_VARIATION_RECORD_TO_REPRESENT_EMPTY_VARIATION = {
  entity: GENERIC_ENTITY_TYPE,
  value: 'empty_variation_for_calc_only',
};

export const defaultCreateLine = ({
  entities = [{name: GENERIC_ENTITY_TYPE}],
  entityName,
  radius,
  value = '',
}) => {
  const entity = (entityName && entities.find(ent => ent.name === entityName)) || entities[0];
  return {
    entity: entity.name,
    radius: radius || entity.defaultRadius,
    value,
  };
};
