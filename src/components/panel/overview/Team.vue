<template>
  <div class="has-text-centered">
    <div class="columns">
      <div class="column is-8 is-12-mobile is-offset-2">
        <p class="title is-3">Hey There!</p>
        <p class="is-size-5">
          Bridetool is made up of a small yet cozy team of 1. Based out of Singapore, we work to make the stresses of wedding
          planning a thing of the past.
        </p>
        <br/>
        <div class="columns">
          <div class="column is-4 is-12-mobile">
            <img class="is-rounded" src="../../../assets/img/rocket.png">
          </div>
          <div class="column is-4 is-12-mobile">
            <img class="is-rounded" src="../../../assets/img/rocket.png">
          </div>
          <div class="column is-4 is-12-mobile">
            <img class="is-rounded" src="../../../assets/img/rocket.png">
          </div>
        </div>
        <br/>
        <router-link :to="{name: 'Careers'}" class="is-size-5">Come Join Us</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
