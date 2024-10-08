import GridSearchFormTextInputOperatorEnum from "../TextInput/GridSearchFormTextInputOperatorEnum"

function SearchItem(this: any, value: string, logicOperator: string = GridSearchFormTextInputOperatorEnum.Contains): void {
  this.value = value
  this.logicOperator = logicOperator
}

export default SearchItem