const map = new Map()
map.set("BF Cannon", 20);
map.set("Big Club", 15);
map.set("Boosting Bugle", 27);
map.set("Challenger Arrow", 32);
map.set("Cleansing Flame", 32);
map.set("Draining Dagger", 30);

export default class Item {
  emote: string;
  name: string;
  level: number;
  amount: number;
  padding: number;

  constructor(emote, name, level) {
    this.emote = emote;
    this.name = name;
    this.level = level;
    this.amount = 1;
  }

  getPrice(basePrice: number): string {
    let level = this.level;

    while (level != 1) {
      basePrice *= 2;
      level--;
    }

    return " - " + basePrice + " :coin:";
  }

  getLength(): number {
    console.log((this.name + this.level).length);
    return map.get(this.name);
  }

  compareTo(obj: Item) {
    if (this.strcmp(obj.name, this.name) == 0) {
      return obj.level - this.level;
    } else {
      return this.strcmp(obj.name, this.name);
    }
  }

  strcmp(a: string, b: string) {
    if (a.toString() < b.toString()) return 1;
    if (a.toString() > b.toString()) return -1;
    return 0;
  }

  toString = function (
    addPrice: boolean,
    basePrice: number,
    padding: number = 0
  ) {
    let nameStuff = this.name + this.level;
    nameStuff = nameStuff.padEnd(padding);
    let text = ":" + this.emote + ": " + nameStuff;
    if (addPrice) {
      text += this.getPrice(basePrice);
    }
    if (this.amount > 1) {
      text += " ( " + this.amount + "x )";
    }
    return text;
  };
}
