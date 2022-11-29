Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{todo.text}}</li>',
});

var app = new Vue({
  el: '#app',
  data: {
    heading: 'A heading to be reversed - press the button!',
    message: 'Practice creating lists',
    inputField: 'Type here to update the message above the input field',

    seen: true,
    todos: [
      { text: 'Download Vue CLI' },
      { text: 'Create new instance of Vue app' },
      { text: 'Add an array for todos' },
    ],
    groceryList: [
      { id: 0, text: 'aubergine' },
      { id: 1, text: 'flour' },
      { id: 2, text: 'cheese' },
    ],
  },
  methods: {
    reverseHeading: function () {
      this.heading = this.heading.split('').reverse().join('');
    },
  },
});

// app.message = 'The message has been changed.';
// app.seen = false;
app.todos.push({ text: 'Style the todo list' });
