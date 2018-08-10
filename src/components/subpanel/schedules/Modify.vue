<template>
  <div id="main_schedule_edit">
    <br/>
    <span class="title is-5">Edit Schedule</span>
    <hr/>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      {{localErrors.componentError}}
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <form v-on:submit.prevent="checkForm();">
      <div class="field is-horizontal">
        <div class="field-label is-small">
          <label class="label">Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" id="scheduleName" v-bind:class="{'is-danger': localErrors.scheduleName}" placeholder="Schedule Name" v-model="scheduleName"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="localErrors.scheduleName">{{localErrors.scheduleName}}</p>
          </div>
        </div>
      </div>
      <hr/>
      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="button is-link is-small" type="submit" value="Save" />
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
  name: 'Subpanel-Schedules-Modify',
  data() {
    return {
      scheduleName: null,
      localErrors: {},
      localSuccess: ''
    }
  },
  props: ['scheduleId'],
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
        this.updateSchedule();
      }
    },
    updateSchedule: async function() {
      try {
        const fields = {
          name: this.scheduleName
        }
        const updateSchedule = await scheduleHandler.updateSchedule(this.tokens, this.schedule._id, fields);
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
      this.populateFields();
    }
  },
  async created() {
    this.resetErrors();
    if (this.schedule) {
      this.populateFields();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
