// reducer.js
import { LOGOUT } from '../actions/userActions.js';

const initialState = {
    // your initial state here
    user: null,
    isLoggedIn: false,
    isAdmin: false,
    cart: [],
    cartCount: 0,
    cartTotal: 0,
    wishlist: [],
    wishlistCount: 0,
    wishlistTotal: 0,
    orders: [],
    ordersCount: 0,
    ordersTotal: 0,
    notifications: [],
    notificationsCount: 0,
    notificationsTotal: 0,
    coupons: [],
    couponsCount: 0,
    couponsTotal: 0,
    reviews: [],
    reviewsCount: 0,
    reviewsTotal: 0,
    products: [],
    productsCount: 0,
    productsTotal: 0,
    categories: [],
    categoriesCount: 0,
    categoriesTotal: 0,
    brands: [],
    brandsCount: 0,
    brandsTotal: 0,
    attributes: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        // other cases...
        case LOGOUT:
            return initialState;
        default:
            return state;
    }
};

export default reducer;