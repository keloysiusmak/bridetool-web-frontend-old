<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations, mapGetters } from 'vuex';
import { mappedStates, mappedGetters } from './components/config/vuex-config';
window.$ = require('jquery')
window.JQuery = require('jquery')

const handler = require('./handlers/handler');
const scheduleHandler = require('./handlers/scheduleHandler');
const tokenHandler = require('./handlers/tokenHandler');
const config = require('../dist/config/config.' + process.env.NODE_ENV);

axios.defaults.baseURL = config.apiUrl;

export default {
  name: 'App',
  computed: {
    ...mapGetters(mappedGetters),
    ...mapState(mappedStates)
  },
  methods: {
    ...mapMutations([
      'setState'
    ]),
    refreshAccessToken: async function() {
      try {
        const checkAccessTokenExpired = await tokenHandler.checkAccessTokenExpired(this.$store, this.tokens);
        if (checkAccessTokenExpired.expired) {
          this.setState({
            accessToken: checkAccessTokenExpired.accessToken,
            storedTokensTime: checkAccessTokenExpired.storedTokensTime
          });
        }
      } catch (e) {
        this.setState({
          globalErrors: e.message
        })
      }
    }
  },
  async created() {
    this.refreshAccessToken();
    try {
      if (!this.apiToken) {
        const getApiToken = await tokenHandler.getApiToken();
        this.setState({
          apiToken: getApiToken.apiToken
        });
      }
    } catch (e) {
      this.setState({
        globalErrors: e.message
      })
    };
  },
  async updated() {
    this.refreshAccessToken();
  }
}
</script>
<style lang="sass">
@import './assets/css/sass/overrides.sass'
@import '../node_modules/bulma/bulma.sass'
@import '../node_modules/bulma-extensions/bulma-checkradio/src/sass/index.sass'
@import '../node_modules/bulma-extensions/bulma-timeline/src/sass/index.sass'
@import '../node_modules/bulma-extensions/bulma-divider/src/sass/index.sass'
@import './assets/css/sass/main.sass'
</style>
