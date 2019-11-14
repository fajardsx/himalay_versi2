import ACTION_TYPE from '../actions/actions';
//APP GLOBAL INIT STATE
const initialState = {
  firstopen: true,
  unreadNotification: 0,
  userData: null,
  userGeolocation: null,
  scheduleData: null,
  currentScheduleData: null,
  userRole: -1,
  userAttendExpired: false,
  currentSelectDoktor: []//only use went selectdokter and selectdoktor again
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
    case ACTION_TYPE.UPDATE_USER_LOCATION:
      return { ...state, userGeolocation: action.value };
    case ACTION_TYPE.UPDATE_SCHEDULE:
      return { ...state, scheduleData: action.value };
    case ACTION_TYPE.UPDATE_CURRENTSCHEDULE:
      return { ...state, currentScheduleData: action.value };
    case ACTION_TYPE.UPDATE_USERROLE:
      return { ...state, userRole: action.value };
    case ACTION_TYPE.UPDATE_USERATTENDEXPIRED:
      return { ...state, userAttendExpired: action.value };
    case ACTION_TYPE.UPDATE_CURRENTSELECTDOKTOR:
      //prosess
      let data = action.value;
      let tempselectitem = Object.assign([], state.currentSelectDoktor);

      console.log(`reducers.js => ${ACTION_TYPE.UPDATE_CURRENTSELECTDOKTOR} => action.value `, action.value);
      console.log(`reducers.js => ${ACTION_TYPE.UPDATE_CURRENTSELECTDOKTOR}  => tempselectitem `, tempselectitem);
      if (data.isSelect == 1) {
        let founddata = tempselectitem.find(res => { return res.listid == data.listid });
        if (!founddata) {
          tempselectitem.push(data);
        }
      }
      if (data.isSelect == 0) {
        let founddata = tempselectitem.findIndex(res => { return res.listid == data.listid });
        if (founddata > -1) {
          tempselectitem.splice(founddata, 1);
        }
      }
      console.log(`reducers.js => ${ACTION_TYPE.UPDATE_CURRENTSELECTDOKTOR}  => tempselectitem `, tempselectitem);

      return { ...state, currentSelectDoktor: tempselectitem };
    case ACTION_TYPE.CLEAR_DATA:
      return {
        ...state,
        userData: null,
        scheduleData: null,
        userRole: -1,
        currentScheduleData: null,
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
