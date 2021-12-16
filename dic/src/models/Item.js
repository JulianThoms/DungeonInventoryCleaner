export default class Item {
  emote;
  name;
  level;
  amount;

  constructor(emote, name, level) {
    this.emote = emote;
    this.name = name;
    this.level = level;
    this.amount = 1;
  }

  CompareTo(obj) {
    return obj.level - this.level;
  }

  toString = function () {
    let text = ":" + this.emote + ": " + this.name + this.level;
    if (this.amount > 1) {
      text += " ( " + this.amount + "x )";
    }
    return text;
  };
}
