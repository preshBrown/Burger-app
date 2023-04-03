import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderDate) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderDate
    };
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    };
};

export const purchaseBurgerStart = () => {
    return {
        type:  actionTypes.PURCHASE_BURGER_START
    };
}

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch (purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
        .then(response => {
            dispatch( purchaseBurgerSuccess( response.data.name, orderData ) );
        })
        .catch(error => {
            dispatch( purchaseBurgerFail( error ) );
        });
    };
};

export const purchaseInit = () => {
    return {
        type:  actionTypes.PURCHASE_INIT
    };
}




export const fetchOrdersSuccess = (orders) => {
    return {
        type:  actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};
export const fetchOrdersFail = (error) => {
    return {
        type:  actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }; 
};
export const fetchOrdersStart = () => {
    return { 
        type:  actionTypes.FETCH_ORDERS_START
     };
};
export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                id: key
              });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        }).catch(err => {
            dispatch(fetchOrdersFail(err));
        });
    }
};

// =====================================================
export const deleteOrderSuccess = (id) => {
    return {
        type:  actionTypes.DELETE_ORDERS_SUCCESS,
        id: id
    };
};
export const deleteOrderFail = (error) => {
    return {
        type:  actionTypes.DELETE_ORDERS_FAIL,
        error: error
    }; 
};

// `https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json`
// export const deleteOrder = (id) => {
//     return dispatch => {
//         dispatch(fetchOrdersStart());
//         axios.delete(`/orders/${id}.json`)
//         .then(res => {

//             dispatch(deleteOrderSuccess(id));
//         }).catch(err => {
//             dispatch(deleteOrderFail(err));
//         });
//     }
// };

export const deleteOrder = (id) => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        // axios.delete(`/orders/${id}.json`)
        fetch(
            `https://my-react-app-bigburger-default-rtdb.firebaseio.com/orders/${id}.json`,
            {
              method: 'DELETE'
            }
          ).then(res => {

            dispatch(deleteOrderSuccess(id));
        }).catch(err => {
            dispatch(deleteOrderFail(err));
        });
    }
};


// const removeIngredientHandler = ingredientId => {
//     dispatchHttp({ type: 'SEND' });
//     fetch(
//       `https://react-hooks-update.firebaseio.com/ingredients/${ingredientId}.json`,
//       {
//         method: 'DELETE'
//       }
//     )
//       .then(response => {
//         dispatchHttp({ type: 'RESPONSE' });
//         // setUserIngredients(prevIngredients =>
//         //   prevIngredients.filter(ingredient => ingredient.id !== ingredientId)
//         // );
//         dispatch({ type: 'DELETE', id: ingredientId });
//       })
//       .catch(error => {
//         dispatchHttp({ type: 'ERROR', errorMessage: 'Something went wrong!' });
//       });
//   };