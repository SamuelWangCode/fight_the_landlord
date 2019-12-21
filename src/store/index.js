import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        userID: -1,
        seat: -1,
        roomId: -1
    },
    mutations:{
        change(state, newUserID){
            console.log("VUEX changID");
            state.userID = newUserID;
            console.log(state.userID)
        },
        changeSeat(state, newSeat){
            console.log("VUEX changSeat");
            state.seat = newSeat;
            console.log(state.seat)
        },
        changeRoom(state, newRoom){
            console.log("VUEX changRoom");
            state.roomId = newRoom;
            console.log(state.roomId)
        }
    }
})

export default store;