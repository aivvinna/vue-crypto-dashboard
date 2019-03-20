import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store/index'

// scss
import './assets/sass/main.scss'

// apollo
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import VueApollo from 'vue-apollo'

import FormAlert from '@/components/shared/FormAlert.vue'

Vue.component('form-alert', FormAlert)

Vue.use(VueApollo)

const cache = new InMemoryCache()

const request = (operation) => {
  const token = localStorage.getItem('token');
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : ''
    }
  })
};

const requestLink = new ApolloLink((operation, forward) =>
  new Observable(observer => {
    let handle;
    Promise.resolve(operation)
      .then(oper => request(oper))
      .then(() => {
        handle = forward(operation).subscribe({
          next: observer.next.bind(observer),
          error: observer.error.bind(observer),
          complete: observer.complete.bind(observer),
        });
      })
      .catch(observer.error.bind(observer));

    return () => {
      if (handle) handle.unsubscribe();
    };
  })
);

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore',
  },
  query: {
    fetchPolicy: 'network-only',
    errorPolicy: 'all',
  },
}

export const defaultClient = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          console.dir(err);
        }
      }
      if (networkError) {
        console.log('networkError', networkError)
      }
    }),
    requestLink,
    new HttpLink({
      uri: 'http://localhost:4000',
      credentials: 'include'
    })
  ]),
  cache,
  defaultOptions
})

const apolloProvider = new VueApollo({ defaultClient })

Vue.config.productionTip = false

new Vue({
  router,
  store,
  apolloProvider,
  render: h => h(App),
  created() {
    this.$store.dispatch('user/getMe')
  }
}).$mount('#app')
