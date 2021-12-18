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

  GetPrice(basePrice: number): string {
    let level = this.level;

    while (level != 1) {
      basePrice *= 2;
      level--;
    }

    return " - " + basePrice + " :coin:";
  }

  CompareTo(obj) {
    return obj.level - this.level;
  }

  toString = function (addPrice: boolean, basePrice: number) {
    let text = ":" + this.emote + ": " + this.name + this.level;
    if (addPrice){
      text += this.GetPrice(basePrice)
    }
    if (this.amount > 1) {
      text += " ( " + this.amount + "x )";
    }
    return text;
  };
}
