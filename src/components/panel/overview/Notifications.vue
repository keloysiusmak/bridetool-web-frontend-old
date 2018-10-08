<template>
  <div v-if="!notifications" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="notifications">
    <div class="columns is-multiline">
      <div class="column is-12">
        <span class="subtitle is-7">Notifications</span><br/>
        <span class="title is-4">{{ loggedInMember.firstName + " " + loggedInMember.lastName }}</span>
      </div>
    </div>
    <div class="columns">
      <div class="column is-9">
        <template v-if="!filteredNotifications.length">
          <p class="is-size-6">
            No notifications to show.
          </p>
        </template>
        <template v-if="filteredNotifications.length">
          <router-link :to="notification.url" class="box" v-for="notification in formattedNotifications" :key="notification._id">
            <div class="columns is-multiline">
              <div class="column is-9">
                <p class="subtitle is-7" v-html="notification.text"></p>
              </div>
              <div class="column is-3 has-text-right is-hidden-mobile">
                <p class="subtitle is-7 has-text-grey-light is-italic">{{notification.time}}</p>
              </div>
            </div>
          </router-link>
        </template>

      </div>
      <div class="column is-3 rightbar">
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const moment = require('moment');

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates),
    filteredNotifications: function() {
      return this.notifications.filter(notification => {
        return notification.type === 1;
      });
    },
    formattedNotifications: function() {
      return this.filteredNotifications.map(notification => {
        return this.formatNotification(notification);
      });
    }
  },
  methods: {
    formatNotification: function(notification) {
      let formattedNotification = {
        text: null,
        url: null,
        time: null
      };
      switch(notification.type) {
        //Mark Task
        case 1:
          switch(notification.subtype) {
            //Mark as Complete
            case 1:
              formattedNotification.text = "<strong>" + notification.param1.firstName + " " + notification.param1.lastName + "</strong> has just marked the task <strong>" + notification.param2.name + "</strong> in <strong>" + notification.object.name + "</strong> as completed.";
              break;
            //Mark as Incomplete
            case 2:
              formattedNotification.text = "<strong>" + notification.param1.firstName + " " + notification.param1.lastName + "</strong> has just marked the task <strong>" + notification.param2.name + "</strong> in <strong>" + notification.object.name + "</strong> as incomplete.";
              break;
          }
          formattedNotification.url = {path: '/schedule/activities'};
          break;
        default:
          formattedNotification.text = null;
          break;
      }
      formattedNotification.time = moment(notification.createdAt * 1000).fromNow();
      return formattedNotification;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box:hover {
    box-shadow: none !important;
  }
</style>
