// json request function
  let query;

  // change handler
  let form = document.forms[0]
  let results = document.getElementById('results')
  let searchBtn = form.elements.searchbtn
  let Svalue = form.elements.searchValue

  Svalue.addEventListener('input', () => {
    query = Svalue.value
  })

  searchBtn.addEventListener('click', () => {
    if(results.rows.length > 1) {
          for (let i = 30; i > 0; i--) {
            results.rows[i].remove()
          }
        }
    let url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=bb87f388b7b6546360303c48fe6b8b8e&format=json`;
    renderData(url)
  })

  document.body.addEventListener('keydown', (e) => {
    if(e.code == 'Enter') {
      if(results.rows.length > 1) {
            for (let i = 30; i > 0; i--) {
              results.rows[i].remove()
            }
          }
      let url = `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${query}&api_key=bb87f388b7b6546360303c48fe6b8b8e&format=json`;
      renderData(url)
      e.preventDefault()
    }
  })

  function renderData (url) {
    fetch(url).then(response => {
      if(response.ok) {
        return response.json()
      }
      throw new Error('Bad Request')
    }, networkerror => console.log(networkerror.message)).then(jsonResponse => {

      let dataArr = jsonResponse['results']['trackmatches']['track']

      for (let i = 0; i < dataArr.length; i++) {
        let songName = dataArr[i].name
        let artistName = dataArr[i].artist
        let link = dataArr[i].url
        let listeners = dataArr[i].listeners
        let artwork = dataArr[i].image[1]['#text']

        // tr

        let tr = document.createElement('tr')


        // play td
        let playTD = document.createElement('td')
        let a = document.createElement('a')
        a.href = link
        a.innerHTML = '<i class="fas fa-play"></i>'
        playTD.append(a)

        // song td
        let songTD = document.createElement('td')
        songTD.innerHTML = songName

        // artist td
        let artistTD = document.createElement('td')
        artistTD.innerHTML = artistName

        //artwork td

        let artworkTD = document.createElement('td')
        let img = document.createElement('img')
        img.src = artwork
        artworkTD.append(img)

        // listener td
        let listenerTD = document.createElement('td')
        listenerTD.innerHTML = listeners

        // td tr append
        tr.append(artworkTD)
        tr.append(songTD)
        tr.append(artistTD)
        tr.append(listenerTD)
        tr.append(playTD)
        results.append(tr)
      }
    })
  }
