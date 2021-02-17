<template>
  <v-app dark>

    <navBar  style="z-index:1;"/>

    <v-main>
        <nuxt />
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>


  </v-app>
</template>

<script>
export default {
  data () {
    return {

      data: null,


    }
  },
  methods: {
    Route() {
      alert('Yesss')
    }
  },
}
</script>
