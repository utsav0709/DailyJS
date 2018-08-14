// Model Area
let model = {
  init: function () {
    this.catData = {
      'Kelly': ["./resources/other/images/ccpr/1.jpeg", 0],
      'Julie': ["./resources/other/images/ccpr/2.jpeg", 0],
      'Teo': ["./resources/other/images/ccpr/3.jpeg", 0],
      'Cleo': ["./resources/other/images/ccpr/4.jpeg", 0],
      'Paroh': ['./resources/other/images/ccpr/5.jpeg', 0],
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
