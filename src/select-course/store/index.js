import { createStore } from 'vuex'

// Create a new store instance.
const store = createStore({
    state () {
        return {
            selectNum:0,//基本数据
        }
    },
    mutations: {

        /*
       修改基础数据
       */
        changeSelectNum(state) {
            state.selectNum=state.selectNum+1;
        },
        deleteSelectNum(state) {
            state.selectNum=state.selectNum-1;
        },
    }
})

export default store;

