<template>
  <div v-if="(budget && !record && modifyType === 'edit') || modifyLoading" class="has-text-centered">
    <a class="button is-loading is-medium is-text"></a>
  </div>
  <div v-else-if="budget && (record || modifyType !== 'edit')">
    <!-- START deleteActivityModal -->
    <div class="modal" v-bind:class="{ 'is-active': deleteRecordModal }" v-if="record">
      <div class="modal-background"></div>
      <div class="modal-content">
        <div class="box">
          <div class="title is-5">Are you sure you want to delete '{{record.name}}'?</div>
          <div class="subtitle is-7">
            This action is irreversible and cannot be undone.
          </div>
          <a class="button is-danger is-small" v-on:click="deleteRecord(); deleteRecordModal = false">Delete</a>
          <a class="button is-white is-small" v-on:click="deleteRecordModal = false">Cancel</a>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" v-on:click="deleteRecordModal = false"></button>
    </div>
    <!-- END deleteActivityModal -->
    <br/>
    <span class="title is-5" v-if="modifyType === 'edit'">Edit Record</span>
    <span class="title is-5" v-if="modifyType === 'create'">Create Record</span>
    <hr/>
    <div v-if="localErrors.componentError" class="notification is-danger">
      <button class="delete" v-on:click="localErrors.componentError = null"></button>
      <span class="is-size-7">{{localErrors.componentError}}</span>
    </div>
    <div v-if="localSuccess" class="notification is-success">
      <button class="delete" v-on:click="localSuccess = null"></button>
      <span class="is-size-7">{{localSuccess}}</span>
    </div>
    <form v-on:submit.prevent="checkForm();">
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Name</label>
          <p class="help">Setting a clear name helps you be clear on what you've spent on.</p>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control has-icons-left">
              <input class="input is-small" id="recordInitialRecord" v-bind:class="{'is-danger': localErrors.recordName}" placeholder="Name" v-model="recordName"/>
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </div>
            <p class="help is-danger" v-if="localErrors.recordName">{{localErrors.recordName}}</p>
          </div>
        </div>
      </div>
      <br/>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">{{budget.currency}}</label>
          <p class="help">Want to change to another currency? <router-link  :to="{ name: 'BudgetManage' }">Click Here</router-link></p>
        </div>
        <div class="field-body">
          <div class="control">
            <div class="field has-addons has-addons-left">
              <div class="control">
                <input class="input is-small" id="recordInitialRecord" v-bind:class="{'is-danger': localErrors.recordValue || localErrors.recordType}" placeholder="Value" v-model="recordValue"/>
              </div>
              <div class="control">
                <span class="select is-small" v-bind:class="{'is-danger': localErrors.recordValue || localErrors.recordType}">
                  <select v-model="recordType">
                    <option value="capital">Added to Budget</option>
                    <option value="expenditure">Spent</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal" v-if="localErrors.recordValue || localErrors.recordType">
        <div class="field-label"></div>
        <div class="field-body">
          <p class="help is-danger">{{localErrors.recordValue}}</p>
          <p class="help is-danger">{{localErrors.recordType}}</p>
        </div>
      </div>
      <br/>
      <div class="field is-horizontal">
        <div class="field-label">
          <label class="label">Date</label>
          <p class="help">Enter your date so it's easy for us to sort your records for you.</p>
        </div>
        <div class="field-body">
          <div class="field has-addons has-addons-left">
            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.recordDate}">
                <select v-model="recordDate.date">
                  <option v-for="date in dates" v-bind:value="date">
                    {{ date }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.recordDate}">
                <select v-model="recordDate.month">
                  <option v-for="month in months" v-bind:value="month">
                    {{ monthNames[month - 1] }}
                  </option>
                </select>
              </span>
            </p>

            <p class="control">
              <span class="select is-small" v-bind:class="{'is-danger': localErrors.recordDate}">
                <select v-model="recordDate.year">
                  <option v-for="year in years" v-bind:value="year">
                    {{ year }}
                  </option>
                </select>
              </span>
            </p>
          </div>
        </div>
      </div>
      <hr/>
      <div class="field is-horizontal">
        <div class="field-label"></div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input class="button is-link is-small is-rounded" type="submit" value="Save" />
              <input class="button is-danger is-small is-rounded" v-on:click="deleteRecordModal = true" value="Delete Record" v-if="modifyType === 'edit'" />
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

const recordHandler = require('../../../handlers/recordHandler');
const moment = require('moment');

export default {
  data() {
    return {
      deleteRecordModal: false,
      recordName: null,
      recordValue: null,
      recordType: 'expenditure',
      recordDate: {
        date: 1,
        month: 1,
        year: 2018
      },
      record: null,
      localErrors: {},
      localSuccess: '',
      modifyLoading: false,
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      dates: [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
      months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      years: [2018, 2019, 2020, 2021]
    }
  },
  props: ['recordId', 'modifyType'],
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
      var regex = /^[1-9]\d*(((,\d{3}){1})?(\.\d{0,2})?)$/;
      if (!this.recordName) {
        this.localErrors.recordName = 'Field cannot be empty.';
        hasErrors = true;
      }
      if (!this.recordValue) {
        this.localErrors.recordValue = 'Field cannot be empty.';
        hasErrors = true;
      } else if (!regex.test(this.recordValue)) {
        this.localErrors.recordValue = 'Field must be a number.';
        hasErrors = true;
      }
      if (!this.recordType) {
        this.localErrors.recordType = 'Field cannot be empty.';
        hasErrors = true;
      }
      if (!this.recordDate) {
        this.localErrors.recordDate = 'Field cannot be empty.';
        hasErrors = true;
      }

      if (!hasErrors) {
        if (this.modifyType === 'edit') {
          this.updateRecord();
        } else {
          this.insertRecord();
        }
      }
    },
    formatMoment: function(record) {
      const newMoment = moment();
      newMoment.date(record.date);
      newMoment.month(record.month - 1);
      newMoment.year(record.year);

      return newMoment;
    },
    updateRecord: async function() {
      this.modifyLoading = true;
      try {
        const fields = {
          name: this.recordName,
          value: this.recordValue,
          type: this.recordType,
          date: this.formatMoment(this.recordDate).format('X')
        }
        const updateRecord = await recordHandler.updateRecord(this.tokens, this.record._id, fields);
        this.record = updateRecord.record;
        this.populateFields();
        EventBus.$emit('loadBudget', {});
        this.localSuccess = "Successfully updated record.";
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
    },
    insertRecord: async function() {
      this.modifyLoading = true;
      try {
        const fields = {
          name: this.recordName,
          value: this.recordValue,
          type: this.recordType,
          date: this.formatMoment(this.recordDate).format('X')
        }
        const insertRecord = await recordHandler.insertRecord(this.tokens, this.budget._id, fields);
        this.record = insertRecord.record;
        this.populateFields();
        EventBus.$emit('loadBudget', {});
        this.localSuccess = "Successfully inserted record.";
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
    },
    deleteRecord: async function() {
      this.modifyLoading = true;
      try {
        const deleteRecord = await recordHandler.deleteRecord(this.tokens, this.record._id);
        EventBus.$emit('loadBudget', {});
        this.$router.push('/budget/records');
      } catch (e) {
        this.localErrors.componentError = 'Oops, something went wrong. Please refresh the page and try again.';
      }
      this.modifyLoading = false;
    },
    populateFields: function() {
      this.recordName = this.record.name;
      this.recordType = this.record.type;
      this.recordValue = this.record.value;
      const dateMoment = moment.unix(this.record.date);
      this.recordDate = {
        date: dateMoment.format('D'),
        month: dateMoment.format('M'),
        year: dateMoment.format('Y')
      };
    },
    resetErrors: function() {
      this.localErrors = {
        componentError: null,
        recordName: null,
        recordType: null,
        recordValue: null,
        recordDate: null
      }
    },
    loadRecord: async function() {
      try {
        if (this.modifyType === 'edit') {
          const getRecord = await recordHandler.getRecord(this.tokens, this.recordId);
          this.record = getRecord.record;
          if (this.record.isDeleted) {
            this.$router.push('/budget/records')
          }
          this.populateFields();
        }
        this.loading = false;
      } catch (e) {
        //
      }
    }
  },
  watch: {
    record: function() {
      this.populateFields();
    }
  },
  async created() {
    this.resetErrors();
    if (this.modifyType === 'edit') {
      this.loadRecord();
    } else {
      this.record = null;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
