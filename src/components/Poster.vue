<template>
  <div class="poster" :style="{ background: poster.color }">
    <q-img :src="poster.image.src"
           class="poster__image"
    >
    </q-img>
    <div class="poster__content">
      <p class="poster__title">{{ poster.title }}</p>
      <p class="poster__description">{{ poster.description }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    poster: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .poster {
    height: 200px;
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
</style>
