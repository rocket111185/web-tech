export default class Message {
  constructor (id, text, author) {
    this.id = id;
    this.text = text;
    this.author = author || 'Anonymous';
  }
}
