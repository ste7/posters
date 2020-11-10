<template>
  <q-page class="q-pa-md">
    <q-form class="q-pa-md q-gutter-sm row">
      <q-input
              class="col-5"
              square
              outlined
              ref="name"
              v-model="albumName"
              label="Name *"
              lazy-rules
              :rules="[
                    val => val && val.length > 0 || 'Add album name',
                    val => val && val.length < 20 || 'Add maximum 20 characters'
                  ]"
      ></q-input>
      <div class="q-pa-md q-gutter-sm">
        <q-btn color="primary" label=Save @click="updateAlbum" />
        <q-btn color="red" icon="delete" @click="removeAlbum" />
      </div>
    </q-form>
    <hr />
    <br />
    <div class="container">
      <div class="q-col-gutter-md row items-start">
        <q-list class="col-3" separator>
          <q-item clickable v-ripple
                  v-for="(item, index) in albums"
                  :key="index"
                  :class="[item.id === selectedAlbum.id ? 'bg-teal-1 text-grey-8' : '']"
                  @click="selectedAlbum = item">
            <q-item-section>{{ item.name }}</q-item-section>
          </q-item>
        </q-list>
        <div class="col-9">
          <div class="row">
            <a class="col-3 poster"
                 v-for="(item, index) in albumPosters"
                 :key="index"
                 :src="item.src"
                 @click="selectPoster(item)"
                 :style="{ background: item.color }"
            >
              <q-img
                      :src="item.image.src"
                      class="poster__image"
              >
              </q-img>
              <div class="poster__content">
                <p class="poster__title">{{ item.title }}</p>
                <p class="poster__description">{{ item.description }}</p>
              </div>
            </a>
          </div>
        </div>
      </div>
      <q-dialog v-model="selectedPoster.active">
        <q-card>
          <div class="modal-poster__container">
            <div class="modal-poster" :style="{ background: selectedPoster.data.color }">
              <q-img
                      :src="selectedPoster.data.image.src"
                      class="modal-poster__image"
              >
              </q-img>
              <div class="modal-poster__content">
                <p class="modal-poster__title">{{ selectedPoster.data.title }}</p>
                <p class="modal-poster__description">{{ selectedPoster.data.description }}</p>
              </div>
            </div>
            <div class="images">
              <q-img
                      :src="item.src"
                      v-for="(item, index) in images"
                      :key="index"
                      class="images__item"
                      @click="updatePoster(item, 'image')"
              >
              </q-img>
            </div>
            <q-form class="q-gutter-md">
              <q-input
                      square
                      outlined
                      ref="title"
                      :value="selectedPoster.data.title"
                      @input="updatePoster($event, 'title')"
                      label="Title *"
                      lazy-rules
                      :rules="[
                    val => val && val.length > 0 || 'Add poster title',
                    val => val && val.length < 20 || 'Add maximum 20 characters'
                  ]"
              ></q-input>
              <q-input
                      square
                      outlined
                      ref="description"
                      :value="selectedPoster.data.description"
                      @input="updatePoster($event, 'description')"
                      label="Description *"
                      lazy-rules
                      :rules="[
                    val => val && val.length > 0 || 'Add poster description',
                    val => val && val.length < 20 || 'Add maximum 20 characters'
                  ]"
              ></q-input>
              <q-select square outlined
                        :value="selectedPoster.data.album_id"
                        @input="updatePoster($event, 'album_id')"
                        option-label="name"
                        option-value="id"
                        :options="albums"
                        label="Album *"
                        option-disable="inactive"
                        emit-value
                        map-options
                        :rules="[
                          val => val && val !== null || 'Select album'
                        ]"
              />
              <div>
                <q-btn color="red" icon="delete" @click="removePoster" />
              </div>
            </q-form>
          </div>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      active: true,
      selectedAlbum: {
        id: null
      },
      selectedPoster: {
        active: false,
        data: {
          image: {}
        }
      },
      albumName: ''
    }
  },
  computed: {
    ...mapGetters({
      images: 'app/images',
      albums: 'app/albums',
      posters: 'app/posters'
    }),
    albumPosters () {
      return this.posters.filter((item) => item.album_id === this.selectedAlbum.id)
    }
  },
  mounted () {
    if (this.albums) {
      this.selectedAlbum = this.albums[0]
      this.albumName = this.selectedAlbum.name
    }
  },
  methods: {
    selectPoster (poster) {
      this.selectedPoster.active = true
      this.selectedPoster.data = poster
    },
    updatePoster (e, field) {
      const payload = {
        id: this.selectedPoster.data.id
      }
      payload[field] = e
      this.$store.commit('app/UPDATE_POSTER', payload)
    },
    removePoster () {
      this.$store.commit('app/REMOVE_POSTER', this.selectedPoster.data.id)
      this.selectedPoster.active = false
    },
    updateAlbum () {
      this.$store.commit('app/UPDATE_ALBUM', {
        id: this.selectedAlbum.id,
        name: this.albumName
      })
    },
    removeAlbum () {
      this.$store.commit('app/REMOVE_ALBUM', this.selectedAlbum.id)
    }
  },
  watch: {
    selectedAlbum: {
      handler (val) {
        this.albumName = val.name
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .poster {
    height: 200px;
    margin: 20px;
    padding: 20px;
    cursor: pointer;
    position: relative;

    &__image {
      width: 100%;
      height: 120px;
      object-fit: cover;
    }

    &__title {
      font-size: 22px;
      font-weight: bold;
      margin: 0;
      color: #fff;
      text-align: center;
    }

    &__description {
      font-size: 18px;
      margin: 0;
      color: #fff;
      text-align: center;
    }
  }

  .modal-poster {
    width: 350px;
    padding: 20px;

    &__container {
      padding: 20px;
    }

    &__image {
      width: 100%;
      height: 300px;
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

  .images {
    width: 100%;
    height: 100px;
    margin: 10px 0 30px 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    overflow-x: auto;

    &__item {
      width: 100px;
      height: 100%;
      margin: 10px 10px 20px 0;
      cursor: pointer;
      transition: opacity 0.25s;

      &:hover {
        opacity: 0.8;
      }

      &.active {
        opacity: 0.8;
      }
    }
  }
</style>
