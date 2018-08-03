<template>
  <div id="sidebar_activity" v-if="activity">
    <aside class="menu">
      <p class="menu-label">GO BACK TO</p>
      <ul class="menu-list">
        <li><router-link v-if="!party" :to="{ name: 'getSchedule', params: {scheduleId: activity.schedule._id }, props: true }">{{ activity.schedule.name }}</router-link></li>
        <li><router-link v-if="party" :to="{ name: 'getParty', params: {partyId: party._id }, props: true }">{{ party.firstName + " " + party.lastName }}</router-link></li>
      </ul>
      <p class="menu-label">{{activity.name}}</p>
      <ul class="menu-list">
        <li><router-link :to="{ name: 'getActivity', params: {activityId : activity._id}, props: true }" append class="is-active">Overview</router-link></li>
        <li><router-link :to="{ path: '/activities/' + activity._id + '/people' }" append>People</router-link></li>
      </ul>
      <p>&nbsp;</p>
      <p class="menu-label">Operations</p>
      <ul class="menu-list">
        <li><router-link :to="{ path: '/activities/' + activity._id + '/edit' }">Edit</router-link></li>
        <li v-if="!activity.isDeleted"><a v-on:click="removeActivity();">Delete</a></li>
        <li v-if="activity.isDeleted"><a v-on:click="restoreActivity();">Restore</a></li>
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
  props:['activityId', 'party'],
  methods: {
    ...mapMutations([
      'setState'
    ]),
    removeActivity: async function() {
      try {
        const removeActivity = await activityHandler.removeActivity(this.tokens, this.activityId);
        this.setState({
          activity: removeActivity.activity
        });
      } catch (e) {
        console.log(e);
      }
    },
    restoreActivity: async function() {
      try {
        const restoreActivity = await activityHandler.restoreActivity(this.tokens, this.activityId);
        this.setState({
          activity: restoreActivity.activity
        });
      } catch (e) {
        console.log(e);
      }
    },
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
