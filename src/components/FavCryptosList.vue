<template>
  <div class="cryptos-list-container">
    <div class="tabs is-fullwidth">
      <ul>
        <li :class="{'is-active': tab === 'top'}" @click="tab = 'top'"><a>Top</a></li>
        <li :class="{'is-active': tab === 'favorites'}" @click="tab = 'favorites'"><a>Favorites</a></li>
        <li :class="{'is-active': tab === 'portfolio'}" @click="tab = 'portfolio'"><a>Portfolio</a></li>
      </ul>
    </div>
    <div class="fav-cryptos-container">
      <div v-show="tab === 'top'">
        <div v-for="(crypto, i) in cryptosList" :key="i">
          <FavCryptosListCard
            :fullName="crypto.fullName"
            :name="crypto.name.toLowerCase()"
            :price="crypto.close.toLocaleString()"
            :change="crypto.percent.toLocaleString()"
          />
        </div>
      </div>
      <div v-show="tab === 'favorites'">
        <div v-for="(crypto, i) in favoriteCryptosList" :key="i">
          <FavCryptosListCard
            :fullName="crypto.fullName"
            :name="crypto.name.toLowerCase()"
            :price="crypto.close.toLocaleString()"
            :change="crypto.percent.toLocaleString()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import FavCryptosListCard from '@/components/FavCryptosListCard.vue'

export default {
  name: 'FavCryptosList',
  components: {
    FavCryptosListCard
  },
  data() {
    return {
      tab      : 'top',
      endpoint : 'wss://stream.binance.com:9443/ws/!ticker@arr',
      cache    : {},             // cryptos data cache
      cryptos  : [],             // live coin list from api
      asset    : 'USDT',         // filter by base asset pair
      search   : '',             // filter by search string
      sort     : 'assetVolume',  // sort by param
      order    : 'desc',         // sort order ( asc, desc )
      limit    : 30,             // limit list
      status   : 0,              // socket status ( 0: closed, 1: open, 2: active, -1: error )
      sock     : null,           // socket inst
    }
  },
  mounted() {
    this.sockInit()
    if (this.$store.getters['coins/coins'].length === 0) {
      this.getAllCoins()
    }
  },
  computed: {
    cryptosList() {
      let list = this.cryptos.slice();
      if (this.coins && this.coins.length !== 0) {
        const coinsNames = this.coins.map(coin => coin.CoinInfo.Name)
        list = list.filter(crypto => coinsNames.includes(crypto.name))
      }
      let search = this.search.replace( /[^\s\w\-\.]+/g, '' ).replace( /[\r\s\t\n]+/g, ' ' ).trim();

      if ( this.asset ) {
        list = list.filter( i => i.asset === this.asset );
      }
      if ( search && search.length > 1 ) {
        let reg = new RegExp( '^('+ search +')', 'i' );
        list = list.filter( i => reg.test( i.token ) );
      }
      if ( this.sort ) {
        list = this.sortList( list, this.sort, this.order );
      }
      if ( this.limit ) {
        list = list.slice( 0, this.limit );
      }
      return list;
    },
    favoriteCryptosList() {
      if (this.user) {
        return this.cryptos.filter(crypto => this.user.favCryptos.includes(crypto.name) && crypto.asset === "USDT")
      }
    },
    ...mapGetters('user', ['user']),
    ...mapGetters('coins', ['coins'])
  },
  methods: {
    async getAllCoins(){
      this.$store.dispatch('coins/getCoins')
    },
    sortBy( key, order ) {
      if ( this.sort !== key ) { this.order = order || 'asc'; }
      else { this.order = ( this.order === 'asc' ) ? 'desc' : 'asc'; }
      this.sort = key;
    },
    filterAsset( asset ) {
      this.asset = String( asset || 'BTC' );
    },
    setLimit( limit ) {
      this.limit = parseInt( limit ) || 0;
    },
    onSockOpen( e ) {
      this.status = 1; // open
      console.info( 'WebSocketInfo:', 'Connection open ('+ this.endpoint +').' );
    },
    onSockClose( e ) {
      this.status = 0; // closed
      console.info( 'WebSocketInfo:', 'Connection closed ('+ this.endpoint +').' );
      setTimeout( this.sockInit, 10000 ); // try again
    },
    onSockError( err ) {
      this.status = -1; // error
      console.error( 'WebSocketError:', err.message || err );
      setTimeout( this.sockInit, 10000 ); // try again
    },
    onSockData( e ) {
      let list = JSON.parse( e.data ) || [];
      for ( let item of list ) {
        // cleanup data for each coin
        let c = this.getCoinData( item );
        this.cache[ c.symbol ] = c;
      }
      // convert cache object to final prices list for each symbol
      this.cryptos = Object.keys( this.cache ).map( s => this.cache[ s ] );
      this.status = 2; // active
    },
    sockInit() {
      if ( this.status > 0 ) return;
      try {
        this.status = 0; // closed
        this.sock = new WebSocket( this.endpoint );
        this.sock.addEventListener( 'open', this.onSockOpen );
        this.sock.addEventListener( 'close', this.onSockClose );
        this.sock.addEventListener( 'error', this.onSockError );
        this.sock.addEventListener( 'message', this.onSockData );
      }
      catch( err ) {
        console.error( 'WebSocketError:', err.message || err );
        this.status = -1; // error
        this.sock = null;
      }
    },
    sockClose() {
      if ( this.sock ) {
        this.sock.close();
      }
    },
    getCoinData( item ) {
      let reg         = /^([A-Z]+)(BTC|ETH|BNB|USDT|TUSD)$/;
      let symbol      = String( item.s ).replace( /[^\w\-]+/g, '' ).toUpperCase();
      let token       = symbol.replace( reg, '$1' );
      let asset       = symbol.replace( reg, '$2' );
      let name        = token;
      let pair        = token +'/'+ asset;
      let open        = parseFloat( item.o );
      let high        = parseFloat( item.h );
      let low         = parseFloat( item.l );
      let close       = parseFloat( item.c );
      let change      = parseFloat( item.p );
      let percent     = parseFloat( item.P );
      let trades      = parseInt( item.n );
      let tokenVolume = Math.round( item.v );
      let assetVolume = Math.round( item.q );

      let find = this.coins.find(coin => coin.CoinInfo.Name === name)
      let fullName    = find ? find.CoinInfo.FullName : name
      return { symbol, token, asset, name, fullName, pair, open, high, low, close, change, percent, trades, tokenVolume, assetVolume };
    },
    sortList( list, key, order ) {
      return list.sort( ( a, b ) => {
        let _a = a[ key ];
        let _b = b[ key ];

        if ( _a && _b ) {
          _a = ( typeof _a === 'string' ) ? _a.toUpperCase() : _a;
          _b = ( typeof _b === 'string' ) ? _b.toUpperCase() : _b;

          if ( order === 'asc' ) {
            if ( _a < _b ) return -1;
            if ( _a > _b ) return 1;
          }
          if ( order === 'desc' ) {
            if ( _a > _b ) return -1;
            if ( _a < _b ) return 1;
          }
        }
        return 0;
      });
    },
  }
}
</script>

<style lang="scss">
.fav-cryptos-container {
  overflow: auto;
  height: 85vh;
}

.cryptos-list-container {
  position: -webkit-sticky;
  position: sticky;
  top: 55px;
}

.tabs:not(:last-child) {
  margin-bottom: 0px;
}
</style>
