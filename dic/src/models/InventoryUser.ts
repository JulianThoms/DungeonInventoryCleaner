import Item from "./Item";

export default class InventoryUser {
  items: Item[];

  constructor() {
    this.items = [];
  }

  AddItem(item: Item) {
    this.items.push(item);
  }

  ParseItem(text: string): boolean {
    let re = /:([^:]+):\s([^:]+)(\d).*$/;
    // we need 3 capture grps. First is icon, second is name, third is level
    if (re.test(text)) {
      let matches = text.match(re);
      if (isNaN(parseInt(matches[3].trim()))) {
        return false;
      }
      try {
        this.AddItem(
          new Item(matches[1], matches[2], parseInt(matches[3].trim()))
        );
      } catch (e) {
        return false;
      }
    }
  }

  FindItemsOfType(item: Item) {
    return this.items.filter((a) => a.name == item.name);
  }

  RemoveItems(items: Item[]) {
    let success = true;
    for (let i of items) {
      success = this.RemoveItem(i);
      if (!success) {
        return false;
      }
    }
    return true;
  }

  RemoveItem(item: Item): boolean {
    let index = this.items.findIndex(
      (a) => a.name == item.name && a.level == item.level
    );
    if (index == -1) {
      return false;
    }
    this.items.splice(index, 1);
    return true;
  }

  SortItems(items: Item[]): Item[] {
    return items.sort(function (a, b) {
      return b.level - a.level;
    });
  }

  CheckIfFilter(filterList: string[]) {
    this.items = this.items.filter((item) => {
      if (filterList != null && filterList.length != 0) {
        for (let i of filterList) {
          if (
            item.name.toLowerCase().includes(i) &&
            i.length > 2 &&
            item.name.length > 2
          ) {
            return false;
          }
        }
      }
      return true;
    });
  }

  // Please don't codereview
  GroupDupItems() {
    // filter duplicates to amounts
    let filteredDupItems = [];

    for (let comparableItem of this.items) {
      let amtStuff = this.items.filter(
        (item) =>
          item.level == comparableItem.level && item.name == comparableItem.name
      );
      if (amtStuff.length > 1) {
        amtStuff[0].amount = amtStuff.length;
      }
      if (
        !filteredDupItems.some(
          (e) => e.name === amtStuff[0].name && e.level === amtStuff[0].level
        )
      ) {
        filteredDupItems.push(amtStuff[0]);
      }
    }
    this.items = filteredDupItems;
  }

  SortItemGroups() {
    this.items.sort((a, b) => a.compareTo(b));
    
    let copy = [];
    for (let i = 0; i<this.items.length; i++){
      if (i == 0 || i == this.items.length-1){
        copy.push(this.items[i]);
      }
      else if (this.items[i].name != this.items[i+1].name){
        copy.push(this.items[i]);
        copy.push("")
      }
      else{
        copy.push(this.items[i])
      }
    }
    this.items = copy;
  }

  toString = function (
    filterList: string[],
    addPrice: boolean,
    basePrice: number,
    grpItemGrps: boolean,
    grpDups: boolean
  ): string {
    this.CheckIfFilter(filterList);

    if (grpDups) {
      this.GroupDupItems();
    }

    if (grpItemGrps) {
      this.SortItemGroups();
    }

    return this.items
      .map((item) => {
        return item.toString(addPrice, basePrice);
      })
      .join("\n");
  };
  // return this.prettierList.toString().split(",").join("\n");
}
