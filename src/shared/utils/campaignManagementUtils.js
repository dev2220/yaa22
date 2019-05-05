import moment from 'moment';

export const openFilteredEntitiesInCM = ({entitiesIds}) => {
  const entityLevel = 'adsets';
  const isTsId = true;
  
  const todayDateString = moment(new Date()).format('YYYY-MM-DD');
  const yesterdayDateString = moment(new Date(Date.now() - 864e5)).format('YYYY-MM-DD'); // // 864e5 == 86400000 == 24*60*60*1000
  
  const entitiesIdsStr = entitiesIds.join(',');
  const path = `/ad-manager/public/reporting/openDuplicate/${entityLevel}/0/${entityLevel}`;
  const query = `entityIdsStr=${entitiesIdsStr}&isTsId=${isTsId}&fromdate=${yesterdayDateString}&todate=${todayDateString}`;
  const uri = `${path}?${query}`;
  
  window.open(uri, '_blank');
};
