import { copy } from '../helpers'
import { mutations, state as makeState } from '@/state/board'

const {
  lists,
  moveList,
  addItem,
  moveItem
} = mutations

// empty state
const state = makeState()

describe('board mutations', () => {
  test('addItem should add a new item', () => {
    const list = state.lists[0]
    const item = {
      listId: list.id,
      title: 'New item',
      description: 'Hey there',
      date: '2018-01-01',
    }
    addItem(state, item)
  })

  test('moveItem should move an item to another list', () => {
    const payload = copy(state.lists[0].items[0])
    moveItem(state, [0, 0, 1, 0])
    expect(state.lists[1].items[0]).toEqual(payload)
  })
})
