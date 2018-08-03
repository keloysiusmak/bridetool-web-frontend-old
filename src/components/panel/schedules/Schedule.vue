<template>
  <div id="main_schedule" v-if="schedule">
    <nav class="breadcrumb" aria-label="breadcrumbs" v-if="schedule">
      <ul>
        <li><router-link to="/schedules">Schedules</router-link></li>
        <li class="is-active"><a href="#" aria-current="page">{{schedule.name}}</a></li>
      </ul>
    </nav>
    <p class="title is-1">{{schedule.name}}</p>
    <p class="subtitle is-4">Overview</p>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const scheduleHandler = require('../../../handlers/scheduleHandler');

export default {
  name: 'Main-Schedule',
  props: ['scheduleId'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    activeActivities: function() {
      return this.schedule.scheduleActivities.filter(activity => {
        return !activity.isDeleted;
      });
    },
    deletedActivities: function() {
      return this.schedule.scheduleActivities.filter(activity => {
        return activity.isDeleted;
      });
    }
  },
  methods: {
    ...mapMutations([
      'setState'
    ])
  },
  watch: {
    '$route.params.scheduleId': function () {
      this.loadSchedule();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
