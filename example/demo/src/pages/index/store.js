import { makeAutoObservable } from 'mobx'

const store = makeAutoObservable({
  count: 0,
  add() {
    store.count++
  },
})

export default store
