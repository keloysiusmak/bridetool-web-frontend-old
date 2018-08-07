<template>
  <div id="sidebar_schedule" v-if="parties">
    <nav class="navbar sidebar is-white" role="navigation" aria-label="sub navigation">
      <div class="navbar-menu container">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/party/" v-bind:class="{ 'is-active': sidebarSelected === 'partyoverview' }">Overview</router-link>
          <router-link class="navbar-item" to="/party/groups">Groups</router-link>
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" to="/party/create" >
            <span class="button is-success">Create Party</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

export default {
  name: 'Sidebar-Party',
  props: ['sidebarSelected'],
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    coupleParty: function() {
      return this.parties.filter(party => {
        return party.type === "couple"
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ])
  },
  watch: {
    '$route.params.partyId': function () {
      this.loadParty();
    }
  },
  async created() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
