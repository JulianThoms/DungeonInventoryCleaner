import Item from "./Item";
import possibleItems from "./items";

export default class InventoryUser {
  items: Item[];

  constructor() {
    this.items = [];
  }

  AddItem(item: Item) {
    this.items.push(item);
  }

  ParseItem(text: string): boolean {
    if (this.DoCheck(text, /:([^:]+):\s([^:]+)(\d).*$/)) {
      return true;
    } else if (this.DoCheck(text, /([^: ]*) ([^0-9]+ )([0-9])/)) {
      return true;
    } else if (
      this.DoCheck(
        text,
        /[*]{2}[0-9]*- __[<]{0,1}:([^:]*):[0-9]*>{0,1} ([^0-9]*)([0-9]).*$/
      )
    ) {
      return true;
    } else {
      try {
        let matches = text.match(/^([^1-9]*)([1-9])/);
        if (isNaN(parseInt(matches[2].trim()))) {
          return false;
        }
        let foundItem = possibleItems.filter(
          (e) => e.name === matches[1].trim()
        );
        if (foundItem.length === 1) {
          this.AddItem(
            new Item(
              foundItem[0].icon,
              foundItem[0].name,
              parseInt(matches[2].trim())
            )
          );
        } else {
          return false;
        }

        return true;
      } catch (e) {
        return false;
      }
    }
  }

  DoCheck(text: string, re: RegExp): boolean {
    if (re.test(text)) {
      let matches = text.match(re);
      if (isNaN(parseInt(matches[3].trim()))) {
        return false;
      }
      try {
        let foundItem = possibleItems.filter(
          (e) => e.name === matches[2].trim()
        );
        if (foundItem.length === 1) {
          this.AddItem(
            new Item(
              foundItem[0].icon,
              foundItem[0].name,
              parseInt(matches[3].trim())
            )
          );
        } else {
          return false;
        }
        return true;
      } catch (e) {
        return false;
      }
    }
  }

  FindItemsOfType(item: Item) {
    return this.items.filter((a) => a.name === item.name);
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
      (a) => a.name === item.name && a.level === item.level
    );
    if (index === -1) {
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

  CheckIfFilter(filterList: string[], checkBoxFilterOption) {
    this.items = this.items.filter((item) => {
      if (filterList !== null && filterList.length !== 0) {
        for (let i of filterList) {
          if (
            item.name.toLowerCase().includes(i) &&
            i.length > 2 &&
            item.name.length > 2
          ) {
            if (!checkBoxFilterOption) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
      if (!checkBoxFilterOption) {
        return true;
      } else {
        return false;
      }
    });
  }

  // Please don't codereview
  GroupDupItems() {
    // filter duplicates to amounts
    let filteredDupItems = [];

    for (let comparableItem of this.items) {
      let amtStuff = this.items.filter(
        (item) =>
          item.level === comparableItem.level && item.name === comparableItem.name
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

  SortItemGroups(addSpace: boolean) {
    this.items.sort((a, b) => a.compareTo(b));

    let copy = [];
    for (let i = 0; i < this.items.length; i++) {
      if (i === 0 || i === this.items.length - 1) {
        copy.push(this.items[i]);
        if (
          i === 0 &&
          this.items.length > 1 &&
          this.items[i].name === this.items[i + 1].name
        ) {
        } else {
          if (addSpace) {
            copy.push("");
          }
        }
      } else if (this.items[i].name !== this.items[i + 1].name) {
        copy.push(this.items[i]);
        if (addSpace) {
          copy.push("");
        }
      } else {
        copy.push(this.items[i]);
      }
    }
    if (copy.at(copy.length - 1) === "") {
      copy.splice(copy.length - 1, 1);
    }
    this.items = copy;
  }

  CombineUpItems() {
    let copyOfItems = this.items;
    let removedItem = false;
    do {
      removedItem = false;
      for (var item in copyOfItems) {
        for (var itemCompare in copyOfItems) {
          if (itemCompare === item || removedItem) {
            continue;
          }
          if (
            copyOfItems[item].name === copyOfItems[itemCompare].name &&
            copyOfItems[item].level === copyOfItems[itemCompare].level &&
            copyOfItems[itemCompare].level !== 9
          ) {
            copyOfItems[item].level++;
            copyOfItems.splice(parseInt(itemCompare), 1);
            removedItem = true;
          }
        }
      }
    } while (removedItem);
    this.items = copyOfItems;
  }

  toString = function (
    filterList: string[],
    addPrice: boolean,
    basePrice: number,
    grpItemGrps: boolean,
    grpDups: boolean,
    combineItems: boolean,
    checkBoxFilterOption: boolean,
    addSpace: boolean
  ): string {
    this.CheckIfFilter(filterList, checkBoxFilterOption);

    if (combineItems) {
      this.CombineUpItems();
    }

    if (grpDups) {
      this.GroupDupItems();
    }

    if (grpItemGrps) {
      this.SortItemGroups(addSpace);
    }

    return this.items
      .map((item: Item) => {
        return item.toString(addPrice, basePrice);
      })
      .join("\n");
  };
  // return this.prettierList.toString().split(",").join("\n"); I dont remember what this line is doing here and I am too afraid to delete because it looks complicated and I will never be able to find the braincells to rewrite it
}
