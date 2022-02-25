// @ts-nocheck
// No type checking because it's impossible to combine with Vue's reactiveness.
// However, types are still declared as hints.

Vue.component('result', {
    template: '#result-template',
    props: {
      id: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true
      },
      sellerId: {
        type: Number,
        required: false
      },
      thumbnail: {
        type: String,
        required: false
      },
      price: {
        type: Number,
        required: true
      }
    },
    methods: {
      remove_result: function() {
        let results = vue.ui_filteringQuery.results;
  
        vue.ui_filteringQuery.results = results.filter(e => e.id != this.id);
      }
    }
  });