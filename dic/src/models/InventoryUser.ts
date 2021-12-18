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

  sortItems(items: Item[]): Item[] {
    return items.sort(function (a, b) {
      return b.level - a.level;
    });
  }

  CheckIfFilter(item: Item, filterList: string[]): boolean {
    if (filterList != null && filterList.length != 0) {
      for (let i of filterList) {
        if (
          item.name.toLowerCase().includes(i) &&
          i.length > 2 &&
          item.name.length > 2
        ) {
          return true;
        }
      }
    }
    return false;
  }

  // Please don't codereview
  GroupDupItems(filteredList) {
    // filter duplicates to amounts
    let filteredDupItems = [];

    for (let comparableItem of filteredList) {
      let amtStuff = filteredList.filter(
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
    return filteredDupItems;
  }

  toString = function (
    filterList: string[],
    addPrice: boolean,
    basePrice: number,
    grpItemGrps: boolean,
    grpDups: boolean
  ): string {
    let filteredList = this.items.filter(
      (item) => !this.CheckIfFilter(item, filterList)
    );

    if (grpDups) {
      filteredList = this.GroupDupItems(filteredList);
    }

    return filteredList
      .map((item) => {
        return item.toString(addPrice, basePrice);
      })
      .join("\n");
  };
  // return this.prettierList.toString().split(",").join("\n");
}
