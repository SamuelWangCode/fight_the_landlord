import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userID: -1,
        seat: -1
    },
    mutations:{
        change(state, newUserID){
            console.log("VUEX changID");
            state.userID = newUserID;
        },
        change(state, newSeat){
            console.log("VUEX changSeat");
            state.seat = newSeat;
        }
    }
})

export default store;