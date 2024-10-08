// pass fields as args
export const initialState = {
  fields: {}
}

const searchReducer = (state, action) => {
  const { type, payload} = action;

  console.log("ALMAFA", state)
  switch (type) {
    case "ADD_TO_SEARCH":
      return {
        ...state,
        payload
      }
  }
}

export default searchReducer