import { addTask, deleteTask, getTasks } from '@/pages/TaskDashBoard/service';


const initState = {
  tasks: [],
  taskExist: false,
};

const TaskModel = {
  namespace: 'TaskModel',
  state: initState,

  effects: {
    * fetchData({ payload }, { call, put }) {
      const response = yield call(getTasks, payload);
      yield put({
        type: 'save',
        payload: {
          tasks: response,
        },
      });
    },
    * add({ payload }, { call, put }) {
      const response = yield call(addTask, payload);
      if (response.msg === 'task exists') {
        yield put({
          type: 'save',
          payload: {
            taskExist: true,
          },
        });
      }
    },
    * delete({ payload }, { call }) {
      yield call(deleteTask, payload);
    },
    * reset({ payload }, { put }) {
      yield put({
        type: 'save',
        payload: {
          taskExist: false,
        },
      });
    },
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};

export default TaskModel;
