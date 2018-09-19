<template>
  <div class="has-text-centered">
    <div class="columns">
      <div class="column is-8 is-12-mobile is-offset-2">
        <p class="title is-3">Partners</p>
        <p class="is-size-5">
          We have many exciting projects in the pipeline and one of our plans is to work closely with
          partners in the industry. If this excites you and you'd like to find out more, drop us an email and
          we'll get in touch.
        </p>
        <br/>
        <a href="mailto:hello@zhkphoto.com" class="is-size-5">Drop Us An Email</a>
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
