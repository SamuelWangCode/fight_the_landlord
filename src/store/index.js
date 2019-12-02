import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userID: -1
    },
    mutations:{
        change(state, newUserID){
            console.log("VUEX changID");
            state.userID = newUserID;
        }
    }
})

export default store;