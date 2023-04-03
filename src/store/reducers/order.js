import * as actionTypes from '../actions/actionTypes';
 import { updateObject } from '../../shared/utility';

const initialState = {
    orders: [],
    loading: false,
    purchased: false
};

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const purchaseBurgerStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject( action.orderData, {id: action.orderId})
    return updateObject ( state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purchaseBurgerFail = (state, action) => {
    return updateObject(state, { loading:false });
};



const fetchOrdersStart = (state, action) => {
    return updateObject(state, { loading:true });
};

const fetchOrdersSuccess = (state, action) => {
    return updateObject(state, { 
        orders: action.orders,
         loading:false });
};

const fetchOrdersFail = (state, action) => {
    return updateObject(state, { loading:false });
};




const deleteOrdersSuccess = (state, action) => {
    return updateObject(state, { 
        orders: state.orders.filter(ord => ord.id !== action.id),
         loading:false });
};

const deleteOrdersFail = (state, action) => {
    return updateObject(state, { loading:false });
};



const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action);
            // return {
            //     ...state,
            //     purchased: false
            // }

        case actionTypes.PURCHASE_BURGER_START:  
            return purchaseBurgerStart(state, action);
            // return { 
            //   ...state,
            //   loading: true
            // };


        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);
            // const newOrder = {
            // ...action.orderData,
            // id: action.orderId
            // };
            // return {
            //     ...state,
            // loading: false,
            // purchased: true,
            // orders: state.orders.concat(newOrder)
            // };


        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action);
        // return {
        //     ...state,
        //     loading: false
        //    };


        case actionTypes.FETCH_ORDERS_START:
            return fetchOrdersStart(state, action);
            // return {
            //     ...state,
            //     loading: true
            // };


        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrdersSuccess (state, action);
                // return {
                //     ...state,
                //     orders: action.orders,
                //     loading: false
                // };


        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrdersFail(state, action);
            // return {
            //     ...state,
            //     loading: false
            // };

            case actionTypes.DELETE_ORDERS_SUCCESS:
                return deleteOrdersSuccess (state, action);
    
    
            case actionTypes.DELETE_ORDERS_FAIL:
                return deleteOrdersFail(state, action);
            
            
        default:
            return state;
    }
};

export default reducer;