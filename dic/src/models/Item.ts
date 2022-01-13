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
    if (this.emote === null || this.emote === "" || this.emote === " "){
      let emoteFix = this.name.replace(/\s+/g, '');
      emoteFix = emoteFix.replace("'", "");
      if (emoteFix === "BFCannon"){
        emoteFix = "bfcannon";
      }
      this.emote = emoteFix;
    }
  }

  GetPrice(basePrice: number): string {
    let level = this.level;

    while (level != 1) {
      basePrice *= 2;
      level--;
    }

    return " - " + basePrice + " :coin:";
  }

  compareTo(obj) {
    if (this.strcmp(obj.name, this.name) == 0) {
      return obj.level - this.level;
    } else {
      return this.strcmp(obj.name, this.name);
    }
  }

  strcmp(a, b) {
    if (a.toString() < b.toString()) return 1;
    if (a.toString() > b.toString()) return -1;
    return 0;
}

  toString = function (addPrice: boolean, basePrice: number) {
    let text = ":" + this.emote + ": " + this.name + this.level;
    if (addPrice) {
      text += this.GetPrice(basePrice);
    }
    if (this.amount > 1) {
      text += " ( " + this.amount + "x )";
    }
    return text;
  };
}
