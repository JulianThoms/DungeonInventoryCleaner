export default class Item {
  emote: string;
  name: string;
  level: number;
  amount: number;
  padding: number;

  constructor(emote: string, name: string, level: number) {
    this.emote = emote;
    this.name = name;
    this.level = level;
    this.amount = 1;
    if (this.emote === null || this.emote === "" || this.emote === " ") {
      let emoteFix = this.name.replace(/\s+/g, "");
      if (emoteFix === "BFCannon") {
        emoteFix = "bfcannon";
      }
      this.emote = emoteFix;
    }
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
    console.log(this.name.length);
    return this.name.length;
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
    padding: number = 0,
    makeCode: boolean = false
  ) {
    let nameStuff = "";
    if (makeCode) {
      nameStuff += "`";
    }
    nameStuff += this.name + this.level;

    nameStuff = nameStuff.padEnd(padding);
    if (makeCode) {
      nameStuff += "`";
    }
    let text = ":" + this.emote + ": " + nameStuff;
    console.log(text);
    
    if (addPrice) {
      text += this.getPrice(basePrice);
    }
    if (this.amount > 1) {
      text += " ( " + this.amount + "x )";
    }
    return text;
  };
}
