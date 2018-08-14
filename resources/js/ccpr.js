// Model Area
let model = {
  init: function () {
    this.catData = {
      'Kelly': ["https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496", 0],
      'Julie': ["https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496", 0],
      'Teo': ["https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496", 0],
      'Cleo': ["https://lh3.ggpht.com/kixazxoJ2ufl3ACj2I85Xsy-Rfog97BM75ZiLaX02KgeYramAEqlEHqPC3rKqdQj4C1VFnXXryadFs1J9A=s0#w=640&h=496", 0],
      'Paroh': ['https://lh3.ggpht.com/nlI91wYNCrjjNy5f-S3CmVehIBM4cprx-JFWOztLk7vFlhYuFR6YnxcT446AvxYg4Ab7M1Fy0twaOCWYcUk=s0#w=640&h=426', 0],
    }
  }
}


// Octopus Area

let octopus = {

  //  currentSelection cat function
  getCurrentSelection: function () {
    return view.curentValue
  },

  acquireCurrentCatData: function () {
    return model.catData[this.getCurrentSelection]
  },

  updateCurrentCatCounter: function () {
    model.catData[view.currentCat][1] = view.currentCatCount
  },

  getAllCatData: function () {
    return model.catData
  },

  init: function () {
    model.init()
    view.init()
  },
}


// View Area

let view = {
  // create select
  init: function () {
    // select options
    let catData = octopus.getAllCatData()
    console.log(catData['Teo'])
    let form = document.forms[0]
    let select = form.elements.cats
    for (let cat in catData) {
      let option = new Option(cat, cat)
      select.append(option)
    }
    this.currentCat = select.value

    // img div initiation
    let catArea = document.getElementById('catArea')
    let catImage = document.getElementById('catImage')
    let img = document.createElement('img')
    this.currentCatSrc = catData[this.currentCat][0]
    img.src = this.currentCatSrc
    catImage.append(img)

    // click counter initiation

    let clickCount = document.getElementById('clickCount')
    this.currentCatCount = catData[this.currentCat][1]
    clickCount.innerHTML = this.currentCatCount

    // change handler

    form.addEventListener('change', (e) => {
      octopus.updateCurrentCatCounter()
      this.currentCat = select.value
      this.currentCatSrc = catData[this.currentCat][0]
      img.src = this.currentCatSrc
      catImage.replaceWith(img)
      this.currentCatCount = catData[this.currentCat][1]
      clickCount.innerHTML = this.currentCatCount
    })

    // click handler

    catArea.addEventListener('click', (e) => {
      if (!e.target.closest('img')) {
        return
      }
      console.log('kikiey')
      this.currentCatCount++
      clickCount.innerHTML = this.currentCatCount
    })
  }
}

octopus.init()
