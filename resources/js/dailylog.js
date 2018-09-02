const model = {
  projectData: {},
  totalTime: 0
}

const controller = {
  addProject: function (name) {
    let option = new Option(name, name, true)
    option.dataset.id = Math.floor(Math.random() * 1e4)
    view.select.append(option)
  },
  updateProjectData: function () {
    let dataObj = {};
    dataObj.projectName = view.select.value
    dataObj.projectId = view.select.options[view.select.selectedIndex].dataset.id;
    if (!view.workDescription.value) {
      alert('Please enter Work Description')
      view.workDescription.focus()
      return;
    } else {
      dataObj.description = view.workDescription.value
    }
    if (!view.time.value) {
      alert('Please enter Minutes')
      view.time.focus()
      return;
    } else {
      dataObj.time = view.time.value;
    }
    if (!model.projectData[view.select.options[view.select.selectedIndex].dataset.id]) {
      model.projectData[view.select.options[view.select.selectedIndex].dataset.id] = [dataObj]
      view.createWorkDescription(dataObj.projectId, dataObj.time, dataObj.projectName, dataObj.description)
    } else {
      model.projectData[view.select.options[view.select.selectedIndex].dataset.id].push(dataObj)
      view.updateDescriptionLi(dataObj.projectId, dataObj.description, dataObj.time)
      view.updateProjectTime(dataObj.projectId, dataObj.time)
    }
    view.renderTotalTime(dataObj.time)

  },
  getTotalTime: function () {
    return model.totalTime
  },
  updateTotalTime: function (time) {
    model.totalTime = time
  },
  timeParser: function (time) {
    let hour = Math.floor(+time / 60);
    let minutes = +time % 60
    let newFormat;
    if (minutes < 10) {
      newFormat = `${hour}:0${minutes}`
    } else {
      newFormat = `${hour}:${minutes}`
    }
    return newFormat
  },
  init: function () {
    view.init()
    this.addProject('Backlog')
    this.addProject('Overhead Work')
    this.addProject('Client Features')
  }
}

const view = {
  init: function () {
    view.form = document.forms[0];
    view.select = view.form.elements.project;
    view.workDescription = view.form.elements.workDescription;
    view.time = view.form.elements.time;
    view.btn = document.querySelector('button');
    view.stickies = document.getElementById('stickies')
    view.totalTime = document.getElementById('totalTime')
    view.btn.addEventListener('click', clickHandler)
    function clickHandler (event) {
      event.preventDefault()
      controller.updateProjectData()
    }
  },
  createWorkDescription: function (projectId, time, projectName, description) {
    let stickyDiv = document.createElement('div')
    stickyDiv.classList.add('project-sticker')
    stickyDiv.dataset.projectId = projectId
    let timeP = document.createElement('p')
    timeP.dataset.projectTime = time
    timeP.innerHTML = controller.timeParser(time)
    timeP.dataset.timeId = projectId
    let projectNameP = document.createElement('p')
    projectNameP.innerHTML = projectName
    let workDescriptionUl = document.createElement('ul')
    workDescriptionUl.id = projectId
    let timeSpan = document.createElement('span')
    timeSpan.classList.add('time-span')
    timeSpan.innerHTML = controller.timeParser(time)
    workDescriptionUl.append(timeSpan)
    let descriptionSpan = document.createElement('span')
    descriptionSpan.innerHTML = description
    workDescriptionUl.append(descriptionSpan)
    stickyDiv.append(timeP)
    stickyDiv.append(projectNameP)
    stickyDiv.append(workDescriptionUl)
    view.stickies.append(stickyDiv)
  },
  updateDescriptionLi: function (projectId, description, time) {
    let ul = document.getElementById(`${projectId}`);
    let br = document.createElement('br')
    ul.append(br)
    let timeSpan = document.createElement('span')
    timeSpan.innerHTML = controller.timeParser(time)
    ul.append(timeSpan)
    let descriptionSpan = document.createElement('span')
    descriptionSpan.innerHTML = description
    ul.append(descriptionSpan)
  },
  renderTotalTime: function (time) {
    let elaspedTime = controller.getTotalTime()
    time = +time + elaspedTime
    controller.updateTotalTime(time)
    view.totalTime.innerHTML = controller.timeParser(time)
  },
  updateProjectTime: function (projectId, time) {
    let elem = document.querySelector(`[data-time-id="${projectId}"]`);
    let projectElaspedTime = +elem.dataset.projectTime
    time = +time + projectElaspedTime
    elem.dataset.projectTime = time
    elem.innerHTML = controller.timeParser(time)
  }

}
// init
controller.init()
