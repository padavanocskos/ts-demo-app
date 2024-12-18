// pass fields as args
export const initialState = {
  fields: {}
}

const searchReducer = (state, action) => {
  const { type, payload} = action;

  switch (type) {
    case "ADD_TO_SEARCH":
      console.log("PAYLOAD:", payload)
      return {
        ...state,
        fields: {
          ...state.fields,
          [payload.gridFilterItem.name]: {
            id: payload.gridFilterItem.id,
            name: payload.gridFilterItem.name,
            value: payload.gridFilterItem.value,
            operator: payload.gridFilterItem.operator
          }
        }
      }
    case "RESET_SEARCH_STATE":
      return {
        ...state,
        fields: []
      }
  }
}

export default searchReducer