import { combineReducers } from 'redux'


function todoReducer(state=[], action) {
    switch(action.type){
        case 'ADD_ITEM': {
            console.log("ADD_ITEM reducer")
            console.log(action.type)
            console.log(action.text)
            state = [...state, {text: action.text, completed: false }]
            console.log(state)
            return state
        }
        case 'REMOVE_ITEM': {
            console.log("REMOVE_ITEM reducer")
            console.log(action.type)
            console.log(action.index)
            let newState = state.filter((item, idx) => {
                if(idx === action.index){
                    return false
                } else {
                    return true
                }
            })
            console.log({state})
            console.log({newState})
            return newState
        }
        case 'TOGGLE_ITEM': {
            console.log("toggle_ITEM reducer")
            console.log(action.type)
            console.log(action.index)
            let newState = state.map((item, idx) => {
                if(idx === action.index){
                    item.completed = !(item.completed)
                    return item
                } else {
                    return item
                }
            })
            console.log({state})
            console.log({newState})
            return newState
        }
        default: {
            return state
        }
    }
   
}

function filterReducer(state='SHOW_ALL', action) {
    switch(action.type){
        case 'SHOW_ALL': {
            state = action.type
            return state
        }
        case 'SHOW_ACTIVE': {
            state = action.type
            return state
        }
        case 'SHOW_COMPLETED': {
            state = action.type
            return state
        }
        default: {
            return state
        }
    }
   
}

const allReducers = combineReducers({items: todoReducer, filter: filterReducer})

export default allReducers