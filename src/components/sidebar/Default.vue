<template>
  <div class="sidebar" id="menu">
    <div v-if="loggedInMember">
      <router-link to="/" class="icon">
        <span class="icon is-small is-left badge">
          <i class="far fa-bell"></i>
        </span>
      </router-link>
      <span style="font-size: 0.75rem; font-weight:400" class="has-text-danger">BETA</span>
      <router-link to="/" class="logo">
        <div class="arrow" v-if="subbarSelected != 'none'">
          <span class="icon is-small is-left">
            <i class="fas fa-angle-left"></i>
          </span>
        </div>
        Bt.
      </router-link>
      <template v-if="subbarSelected === 'none'">
        <router-link to="/" v-bind:class="{ 'is-active': sidebarSelected === 'dashboard' }">
          Dashboard
        </router-link>
        <router-link to="/schedule" v-bind:class="{ 'is-active': sidebarSelected === 'planner' }">
          Planner
        </router-link>
        <router-link to="/schedule" class="sub">
          Schedule
        </router-link>
        <router-link to="/budget" class="sub">
          Budget
        </router-link>
        <router-link to="/members" class="sub">
          Team
        </router-link>
        <router-link to="/settings" v-bind:class="{ 'is-active': sidebarSelected === 'settings' }">
          Settings
        </router-link>
        <a v-on:click="logout()">
          Log Out
        </a>
      </template>
      <template v-if="subbarSelected === 'schedule'">
        <router-link to="/schedule" class="is-active">
          Schedule
        </router-link>
        <router-link to="/schedule/timeline" class="sub" v-bind:class="{ 'is-active': deepbarSelected === 'timeline' }">
          Timeline
        </router-link>
        <router-link to="/schedule/activities" class="sub" v-bind:class="{ 'is-active': deepbarSelected === 'activities' }">
          Activities
        </router-link>
        <router-link to="/schedule/manage" class="sub" v-bind:class="{ 'is-active': deepbarSelected === 'manage' }">
          Manage
        </router-link>
      </template>
      <template v-if="subbarSelected === 'budget'">
        <router-link to="/budget" class="is-active">
          Budget
        </router-link>
        <router-link to="/budget" class="sub" v-bind:class="{ 'is-active': deepbarSelected === 'overview' }">
          Overview
        </router-link>
        <router-link to="/budget/records" class="sub" v-bind:class="{ 'is-active': deepbarSelected === 'records' }">
          Records
        </router-link>
        <router-link to="/budget/manage" class="sub" v-bind:class="{ 'is-active': deepbarSelected === 'manage' }">
          Manage
        </router-link>
      </template>
      <template v-if="subbarSelected === 'member'">
        <router-link to="/members" class="is-active">
          Team
        </router-link>
        <router-link to="/members" class="sub" v-bind:class="{ 'is-active': deepbarSelected === 'members' }">
          Members
        </router-link>
      </template>
      <template v-if="sidebarSelected === 'settings'">
        <router-link to="/settings/profile" v-bind:class="{ 'is-active': subbarSelected === 'profile' }">
          Profile
        </router-link>
        <router-link to="/settings/profile/email" class="sub" v-bind:class="{ 'is-active': deepbarSelected === 'email' }">
          Email
        </router-link>
        <br/>
        <router-link to="/settings/security" v-bind:class="{ 'is-active': subbarSelected === 'security' }">
          Security
        </router-link>
        <router-link to="/settings/security/password" class="sub" v-bind:class="{ 'is-active': deepbarSelected === 'password' }">
          Password
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../config/vuex-config';

import { EventBus } from '../../events/event-bus.js';

const budgetHandler = require('../../handlers/budgetHandler');
const coupleHandler = require('../../handlers/coupleHandler');
const scheduleHandler = require('../../handlers/scheduleHandler');

export default {
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  props: ['sidebarSelected', 'subbarSelected', 'deepbarSelected'],
  methods: {
    ...mapMutations([
      'setState'
    ]),
    toggleMenu: function() {
      $(".sidebar-burger").toggleClass("is-active");
      $("#menu").toggleClass("is-active");
    },
    logout: async function() {
      this.setState({
        accessToken: null,
        account: null,
        storedTokensTime: null,
        refreshToken: null,
        user: null
      });
      this.$router.push({ path: '/login' });
    },
    loadSchedule: async function() {
      try {
        if (!this.schedule) {
          const getSchedule = await scheduleHandler.getSchedule(this.tokens, this.account.couple.schedule);
          this.setState({
            schedule: getSchedule.schedule
          });
        }
      } catch (e) {
        //
      }
    },
    loadWeddingTeam: async function() {
      try {
        if (!this.members) {
          if (this.account._id && this.account.couple._id) {
            const getWeddingTeam = await coupleHandler.getWeddingTeam(this.tokens, this.account.couple._id);
            this.setState({
              members: getWeddingTeam.weddingTeam
            })
          }
        }
      } catch (e) {
        //
      }
    },
    loadBudget: async function() {
      try {
        if (!this.schedule) {
          if (this.account._id && this.account.couple._id) {
            const getBudget = await budgetHandler.getBudget(this.tokens, this.account.couple.budget);
            this.setState({
              budget: getBudget.budget
            })
          }
        }
      } catch (e) {
        //
      }
    }
  },
  async created() {
    this.loadSchedule();
    this.loadBudget();
    this.loadWeddingTeam();
  },
  async mounted() {
    EventBus.$on('loadSchedule', payload => {
      this.loadSchedule();
    });
    EventBus.$on('loadBudget', payload => {
      this.loadBudget();
    });
    EventBus.$on('loadWeddingTeam', payload => {
      this.loadWeddingTeam();
    });
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
