export const addToCart = (data) => (dispatch, getState) => {
    dispatch({
        type: 'ADD_TO_CART',
        payload: data
    });

    localStorage.setItem('cart', JSON.stringify(getState().cart));
};

export const removeFromCart = (data) => (dispatch, getState) => {
    dispatch({
        type: 'REMOVE_FROM_CART',
        payload: data
    });

    localStorage.setItem('cart', JSON.stringify(getState().cart));
};

export const loadCart = (data) => (dispatch) => {
    dispatch({
        type: 'LOAD_CART',
        payload: data
    });
};