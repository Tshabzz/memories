const reducers = () => ({
    FETCH_ALL: (state, action) => (
        action.payload
    ),
    CREATE: (state, action) => (
        [...state, action.payload]
    )
})


export const { FETCH_ALL } = reducers
export default reducers