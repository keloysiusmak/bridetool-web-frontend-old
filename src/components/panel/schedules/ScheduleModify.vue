<template>
  <div id="main_schedule_edit">
    <!-- START deleteScheduleModal -->
    <div class="modal" v-bind:class="{'is-active': deleteScheduleModal}" v-if="schedule">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-4">Are you sure you want to delete '{{schedule.name}}'?</div>
          <div class="subtitle is-6">
            You can restore this schedule later, but the following changes cannot be restored:
          </div>
          <div class="is-size-6">
            <li>All activities in this schedule will be deleted.</li>
            <li>All parties assigned to activities in this schedule will be unassigned.</li>
          </div>
          <p>&nbsp;</p>
          <a class="button is-danger" v-on:click="deleteSchedule(); deleteScheduleModal = false">Delete</a>
          <a class="button is-white" v-on:click="deleteScheduleModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close"></button>
    </div>
    <!-- END deleteScheduleModal -->

    <nav class="breadcrumb" aria-label="breadcrumbs" v-if="modifyType === 'edit' && schedule">
      <ul>
        <li><router-link to="/schedules">Schedules</router-link></li>
        <li><router-link :to="{ name: 'getSchedule', params: {scheduleId: schedule._id }, props: true }">{{ schedule.name }}</router-link></li>
        <li class="is-active"><a href="#" aria-current="page">Edit Schedule</a></li>
      </ul>
    </nav>
    <nav class="breadcrumb" aria-label="breadcrumbs" v-if="modifyType === 'create'">
      <ul>
        <li><router-link to="/schedules">Schedules</router-link></li>
        <li class="is-active"><a href="#" aria-current="page">Create Schedule</a></li>
      </ul>
    </nav>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      {{localErrors.componentError}}
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      {{localSuccess}}
    </div>
    <div v-if="modifyType === 'create'">
      <p class="title is-1">
        Create Schedule
      </p>
    </div>
    <div v-if="modifyType === 'edit' && schedule">
      <p class="title is-1">
        Edit Schedule
      </p>
      <p class="subtitle is-4">
        {{schedule.name}}
      </p>
    </div>
    <p>&nbsp;</p>
    <form v-on:submit.prevent="checkForm();">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input" id="scheduleName" v-bind:class="{'is-danger': localErrors.scheduleName}" placeholder="Schedule Name" v-model="scheduleName"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="localErrors.scheduleName">{{localErrors.scheduleName}}</p>
          </div>
        </div>
      </div>
      <p>&nbsp;</p>
      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="button is-link" type="submit" value="Save" v-if="modifyType === 'edit'" />
              <input class="button is-link" type="submit" value="Create" v-if="modifyType === 'create'" />
              <a v-if="schedule && !schedule.isDeleted" class="button is-danger" v-on:click="deleteScheduleModal = true">Delete Schedule</a>
              <a v-on:click="restoreSchedule();" class="button is-success" v-if="schedule && schedule.isDeleted">Restore Schedule</a>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from '../../config/vuex-config';
import { EventBus } from '../../../events/event-bus.js';

const scheduleHandler = require('../../../handlers/scheduleHandler');

export default {
  name: 'Main-Schedule-Edit',
  data() {
    return {
      deleteScheduleModal: false,
      scheduleName: null,
      localErrors: {},
      localSuccess: ''
    }
  },
  props: ['scheduleId', 'modifyType'],
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    checkForm: async function() {
      this.resetErrors();
      let hasErrors = false;
      if (!this.scheduleName) {
        this.localErrors.scheduleName = 'Field cannot be empty.';
        hasErrors = true;
      }

      if (!hasErrors) {
        if (this.modifyType === 'edit') {
          this.updateSchedule();
        } else if (this.modifyType === 'create') {
          this.addSchedule();
        }
      }
    },
    deleteSchedule: async function() {
      try {
        const deleteSchedule = await scheduleHandler.deleteSchedule(this.tokens, this.scheduleId);
        this.setState({
          schedule: deleteSchedule.schedule
        });
        this.localSuccess = 'Successfully deleted schedule.';
      } catch (e) {
        console.log(e);
      }
    },
    restoreSchedule: async function() {
      try {
        const restoreSchedule = await scheduleHandler.restoreSchedule(this.tokens, this.scheduleId);
        this.setState({
          schedule: restoreSchedule.schedule
        });
        this.localSuccess = 'Successfully restored schedule.';
      } catch (e) {
        console.log(e);
      }
    },
    updateSchedule: async function() {
      try {
        const fields = {
          name: this.scheduleName
        }
        const updateSchedule = await scheduleHandler.updateSchedule(this.tokens, this.scheduleId, fields);
        this.setState({
          schedule: updateSchedule.schedule
        })
        this.populateFields();
        this.localSuccess = "Successfully updated schedule.";
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
    },
    addSchedule: async function() {
      try {
        const fields = {
          name: this.scheduleName
        }
        const addSchedule = await scheduleHandler.addSchedule(this.tokens, this.account._id, fields);
        this.setState({
          schedule: addSchedule.schedule
        })
        this.populateFields();

        EventBus.$emit('loadSchedules', {});

        this.localSuccess = "Successfully added schedule.";
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
    },
    populateFields: function() {
      this.scheduleName = this.schedule.name;
    },
    resetErrors: function() {
      this.localErrors = {
        componentError: null,
        scheduleName: null
      }
    }
  },
  watch: {
    schedule: function() {
      if (this.modifyType === 'edit') {
        this.populateFields();
      }
    }
  },
  async created() {
    this.resetErrors();
    if (this.modifyType === 'edit') {
      if (this.schedule) {
        this.populateFields();
      }
    } else {
      this.setState({
        schedule: null
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
