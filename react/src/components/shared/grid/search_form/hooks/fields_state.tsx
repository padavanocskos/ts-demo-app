import { useCallback, useState } from "react"
const useFieldsState = (fieldDefs = {}) => {
  let fields = {}

  for (let item: GridFilterItem in fieldDefs) {
      fields[fieldDefs[item].field] = item
  }

  const [fieldsState, setFieldsState] = useState(fields)
  const resetFieldsValue = useCallback(() => {
      setFieldsState(fields)
  }, [fieldDefs])

  return {
      fieldsState,
      setFieldsState,
      resetFieldsValue
  }
}

export default useFieldsState