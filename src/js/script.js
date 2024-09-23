/* Load Video -- INICIO */
function loadVideo(_element, _id, _src) {
  _element.style.display = "none";
  domHTML = document.getElementById(_id);
  domHTML.style.display = "block";
  domHTML.innerHTML =
    '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' +
    _src +
    '?autoplay=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
}
/* LOad Video -- FIM */

/* Caderno de notas -- INICIO */
async function getSelectionText(_unidade) {
  var text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  } else {
  }
  if (text == "") {
    alert(
      "Por favor, selecione a parte do texto que deseja salvar no caderno de notas"
    );
    return;
  }
  const currentDate = new Date();
  const date = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  var seconds = currentDate.getSeconds();
  var minutes = currentDate.getMinutes();
  var hour = currentDate.getHours();
  // show in specific format
  let monthDateYear = date + "/" + month + "/" + year;
  hour = hour + ":" + minutes + ":" + seconds;

  var element =
    "<div style='background-color: #FEF7EA; margin: 20px; padding: 20px;'>";
  element +=
    "<p style='color: #666666'><b>" +
    _unidade +
    ":</b> Anotação pessoal salva em <b>" +
    monthDateYear +
    " " +
    hour +
    "</b><br></p>";
  element += "<i style='font-size: 120%;'>" + text + "</i>";
  element += "</div>";
  element += "<p> &nbsp </p>";
  setTimeout(
    async () => console.log(await navigator.clipboard.writeText(element)),
    500
  );
  setTimeout(function () {
    window.open(
      "https://unasus-quali.moodle.ufsc.br/mod/assign/view.php?id=1287&action=editsubmission",
      "caderno_de_notas"
    );
  }, 1000);
  return text;
}
/* Caderno de notas -- FIM */

/* gotoNext -- INICIO*/
async function gotoNext(_element, _selector, animateIn, animateOut) {
  domHTMLs = document.querySelectorAll(_selector);

  for (let i = 0; i < domHTMLs.length; i++) {
    if (window.getComputedStyle(domHTMLs[i], null).display == "block") {
      index = i;
      break;
    }
  }

  index2 = index + 1 > domHTMLs.length - 1 ? 0 : index + 1;

  domHTMLs[index].style.animationDuration = "0.2s";
  await animateCSS(domHTMLs[index], animateIn, true);
  domHTMLs[index].style.display = "none";

  domHTMLs[index2].style.animationDuration = "0.2s";
  animateCSS(domHTMLs[index2], animateOut, true);
  domHTMLs[index2].style.display = "block";
}
/* gotoNext -- FIM*/

/* gotoPrevious -- INICIO*/
async function gotoPrevious(_element, _selector, animateIn, animateOut) {
  domHTMLs = document.querySelectorAll(_selector);

  for (let i = 0; i < domHTMLs.length; i++) {
    if (window.getComputedStyle(domHTMLs[i], null).display == "block") {
      index = i;
      break;
    }
  }

  index2 = index > 0 ? index - 1 : domHTMLs.length - 1;

  if (animateIn == "") animateIn = "none";
  if (animateOut == "") animateOut = "none";

  domHTMLs[index].style.animationDuration = "0.2s";
  await animateCSS(domHTMLs[index], animateOut, true);
  domHTMLs[index].style.display = "none";

  domHTMLs[index2].style.animationDuration = "0.2s";
  animateCSS(domHTMLs[index2], animateIn, true);
  domHTMLs[index2].style.display = "block";
}
/* gotoPrevious -- FIM*/

async function showhide(event, _selectorHideShow) {
  domHTML2 = document.querySelector(_selectorHideShow);
  if (window.getComputedStyle(domHTML2).display == "none")
    goto3(_selectorHideShow);
  else goto2(_selectorHideShow);

  try {
    event.stopPropagation();
  } catch (exceptionVar) {
    return;
  } finally {
    return;
  }
}

/* goto -- INICIO*/
async function goto(event, _selectorHide, _selectorShow) {
  goto2(_selectorHide);
  goto3(_selectorShow);

  try {
    event.stopPropagation();
  } catch (exceptionVar) {
    return;
  } finally {
    return;
  }
}

async function goto2(_selectorHide) {
  domHTML2 = document.querySelectorAll(_selectorHide);

  for (const dom of domHTML2) {
    if (
      window.getComputedStyle(dom).display == "block" ||
      window.getComputedStyle(dom).display == ""
    ) {
      dom.style.display = "none";
    }
  }
}

async function goto3(_selectorShow) {
  domHTML3 = document.querySelectorAll(_selectorShow);
  for (const dom of domHTML3) {
    if (window.getComputedStyle(dom).display == "none") {
      // dom.style.animationDuration = '0.2s';
      //animateCSS(dom,  'fadeIn', true);
      dom.style.display = "block";
    }
  }
}

/* goto -- FIM*/

const animateCSS = (element, animation, remove, prefix = "animate__") =>
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = element;

    node.classList.add(`${prefix}animated`, animationName);

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      if (remove) node.classList.remove(`${prefix}animated`, animationName);
      resolve("Animation ended");
    }

    node.addEventListener("animationend", handleAnimationEnd, { once: true });
  });

var observer = [];

function animate(element, animation) {
  if (window.innerWidth <= 560) {
    return;
  } else {
    domHTMLs = document.querySelectorAll(element);
    for (let i = 0; i < domHTMLs.length; i++) {
      animate1(domHTMLs[i], animation);
    }
  }
}
animate(".anima", "fadeIn");
// animate('.anima', 'slideInLeft');

function animate1(domHTML, animation) {
  domHTML.style.visibility = "hidden";

  var obs = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutationRecord) {
      domHTML.style.visibility = "visible";
      animateCSS(domHTML, animation, false);
    });
  });

  var target = document.getElementById("myId");
  obs.observe(domHTML, { attributes: true, attributeFilter: ["style"] });

  obs = new IntersectionObserver(
    function (entries) {
      if (entries[0]["isIntersecting"] === true) {
        if (entries[0]["intersectionRatio"] >= 0.3) {
          domHTML.style.visibility = "visible";
          animateCSS(domHTML, animation, false);
        }
      }
    },
    {
      threshold: [0, 0.5, 1],
    }
  );
  observer.push(obs);

  observer.pop().observe(domHTML);
}

function includeHTML() {
  var z, i, elmnt, file, xhttp;
  /* Loop through a collection of all HTML elements: */
  z = document.getElementsByTagName("*");
  for (i = 0; i < z.length; i++) {
    elmnt = z[i];
    /*search for elements with a certain atrribute:*/
    file = elmnt.getAttribute("w3-include-html");
    if (file) {
      /* Make an HTTP request using the attribute value as the file name: */
      xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            elmnt.innerHTML = this.responseText;
          }
          if (this.status == 404) {
            elmnt.innerHTML = "Page not found.";
          }
          /* Remove the attribute, and call this function once more: */
          elmnt.removeAttribute("w3-include-html");
          includeHTML();
        }
      };
      xhttp.open("GET", file, true);
      xhttp.send();
      /* Exit the function: */
      return;
    }
  }
}

// Função para carregar o arquivo SVG
async function loadSVG(_svgFilePath) {
  try {
    const response = await fetch(_svgFilePath);
    const svgCode = await response.text();

    // Retorna o código SVG
    return svgCode;
  } catch (error) {
    console.error("Erro ao carregar o arquivo SVG:", error);
    return "";
  }
}

// Função para carregar todos os SVGs
async function loadAllSVGs() {
  let chapter = document.querySelector("body").id;
  if (chapter == "") return;

  let elements = document.querySelectorAll("[id*='figura']");

  let promises = Array.from(elements).map(async (element) => {
    let imgNumber = element.id[element.id.length - 1];
    if (element.id.includes("mobile")) {
      element.innerHTML = await loadSVG(
        `img/un${chapter}/figura_${imgNumber}_mobile.svg`
      );
      element.classList.add("d-block", "d-md-none");
    } else {
      element.innerHTML = await loadSVG(
        `img/un${chapter}/figura_${imgNumber}.svg`
      );
      element.classList.add("d-none", "d-md-block");
    }
  });

  await Promise.all(promises);
}

function navigate(option) {
  (mainPageURL = "https://unasus-cp.moodle.ufsc.br/course/view.php?id=416"),
    (pages = [
      "sobre-o-curso.html",
      "desafio.html",
      "unidade-1.html",
      "unidade-2.html",
      "unidade-3.html",
      "reconhecendo-a-realidade.html",
      "questoes-avaliativas.html",
      "tomada-de-opiniao.html",
    ]);

  currentPageURL = window.location.href;
  lastSlashIndex = currentPageURL.lastIndexOf("/");
  currentPage = currentPageURL.substring(lastSlashIndex + 1);
  pos = pages.indexOf(currentPage);
  offset = "next" === option ? 1 : -1;

  if (pos + offset < 0 || pos + offset >= pages.length) {
    window.location.href = mainPageURL;
    return;
  }

  window.location.href = currentPageURL.replace(
    currentPage,
    pages[pos + offset]
  );
}

/**
 * Adds an event listener for every element to be closed on an outside click.
 */
function setUpClickOutside() {
  document.addEventListener("click", function (event) {
    let menu = document.getElementById("menu");
    let menuButton = document.getElementById("menuIcon");
    if (!(menu.contains(event.target) || menuButton.contains(event.target))) {
      menu.style.display = "none";
    }
  });
}

// What to do after the page has loaded
document.addEventListener("DOMContentLoaded", async function () {
  await loadAllSVGs();
  setUpClickOutside();
});
