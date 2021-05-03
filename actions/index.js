export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'

export function receiveEntries (entries) {
  //console.log("receiveEntries called!")
  return {
    type: RECEIVE_ENTRIES,
    entries,
  }
}

export function addEntry (entry) {
  //console.log("addEntry called!")
  return {
    type: ADD_ENTRY,
    entry,
  }
}
