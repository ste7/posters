<template>
  <q-page class="q-pa-md">
    <q-dialog v-model="modal.poster">
      <q-card>
        <div class="modal-poster" :style="{ background: poster.color }">
          <q-img :src="poster.image.src"
                 class="modal-poster__image"
          >
          </q-img>
          <div class="modal-poster__content">
            <p class="modal-poster__title">{{ poster.title }}</p>
            <p class="modal-poster__description">{{ poster.description }}</p>
          </div>
        </div>
      </q-card>
    </q-dialog>
    <q-dialog v-model="modal.album">
      <q-card>
        <q-card-section class="q-pt-none">
          <q-form @submit.prevent="createAlbum"
                  class="q-gutter-md album-form"
          >
            <q-input
                    square
                    outlined
                    v-model="albumForm.name"
                    label="Title *"
                    lazy-rules
                    :rules="[
                    val => val && val.length > 0 || 'Add poster title',
                    val => val && val.length < 20 || 'Add maximum 20 characters'
                  ]"
            ></q-input>
            <div class="q-pa-md q-gutter-sm">
              <q-btn label="Save" text-color="black" type="submit" color="white"></q-btn>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-dialog>
    <div class="row">
      <div class="col-5">
        <div class="poster" :style="{ background: formData.color }">
          <q-img class="poster__image" :src="formData.image.src"
          >
          </q-img>
          <div class="poster__content">
            <p class="poster__title">{{ formData.title }}</p>
            <p class="poster__description">{{ formData.description }}</p>
          </div>
        </div>
      </div>
      <div class="col-4">
        <q-form @submit.prevent="createPoster"
                class="q-gutter-md"
        >
          <q-input
                  square
                  outlined
                  ref="title"
                  v-model="formData.title"
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
                  v-model="formData.description"
                  label="Description *"
                  lazy-rules
                  :rules="[
                    val => val && val.length > 0 || 'Add poster description',
                    val => val && val.length < 20 || 'Add maximum 20 characters'
                  ]"
          ></q-input>
          <q-select square outlined v-model="formData.album_id"
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
          <div class="q-pa-md q-gutter-sm">
            <q-btn label="Save" text-color="black" type="submit" color="white"></q-btn>
            <q-btn label="Create album" text-color="black" type="button" color="white" @click="modal.album = true"></q-btn>
          </div>
        </q-form>
      </div>
      <div class="col-3">
        <div class="q-pa-md">
          <q-color
                  v-model="formData.color"
                  no-header
                  no-footer
                  default-view="palette"
                  class="my-picker"
          />
        </div>
      </div>
    </div>
    <div class="q-col-gutter-md row items-start album">
      <div class="col-2 album__item"
           :class="[formData.image.id === item.id ? 'active' : '']"
           v-for="(item, index) in images"
           :key="index"
           :src="item.src"
           @click="formData.image = item"
      >
        <q-img :src="item.src"
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
  data () {
    return {
      formData: {
        image: '',
        title: '',
        description: '',
        color: '#333333',
        album_id: ''
      },
      albumForm: {
        name: ''
      },
      poster: {
        image: {}
      },
      modal: {
        poster: false,
        album: false
      }
    }
  },
  computed: {
    ...mapGetters({
      albums: 'app/albums',
      images: 'app/images',
      posters: 'app/posters'
    })
  },
  mounted () {
    this.formData.image = this.images[0]
  },
  methods: {
    createPoster () {
      this.$store.commit('app/SET_POSTER', this.formData)
      this.poster = Object.assign(this.poster, this.formData)
      this.modal.poster = true

      this.formData.title = ''
      this.formData.description = ''
      this.reset()
    },
    createAlbum () {
      this.$store.commit('app/SET_ALBUM', this.albumForm)
      this.modal.album = false
      this.albumForm.name = ''
      this.reset()
    },
    reset () {
      this.$refs.title.resetValidation()
      this.$refs.description.resetValidation()
    }
  }
}
</script>

<style lang="scss" scoped>
  .poster {
    width: 250px;
    height: 300px;
    padding: 20px;
    cursor: pointer;
    position: relative;
    border: 2px dashed rgba(0, 0, 0, 0.4);

    &__image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      background: #fff;
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
    }

    &__description {
      font-size: 14px;
      margin: 0;
      color: #fff;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      letter-spacing: 1.2px;
    }

    &__color {
      position: absolute;
      right: -110px;
      bottom: 20px;
      opacity: 0.2;
      transition: opacity 0.35s;

      &:hover {
        opacity: 0.9;
      }
    }
  }

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

  .album-form {
    width: 500px;
    padding: 20px;
  }
</style>
