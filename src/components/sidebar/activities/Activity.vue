<template>
  <div id="sidebar_activity" v-if="activity">
    <aside class="menu">
      <span class="tag is-danger" v-if="activity.isDeleted">Deleted</span>
      <p class="menu-label">{{activity.name}}</p>
      <ul class="menu-list">
        <li><router-link :to="{ name: 'getActivity', params: {activityId : activity._id}, props: true }" v-bind:class="{ 'is-active': sidebarSelected === 'activityoverview' }">Overview</router-link></li>
      </ul>
      <p>&nbsp;</p>
      <p class="menu-label">Operations</p>
      <ul class="menu-list">
        <li><router-link :to="{ path: '/activities/' + activity._id + '/edit' }" v-bind:class="{ 'is-active': sidebarSelected === 'editactivity' }">Edit Activity</router-link></li>
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
