<template>
  <div id="main_wedding_member">
    <br/>
    <p class="title is-4">
      Groups
    </p>
    <p class="subtitle is-6 is-italic">
      Coming soon
    </p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const memberHandler = require('../../../handlers/memberHandler');

export default {
  name: 'Main-Wedding-Member',
  data() {
    return {
      groups: null
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
  },
  async created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
