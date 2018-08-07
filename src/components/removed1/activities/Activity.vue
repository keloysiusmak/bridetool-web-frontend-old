<template>
  <div id="sidebar_activity">
    <aside class="menu" v-if="activity">
      <ul class="menu-list">
        <div class="navbar-start">
          <router-link class="navbar-item" :to="{ name: 'getActivity', params: {activityId : activity._id}, props: true }" v-bind:class="{ 'is-active': sidebarSelected === 'activityoverview' }">Overview</router-link></li>
        </div>
        <div class="navbar-end">
          <router-link class="navbar-item" :to="{ path: '/activities/' + activity._id + '/edit' }">
            <span class="button is-link">Edit Activity</span>
          </router-link>
        </div>
      </ul>
    </aside>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const activityHandler = require('../../../handlers/activityHandler');

export default {
  name: 'Sidebar-Activity',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  props:['activityId', 'sidebarSelected'],
  methods: {
    ...mapMutations([
      'setState'
    ]),
    loadActivity: async function() {
      try {
        const getActivity = await activityHandler.getActivity(this.tokens, this.activityId);
        this.setState({
          activity: getActivity.activity
        })
        this.loading = false;
      } catch (e) {
        console.log(e);
      }
    }
  },
  async created() {
    this.loadActivity();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
