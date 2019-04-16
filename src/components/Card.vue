<template>

  <div class="card" :data-id="item.id">
    <div class="icons">
      <span class="icon icon-edit" @click="edit">
        <i class="fas fa-edit"></i>
      </span>
    </div>
    <div>
      <p class="item-title">{{ item.title }}</p>
      <p class="item-description" v-if="item.description">{{ item.description }}</p>
      <p class="item-description" v-if="item.date">{{ timestamp }}</p>

    </div>
  </div>

</template>

<script>
export default {
  props: {
    item: Object
  },
  computed: {
    timestamp () {
      const date = new Date(this.item.date)
      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()
      return `${day}/${month + 1}/${year}`
    }
  },
  methods: {
    edit () {
      this.$emit('edit', this.item)
    }
  }
}

</script>

<style lang="scss" scoped>
  .card {
    position: relative;
    border-radius: 3px;
    cursor: default;
  }

  .item-description {
    font-size: 0.7em;
  }

  .icons {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .is-overdue {
    color: red;
    border: 1px solid red;
  }

  .card:hover {
    .icon-due,
    .icon-date {
      display: none;
    }
  }

  .icon-edit,
  .icon-date {
    color: #DDD;
  }

  .icon-edit {
    display: none;
    margin-right: -5px;
    .card:hover & {
      display: block;
    }
  }
</style>
