export const initialState = {
  username: null,
  wallet: null,
  dateNowClick: (Date.now() - (48*86400000)),
  email: null,
  password: null,
  creation: Date.now(),
  amount: 0,
  referralLink: null, 
  referralLider: null,
  referralCount: 0,
  user: {},
  
};

export const actionTypes = {
  SET_USER: "SET_USER",
  SET_EMAIL: "SET_EMAIL",
  SET_PASSWORD: "SET_PASSWORD",
  SET_WALLET: "SET_WALLET",
  SET_CREATION: "SET_CREATION",
  SET_AMOUNT: "SET_AMOUNT",
  SET_DATENOWCLICK: "SET_DATENOWCLICK",
  SET_REFERRALLINK: "SET_REFERRALLINK",
  SET_REFERRALLIDER: "SET_REFERRALLIDER",
  SET_REFERRALCOUNT: "SET_REFERRALCOUNT",


};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_EMAIL:
      return {
        ...state, //AGAFA TOT EL STATE
        email: action.email,
      };

      case actionTypes.SET_USER:
      return {
        ...state, //AGAFA TOT EL STATE
        user: action.user,
      };

      case actionTypes.SET_PASSWORD:
      return {
        ...state, //AGAFA TOT EL STATE
        password: action.password,
      };

      case actionTypes.SET_WALLET:
      return {
        ...state, //AGAFA TOT EL STATE
        wallet: action.wallet,
      };

      case actionTypes.SET_CREATION:
      return {
        ...state, //AGAFA TOT EL STATE
        creation: action.creation,
      };

      case actionTypes.SET_AMOUNT:
      return {
        ...state, //AGAFA TOT EL STATE
        amount: action.amount,
      };

      case actionTypes.SET_DATENOWCLICK:
      return {
        ...state, //AGAFA TOT EL STATE
        dateNowClick: action.dateNowClick,
      };

      case actionTypes.SET_REFERRALLIDER:
      return {
        ...state, //AGAFA TOT EL STATE
        referralLider: action.referralLider,
      };

      case actionTypes.SET_REFERRALLINK:
      return {
        ...state, //AGAFA TOT EL STATE
        referralLink: action.referralLink,
      };
      case actionTypes.SET_REFERRALCOUNT:
      return {
        ...state, //AGAFA TOT EL STATE
        referralCount: action.referralCount,
      };

    default:
      return state;
  }
};

export default reducer;
