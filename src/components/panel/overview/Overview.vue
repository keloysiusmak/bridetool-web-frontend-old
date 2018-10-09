<template>
  <div id="panel_overview">
    <div class="columns">
      <div class="column is-8">
        <div class="box">
          <p class="title is-4">Hey, {{ loggedInMember.firstName + " " + loggedInMember.lastName }}</p>
          <p class="is-size-6">
            Thank you for helping us in our step to make the challenges of wedding planning a thing of the past. We're committed to finding ways to help couples better plan their weddings, in the hope that the stresses of
            wedding planning will cease to exist and couples can fully immerse themselves in enjoying one of the biggest days in their lives.
            <br/><br/>
            Bridetool is still in its <strong>beta testing</strong> stage and we're always working to make bridetool more useful for couples and for you, and we would always love feedback on how we can make this better. Feel free to let us know by dropping us an email at
            <a href="mailto:keloysiusmak@hotmail.com">keloysiusmak@hotmail.com</a>. We deeply appreciate the constructive feedback and we can't wait to make this better for you.
          </p>
          <br/>
          <p class="title is-6">WITH LOVE, THE BRIDETOOL TEAM</p>
        </div>
        <div class="box">
          <p class="title is-4">Still unsure on how to use Bridetool?</p>
          <p class="subtitle is-6 has-text-grey">
            Run through the quick start guide! It has everything you need to
            know to get up and running with Bridetool.
          </p>
          <p class="subtitle is-6 has-text-grey">
            <router-link :to="{ path: 'quickstart' }" class="is-size-6">
              Take the Quick Start Guide &nbsp;
              <span class="icon is-small is-left">
              <i class="fas fa-arrow-circle-right"></i>
              </span>
            </router-link>
          </p>
        </div>
      </div>
      <div class="column is-4">
        <template v-if="!filteredNotifications.length">
          <p class="is-size-6">
            No notifications to show.
          </p>
        </template>
        <template v-if="filteredNotifications.length">
          <router-link :to="notification.url" class="box" v-for="notification in formattedNotifications" :key="notification._id">
            <p class="subtitle is-7" v-html="notification.text"></p>
            <p class="subtitle is-7 has-text-grey-light is-italic">{{notification.time}}</p>
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';

const activityHandler = require('../../../handlers/activityHandler');
const scheduleHandler = require('../../../handlers/scheduleHandler');
const moment = require('moment');

export default {
  name: 'Panel-Overview',
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
    ...mapMutations([
      'setState'
    ]),
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
