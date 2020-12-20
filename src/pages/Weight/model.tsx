import { deleteWeightData, getWeightData, updateWeightData } from './service';

const initState = {
  weightData: []
};

const WeightDataModel = {
  namespace: 'WeightDataModel',
  state: initState,
  effects: {
    *fetchWeightData({ payload }, { call, put }) {
      const response = yield call(getWeightData, payload);
      yield put({
        type: 'save',
        payload: {
          weightData: response
        },
      });
    },
    *updateWeightData({ payload }, { call }) {
      yield call(updateWeightData, payload);
    },
    *deleteWeight({ payload }, { call }){
      yield call(deleteWeightData, payload);
    }
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default WeightDataModel;
