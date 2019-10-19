import ACTION_TYPE from '../actions/actions';
//APP GLOBAL INIT STATE
const initialState = {
  firstopen: true,
  unreadNotification: 0,
  userData: null,
  scheduleData: null
};

//REDUCER
const reducer = (state = initialState, action) => {
  // ACTION CHANGE ACCOUNT STATUS
  // if (action.type === ACTION_TYPE.CHANGE_ACCOUNT_TYPE) {
  //     return { isStudent: !state.isStudent };
  // }
  switch (action.type) {
    case ACTION_TYPE.ISFIRST:
      return { ...state, firstopen: action.value };
    case ACTION_TYPE.UPDATE_USER:
      return { ...state, userData: action.value };
    case ACTION_TYPE.UPDATE_SCHEDULE:
      return { ...state, scheduleData: action.value };
    case ACTION_TYPE.CLEAR_DATA:
      return {
        ...state,
        userData: null,
        scheduleData: null
      };
  }
  return state;
  //ACTION ADD ORDER
  // if (action.type === ACTION_TYPE._ADD) {
  //     console.log(state.products);
  //     const similiarItems = Object.values(state.products).filter(
  //         item => item.product.id === action.id
  //     );

  //     if (similiarItems.length > 0) {
  //         let tempProduct = state.products[action.id];
  //         tempProduct.total += 1;
  //         state.products[action.id] = tempProduct;

  //         return {
  //             ...state,
  //             products: {
  //                 ...state.products
  //             }
  //         };
  //     } else {
  //         return {
  //             ...state,
  //             products: {
  //                 ...state.products,
  //                 [action.id]: action.payload
  //             }
  //         };
  //     }
  // }
  //ACTION DELETE ORDER
  // if (action.type === ACTION_TYPE._DELETE) {
  //     delete state.products[action.id];
  //     return {
  //         ...state,
  //         products: {
  //             ...state.products
  //         }
  //     };
  // }
  // return state;
};

export default reducer;
