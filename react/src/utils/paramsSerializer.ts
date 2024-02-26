import { GridFilterItem, GridFilterModel, GridSortModel } from '@mui/x-data-grid'
import * as qs from 'qs'
import _ from 'lodash'

const processFilters = (filterModel: GridFilterModel) => {
  const operatorMap = {
    'contains': 'cont',
    'equals': 'eq',
    'startsWith': 'start',
    'endsWith': 'end',
    'isEmpty': 'blank',
    'isNotEmpty': 'present',
    'isAnyOf': 'cont_any'
  }

  // currently work for only single filter item
  // TODO: Add quick filter
  let filters = {}
  _.forEach(filterModel.items, (item: GridFilterItem) => {
    filters =  { ...filters, [`${item.field}_${operatorMap[item.operator]}`]: item.value ?? ''}
  })

  return filters
}

const processSorting = (sortModel: GridSortModel) => {
  let sorts: String[] = []
  for(const item in sortModel) {
    sorts.push(`${sortModel[item]['field']} ${sortModel[item]['sort']}`)
  }
  return sorts
}

export const paramsSerializer = (params) => {
  let q = {}
  console.log("PARAMS:", params)
  let paramsObject = {}
  let serialized = '&'

  if ('filterModel' in params) {
    const filters = processFilters(params.filterModel)
    q = { ...q, ...filters }
    paramsObject = { ...paramsObject, q: q }
  }

  if ('sortModel' in params) {
    const sorts = [ ...processSorting(params.sortModel)]
    q = { ...q, s: sorts }
    paramsObject = { ...paramsObject, q: q }
  }

  if ('paginationModel' in params) {
    paramsObject = { ...paramsObject, page: params.paginationModel.page, per: params.paginationModel.pageSize }
  }

  console.log("PARAMS OBJECYT", paramsObject)
  serialized += qs.stringify(paramsObject, { indices: false })
  console.log("SERIALIZED:", serialized)
  // }
  return serialized
}
