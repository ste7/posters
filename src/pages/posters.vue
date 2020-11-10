<template>
  <q-page class="q-pa-md container">
    <div class="q-col-gutter-md row items-start">
      <div class="col-3"
           v-for="(item, index) in posters"
           :key="index"
           :src="item.src"
           @click="selectPoster(item)"
      >
        <Poster :poster="item" />
      </div>
    </div>
    <q-dialog v-model="selected.active">
      <q-card>
        <div class="modal-poster" :style="{ background: selected.data.color }">
          <q-img
                  :src="selected.data.image.src"
                  class="modal-poster__image"
          >
          </q-img>
          <div class="modal-poster__content">
            <p class="modal-poster__title">{{ selected.data.title }}</p>
            <p class="modal-poster__description">{{ selected.data.description }}</p>
          </div>
        </div>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'
import Poster from '../components/Poster'

export default {
  components: { Poster },
  data () {
    return {
      selected: {
        active: false,
        data: {
          image: {}
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      posters: 'app/posters'
    })
  },
  methods: {
    selectPoster (poster) {
      this.selected.active = true
      this.selected.data = poster
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-poster {
    width: 500px;
    padding: 20px;

    &__image {
      width: 100%;
      height: 500px;
      object-fit: cover;
    }

    &__title {
      font-size: 20px;
      font-weight: bold;
      margin: 0;
      color: #fff;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: 1.2px;
      text-align: center;
    }

    &__description {
      font-size: 14px;
      margin: 0;
      color: #fff;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: 1.2px;
      text-align: center;
    }
  }
</style>
