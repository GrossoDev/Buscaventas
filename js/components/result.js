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
    seller_id: {
      type: Number,
      required: true
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