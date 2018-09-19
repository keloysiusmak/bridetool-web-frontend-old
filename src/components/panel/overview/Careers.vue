<template>
  <div class="has-text-centered">
    <div class="columns">
      <div class="column is-8 is-12-mobile is-offset-2">
        <p class="title is-3">Careers</p>
        <p class="is-size-5">
          There are currently no job openings available.
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
