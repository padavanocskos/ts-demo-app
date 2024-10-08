import { useCallback, useState } from "react"
import SearchItem from "../objects/SearchItemObject"

const useFieldsState = (fieldDefs = {}) => {
  let fields = {}

  for (let item in fieldDefs) {
      fields[fieldDefs[item].field] = new (SearchItem as any)("")
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