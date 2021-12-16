export default class Item {
    name
    level
    amount
  
    constructor(name, level) {
      this.name = name
      this.level = level
      this.amount = 1
    }
  
    CompareTo(obj) {
      return obj.level - this.level
    }

    toString = function() {
        let text =  this.name + this.level
        if ( this.amount > 1){
            text += " ( " +  this.amount + "x )"
        }
        return text;
    }
  }