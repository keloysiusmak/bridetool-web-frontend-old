<template>
  <div class="has-text-centered">
    <div class="columns">
      <div class="column is-8 is-12-mobile is-offset-2">
        <p class="title is-3">About Us</p>
        <p class="is-size-5">
          Our goal is simple: we aim to eliminate the stresses of wedding planning using technology.
        </p>
        <br/>
        <p class="is-size-5">
          We're out to build a platform designed for couples to tackle the complications of their wedding day,
          so they can leave all their worries behind and focus solely on doing one thing: having fun and looking good.
        </p>
        <br/>
        <p class="is-size-5">
          We're always iteratively listening, building, and enhancing the features we already have, and we have a lot
          more in the pipeline. It's going to be exciting.
        </p>
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
