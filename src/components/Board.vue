<template>
  <div class="board-container">
    <div class="column is-half is-offset-one-quarter">
      <a class="button is-large is-fullwidth is-success" @click="addNewItem">Add new item</a>
    </div>
    <div class="board">

      <div class="lists-container">

        <Container
          lock-axis="x"
          orientation="horizontal"
          drag-handle-selector=".list-drag-handle"
          @drop="onListDrop"
        >
          <Draggable v-for="(list, listIndex) in lists" :key="list.id">
            <section class="list-container" ref="list" :data-id="list.id">

              <div class="list-header">
                <span class="list-drag-handle">&#x2630;</span>
                {{ list.title }}
              </div>

              <Container
                group-name="list"
                drag-class="card-ghost"
                drop-class="card-ghost-drop"
                non-drag-area-selector=".icon"
                :animation-duration="100"
                @drop="e => onCardDrop(e, list, listIndex)"
              >
                <Draggable v-for="item in list.items" :key="item.id">
                  <Card :item="item" @edit="editItem"/>
                </Draggable>

              </Container>

              <div class="item-entry">
              </div>

            </section>

          </Draggable>

        </Container>
      </div>

    </div>

    <ui-modal ref="modal"
              :active="modal"
              :cancellable="1"
              @close="hideModal"
    >
      <UiItemForm ref="form"
                  @submit="onAddFullItem"
                  @cancel="hideModal"/>
    </ui-modal>

  </div>

</template>

<script>
import { Container, Draggable } from 'vue-smooth-dnd'

import Card from './Card'
import UiItemForm from '@/ui/UiItemForm'
import UiItemEntry from '@/ui/UiItemEntry'
import { makeDropHandler } from '@/utils/plugins'

const idTask = `459d0ac0-602f-11e9-a172-f59ecefee1ee`

export default {
  components: {
    Container,
    Draggable,
    UiItemEntry,
    UiItemForm,
    Card
  },
  data: function () {
    return {
      modal: false,
      activeListId: null
    }
  },
  computed: {
    lists () {
      return this.$store.state.board.lists
    }
  },
  methods: {
    addNewItem () {
      this.activeListId = idTask
      this.modal = true
      this.showModal({ title: 'Add item' })
    },
    onAddFullItem (item) {
      item.id
        ? this.$store.commit('updateItem', { itemId: item.id, ...item })
        : this.addItem(this.activeListId, item.title, item.description, item.date)
      this.hideModal()
    },
    addItem (listId, title, description, date) {
      this.$store.commit('addItem', { listId, title, description, date })
    },
    editItem (item) {
      this.showModal(item)
    },
    onListDrop: makeDropHandler('onListDropComplete'),
    onListDropComplete: function (src, trg) {
      this.$store.commit('moveList', [src.index, trg.index])
    },
    // onCardDrop (e, list, listIndex) {
    //   this.onCardDropTrue(e, list, listIndex)
    // },
    onCardDrop: makeDropHandler('onCardDropComplete'),
    onCardDropComplete (src, trg, element, payload) {
      this.$store.commit('moveItem', [
        src.params[1],
        src.index,
        trg.params[1],
        trg.index
      ])
    },
    showModal (item) {
      this.modal = true
      this.$nextTick(() => {
        this.$refs.form.show(item)
      })
    },
    hideModal () {
      // this.focusInput(this.activeListId)
      this.modal = false
    },
    focusInput (listId) {
      const index = this.lists.findIndex(list => list.id === listId)
      if (index > -1) {
        this.$refs.list[index].querySelector('input').focus()
      }
    }
  }
}
</script>

<style lang="scss">
  .board {
    margin-top: 20px;
    white-space: nowrap;
    > * {
      display: inline-block;
    }

    .new-list {
      margin-top: 10px;
    }
  }

  $column-width: 320px;

  .list-container {
    width: $column-width;
    padding: 10px;
    margin: 5px;
    margin-right: 20px;
    background-color: #f3f3f3;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
  }

  .lists-container {
    > * {
      display: inline-block;
      vertical-align: top;
    }
  }

  .list-header {
    margin-bottom: 5px;
  }

  .card {
    margin: 5px;
    background-color: white;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 1px 1px rgba(0, 0, 0, 0.24);
    padding: 10px;
  }

  .card-ghost {
    transition: 0.25s all;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
    transform: scale(1.1);
  }

  .card-ghost-drop {
    transform: scale(1);
  }

  .list-header {
    font-size: 18px;
  }

  .list-drag-handle {
    cursor: move;
    padding: 5px;
  }

  .item-entry {
    padding-top: 10px;
    margin-top: 10px;
    border-top: 1px solid #DDD;
  }

  .new-list {
    width: $column-width;
    margin-left: -10px;
  }

  .clear-button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
</style>
