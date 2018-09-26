const xlsx = require('tfk-json-to-xlsx');
const fs = require('fs');
let excelJson = [];

let xTengely = document.querySelector('.xTengely');
let yTengely = document.querySelector('.yTengely');
let zTengely = document.querySelector('.zTengely');
let tetolapVegig = document.querySelector('.tetolap');
let furneros = document.querySelector('.furneros');
let vanTetolap = document.querySelector('.vanTetolap');
let mosogatos = document.querySelector('.mosogatos');
let polcok = document.querySelector('.polcok');
let ajtok = document.querySelector('.ajtok');
let pant = document.querySelector('.pant');
let fuggolegesOsztok = document.querySelector('.fuggolegesO');
let vizszintesOsztok = document.querySelector('.vizszintesO');

vanTetolap.addEventListener('click', () => {
  if (vanTetolap.checked) {
    let tetolapVastagsag = `<input type="text" placeholder="tetőlap vastagság" class="vastagsag">`;
    let tetolapEloreNyulas = `<input type="text" placeholder="tetőlap előrelógás" class="elorelogas">`;
    let div = document.querySelector('.pluszTetolap');
    div.innerHTML += tetolapVastagsag;
    div.innerHTML += tetolapEloreNyulas;
  } else {
    let baseDiv = `<div class="box">
                     <input type="checkbox" class="pointer vanTetolap">
                     <p>Van tetőlap</p>
                   </div>`;
    let div = document.querySelector('.pluszTetolap');
    div.innerHTML = baseDiv;
  }
});

function oldalak() {
  let baseHeight = parseInt(yTengely.value);
  let baseWidth = parseInt(zTengely.value);

  if (tetolapVegig.checked) {
    if (furneros.checked) {
      baseHeight -= 38;
    } else {
      baseHeight -= 36;
    }
  }
  if (vanTetolap.checked) {
    let vastagsag = document.querySelector('.vastagsag');
    let elorelogas = document.querySelector('.elorelogas');
    baseHeight -= vastagsag.value;
    baseWidth -= elorelogas.value;
  }

  let li = document.createElement('li');
  li.innerText = `${baseHeight} * ${baseWidth}`;

  excelJson.push({
    'elem': 'Oldallap',
    'méretek': `${baseHeight} * ${baseWidth} 2db`,
    'terület': `${((baseHeight * baseWidth) * 2)/1000000} m2`
  })

  return `<tr>
            <td>Oldallap:</td>
            <td>${baseHeight} * ${baseWidth} 2db</td>
            <td>${((baseHeight * baseWidth) * 2)/1000000} m2</td>
          </tr>`
}

function kotok() {
  let baseWidth = parseInt(xTengely.value);

  if (!tetolapVegig.checked) {
    baseWidth -= 36;
    if (furneros.checked) { baseWidth -= 2 };

    if (mosogatos.checked) {

      excelJson.push({
        'elem': 'Kötők',
        'méretek': `${baseWidth} * ${150}`,
        'terület': `${(baseWidth * 150)/1000000} m2`
      })

      return `<tr>
                <td>Kötők:</td>
                <td>${baseWidth} * ${150}</td>
                <td>${(baseWidth * 150)/1000000} m2</td>
              </tr>`
    }else {

      excelJson.push({
        'elem': 'Kötők',
        'méretek': `${baseWidth} * ${100}`,
        'terület': `${(baseWidth * 100)/1000000} m2`
      })

      return `<tr>
                <td>Kötők:</td>
                <td>${baseWidth} * ${100}</td>
                <td>${(baseWidth * 100)/1000000} m2</td>
              </tr>`
    }
  }

}

function feneklap() {
  let baseHeight = parseInt(zTengely.value);
  let baseWidth = parseInt(xTengely.value);

  if(!tetolapVegig.checked) {
    baseWidth -= 36;
    if (furneros.checked) { baseWidth -= 2 };

    if (vanTetolap.checked) {
      let elorelogas = document.querySelector('.elorelogas');
      baseHeight - elorelogas.value;
    }

    if (mosogatos.checked) {
      baseHeight -= 60;

      excelJson.push({
        'elem': 'Fenéklap',
        'méretek': `${baseWidth} * ${baseHeight} 1db`,
        'terület': `${(baseWidth * baseHeight)/1000000} m2`
      })

      return `<tr>
                <td>Fenéklap:</td>
                <td>${baseWidth} * ${baseHeight} 1db</td>
                <td>${(baseWidth * baseHeight)/1000000} m2</td>
              </tr>`
    }else {

      excelJson.push({
        'elem': 'Fenéklap',
        'méretek': `${baseWidth} * ${baseHeight} 1db`,
        'terület': `${(baseWidth * baseHeight)/1000000} m2`
      })

      return `<tr>
                <td>Fenéklap:</td>
                <td>${baseWidth} * ${baseHeight} 1db</td>
                <td>${(baseWidth * baseHeight)/1000000} m2</td>
              </tr>`
    }
  } else {
    if (vanTetolap.checked) {
      let elorelogas = document.querySelector('.elorelogas');
      baseHeight - elorelogas.value;
    }

    excelJson.push({
      'elem': 'Alsó - felső lap',
      'méretek': `${baseWidth} * ${baseHeight} 2db`,
      'terület': `${((baseWidth * baseHeight)*2)/1000000} m2`
    })

    return `<tr>
              <td>Alsó - felső lap:</td>
              <td>${baseWidth} * ${baseHeight} 2db</td>
              <td>${((baseWidth * baseHeight)*2)/1000000} m2</td>
            </tr>`

  }
}

function vizszintesOsztokCalc() {
  let baseHeight = parseInt(zTengely.value) - 4;
  let baseWidth = parseInt(xTengely.value) -36;

  if (furneros.checked) { baseWidth - 2 };

  if (vizszintesOsztok.value > 0) {
    baseWidth - (vizszintesOsztok.value * 36);
    baseWidth / vizszintesOsztok.value;

    if (furneros.checked) { baseWidth - (vizszintesOsztok.value + 2) * 2 }

    if (vanTetolap.checked) {
      let vastagsag = document.querySelector('.vastagsag');
      baseHeight - elorelogas.value;
    }

    excelJson.push({
      'elem': 'Vízszintes osztók',
      'méretek': `${baseWidth} * ${baseHeight} * ${vizszintesOsztok.value} db`,
      'terület': `${((baseHeight * baseWidth) * vizszintesOsztok.value)/1000000} m2`
    })

    return `<tr>
              <td>Vízszintes osztók:</td>
              <td>${baseWidth} * ${baseHeight} * ${vizszintesOsztok.value} db</td>
              <td>${((baseHeight * baseWidth) * vizszintesOsztok.value)/1000000} m2</td>
            </tr>`
  } else {
    return undefined;
  }
}

function fuggolegesOsztokCalc() {
  let baseHeight = parseInt(yTengely.value);
  let baseWidth = parseInt(zTengely.value) - 4;

  if (fuggolegesOsztok.value > 0) {

    baseHeight -= 36
    if (furneros.checked) { baseHeight -= 2 }

    if (vanTetolap.checked) {
      let vastagsag = document.querySelector('.vastagsag');
      let elorelogas = document.querySelector('.elorelogas');
      baseHeight -= vastagsag.value;
      baseWidth -= elorelogas.value;
    }

    excelJson.push({
      'elem': 'Függőleges osztók',
      'méretek': `${baseHeight} * ${baseWidth} * ${fuggolegesOsztok.value} db`,
      'terület': `${((baseHeight * baseWidth) * fuggolegesOsztok.value)/1000000} m2`
    })

    return `<tr>
              <td>Függőleges osztók:</td>
              <td>${baseHeight} * ${baseWidth} * ${fuggolegesOsztok.value} db</td>
              <td>${((baseHeight * baseWidth) * fuggolegesOsztok.value)/1000000} m2</td>
            </tr>`
  } else {
    return undefined;
  }
}

function polcokCalc() {
  if (polcok.value > 0) {
    let baseHeight = parseInt(zTengely.value) - 19;
    let baseWidth = parseInt(xTengely.value) - 36;

    if (furneros.checked) { baseWidth - (2 + (fuggolegesOsztok.value * 1)) };

    baseWidth - (fuggolegesOsztok.value * 18)

    baseWidth / fuggolegesOsztok.value

    if (vanTetolap.checked) {
      let elorelogas = document.querySelector('.elorelogas');
      baseHeight - elorelogas.value;
    }

    excelJson.push({
      'elem': 'Polcok',
      'méretek': `${baseWidth} * ${baseHeight} * ${polcok.value} db`,
      'terület': `${((baseHeight * baseWidth) * polcok.value)/1000000} m2`
    })

    return `<tr>
              <td>Polcok:</td>
              <td>${baseWidth} * ${baseHeight} * ${polcok.value} db</td>
              <td>${((baseHeight * baseWidth) * polcok.value)/1000000} m2</td>
            </tr>`

  } else {
    return "";
  }
}

function tetolapCalc() {
  let baseHeight = parseInt(zTengely.value);
  let baseWidth = parseInt(xTengely.value);

  if (vanTetolap.checked) {

    excelJson.push({
      'elem': 'Tetőlap',
      'méretek': `${baseWidth} * ${baseHeight} * 1db`,
      'terület': `${(baseHeight * baseWidth)/1000000} m2`
    })

    return `<tr>
              <td>Tetőlap:</td>
              <td>${baseWidth} * ${baseHeight} * 1db</td>
              <td>${(baseHeight * baseWidth)/1000000} m2</td>
            </tr>`
  } else{ return undefined }
}


function ajtokCalc() {
  let ajtokSzama = parseInt(ajtok.value);
  let baseHeight = parseInt(yTengely.value);
  let baseWidth = parseInt(xTengely.value);
/*
  if (ajtokSzama > 0) {
    if (pant.value == 'Ráütödő') {
      baseHeight - 4;
      (baseWidth - (ajtokSzama * 4)) / ajtokSzama;
    } else if (pant.value == 'Félig ráütödő') {
      baseHeight - 4;
      (baseWidth - ((ajtokSzama -1) * 4) - 14) / ajtokSzama;
    } else if (Közézáródó (csak az oldalakon)) {

    }
*/
  if (ajtokSzama > 0) {
    switch (pant.value) {
      case 'Ráütödő':
        baseHeight - 4;
        (baseWidth - (ajtokSzama * 4)) / ajtokSzama;
        break;

      case 'Félig ráütödő':
        baseHeight - 4;
        (baseWidth - ((ajtokSzama -1) * 4) - 14) / ajtokSzama;
        break;

      case 'Közézáródó (csak az oldalakon)':
        baseHeight - 4;
        if (furneros.checked) { baseWidth - 2 }
        ((baseWidth - 42) - ((ajtokSzama - 1) * 4)) /ajtokSzama;
        break;

      case 'Közézáródó (alul fellül)':
        baseHeight - 42;
        if (furneros.checked) { baseHeight - 2 }
        (baseWidth - (ajtokSzama * 4)) / ajtokSzama;
        break;

      case 'Közézáródó (osztók látszanak)':
        baseHeight - 42;
        if (furneros.checked) { baseHeight - 2; baseWidth - (ajtokSzama * 2) }
        (baseWidth - (ajtokSzama * 21)) / ajtokSzama;
        break;

      case 'Mindenhol közézáródó':
        baseHeight - 42;
        if (furneros.checked) { baseHeight - 2; baseWidth - 2 }
        ((baseWidth - 42) - ((ajtokSzama - 1) * 4)) / ajtokSzama;
        break;
    }
    excelJson.push({
      'elem': 'Tetőlap',
      'méretek': `${baseWidth} * ${baseHeight} * ${ajtokSzama}`,
      'terület': `${(baseHeight * baseWidth)/1000000} m2`
    })

    return `<tr>
              <td>Ajtók ${pant.value} pánttal:</td>
              <td>${baseWidth} * ${baseHeight} * ${ajtokSzama}</td>
              <td>${(baseHeight * baseWidth)/1000000} m2</td>
            </tr>`
  } else { return undefined }
}







document.querySelector('.btn').addEventListener('click', () => {

  document.querySelector('.tableContainer').innerHTML += `
                  <div class="tables">
                    <h2>${document.querySelector('.tablazatnev').value}</h2>
                    <table>
                      <thead>
                        <tr>
                          <td><p>Alkatrész</p></td>
                          <td><p>Méretek</p></td>
                          <td><p>m2</p></td>
                        </tr>
                      </thead>
                      <tbody class="materialList">
                      </tbody>
                    </table>
                  </div>`

  let tbody =  document.querySelectorAll(".materialList");
  let name = document.querySelector('.tablazatnev').value
  excelJson.push({
    'elem': name,
    'méretek': ` `,
    'terület': ` `
  });

  if (oldalak() != undefined) { tbody[tbody.length-1].innerHTML += oldalak() }
  if (kotok() != undefined) { tbody[tbody.length-1].innerHTML += kotok() }
  if (feneklap() != undefined) { tbody[tbody.length-1].innerHTML += feneklap() }
  if (vizszintesOsztokCalc() != undefined) { tbody[tbody.length-1].innerHTML += vizszintesOsztokCalc() }
  if (fuggolegesOsztokCalc() != undefined) { tbody[tbody.length-1].innerHTML += fuggolegesOsztokCalc() }
  if (polcokCalc() != undefined) { tbody[tbody.length-1].innerHTML += polcokCalc() }
  if (tetolapCalc() != undefined) { tbody[tbody.length-1].innerHTML += tetolapCalc() }
  if (ajtokCalc() != undefined ) { tbody[tbody.length-1].innerHTML += ajtokCalc() }
});

document.querySelector('.excel').addEventListener('click', () => {
  const dir = __dirname + '/../../../tablazatok';
  if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
  let filename = document.querySelector('.fileName').value;

  xlsx.write(__dirname + `/../../../tablazatok/${filename}.xlsx`, excelJson, function (error) {
    if (error) {
      console.error(error)
    }
  })

});
