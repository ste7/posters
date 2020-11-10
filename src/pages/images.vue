<template>
  <q-page class="q-pa-md">
    <div class="q-col-gutter-md row items-start album">
      <div class="col-2 album__item"
           v-for="(item, index) in images"
           :key="index"
           :src="item.src"
      >
        <div class="q-pa-md q-gutter-sm">
          <q-btn color="red" icon="delete" @click="removeImage(item.id)" />
        </div>
        <q-img
                :src="item.src"
                class="album__image"
        >
        </q-img>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      images: 'app/images'
    })
  },
  methods: {
    removeImage (id) {
      this.$store.commit('app/REMOVE_IMAGE', id)
    }
  }
}
</script>

<style lang="scss" scoped>
  .album {
    &__item {
      cursor: pointer;
      transition: opacity 0.25s;

      &:hover {
        opacity: 0.8;
      }

      &.active {
        opacity: 0.8;
      }
    }

    &__image {
      width: 100%;
      height: 150px;
      object-fit: cover
    }
  }
</style>
