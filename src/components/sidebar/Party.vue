<template>
  <div id="sidebar_schedule">
    <aside class="menu">
      <ul class="menu-list">
        <li><router-link :to="{ path: 'create' }" append>Add Party</router-link></li>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';
import { EventBus } from '../../events/event-bus.js';

const scheduleHandler = require('../../handlers/scheduleHandler');

export default {
  name: 'Sidebar-Party',
  data() {
    return {
      schedules: [],
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
