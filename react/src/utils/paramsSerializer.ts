import { GridFilterItem, GridFilterModel, GridSortModel } from '@mui/x-data-grid'
import * as qs from 'qs'
import _ from 'lodash'
import TextOperatorEnum from '../components/shared/grid/search_form/TextInput/types/TextOperatorEnum'
import GeneralOperatorEnum from '../components/shared/grid/search_form/TextInput/types/GeneralOperatorEnum'
import NumericOperatorEnum from '../components/shared/grid/search_form/TextInput/types/NumericOperatorEnum'

const processFilters = (filterModel: GridFilterModel, columns: []) => {
  const operatorMap = {
    [NumericOperatorEnum.GreaterThan]: 'gt',
    [NumericOperatorEnum.GreaterThanEqual]: 'gteq',
    [NumericOperatorEnum.LessThan]: 'lt',
    [NumericOperatorEnum.LessThanEqual]: 'lteq',
    [NumericOperatorEnum.NonEquals]: 'not_eq',
    [TextOperatorEnum.Contains]: 'cont',
    [TextOperatorEnum.Equals]: 'eq',
    [TextOperatorEnum.StartsWith]: 'start',
    [TextOperatorEnum.EndsWith]: 'end',
    [GeneralOperatorEnum.IsEmpty]: 'blank',
    [GeneralOperatorEnum.IsNotEmpty]: 'present',
    [GeneralOperatorEnum.IsAnyOf]: 'cont_any'
  }

  // TODO: Add quick filter
  let filters = {}
    console.log("FILTER MODEL ITEMS:", filterModel.items)
  _.forEach(filterModel.items, (item: GridFilterItem) => {
    filters =  { ...filters, [`${item.field}_${operatorMap[item.operator as keyof typeof operatorMap]}`]: item.value ?? '' }
  })
  
  // if filterModel.quickFilterItems not empty
  if (filterModel.quickFilterValues) {
    // EZT A RESZT ITT ALAPOSAN AT KELL GONDOLNI
    // szet kell valogatni a parametereket tipus szerint.
    // string *_cont
    // number *_eq -t hasznal
    // stringben lehet szam, de number tipus nem tartalmazhat szamokon kivul mas karaktereket
    // a megvalositott logikat tegyuk egy kulon komponensbe
    // return {
    //   first_name_and_last_name_and_phone1_cont: '1',
    //   id_eq: 1
    // }
    let quickFilter = ''
    // let quickFilter = _.map(columns, 'field').join(`_or_`)
    // let quickFilter = _.map(columns, 'field').join(`_${filterModel.quickFilterLogicOperator}_`)
    // _.map(columns, (item) => {
    //   switch(item.type) {
    //     case 'string': ''
    //     break
    //     case 'number': ''
    //   }
    // })
    filters = { ...filters, [`${quickFilter}_cont_any`]: [ ...filterModel.quickFilterValues] }
  }

  console.log("FILTERS: ", filters)
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
    const filters = processFilters(params.filterModel, params.columns)
    // drop empty values
    const a = Object.fromEntries(Object.entries(filters).filter(([_,value]) => value))
    // q = { ...q, ...filters }
    q = { ...q, ...a }
    paramsObject = { ...paramsObject, q: q }
  }

  if ('sortModel' in params) {
    const sorts = [ ...processSorting(params.sortModel) ]
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
