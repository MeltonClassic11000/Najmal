var digicountrieslist = [
  {
    name: "United Kingdom",
    dial_code: "+44",
    code: "GB",
  },
  {
    name: "New Zealand",
    dial_code: "+64",
    code: "NZ",
  },
  {
    name: "Australia",
    dial_code: "+61",
    code: "AU",
  },
  {
    name: "United Arab Emirates",
    dial_code: "+971",
    code: "AE",
  },
  {
    name: "Saudi Arabia",
    dial_code: "+966",
    code: "SA",
  },
  {
    name: "Austria",
    dial_code: "+43",
    code: "AT",
  },
  {
    name: "Brazil",
    dial_code: "+55",
    code: "BR",
  },
  {
    name: "United States",
    dial_code: "+1",
    code: "US",
  },
  {
    name: "Canada",
    dial_code: "+1",
    code: "CA",
  },
  {
    name: "China",
    dial_code: "+86",
    code: "CN",
  },
  {
    name: "Denmark",
    dial_code: "+45",
    code: "DK",
  },
  {
    name: "Czech Republic",
    dial_code: "+420",
    code: "CZ",
  },
  {
    name: "Finland",
    dial_code: "+358",
    code: "FI",
  },
  {
    name: "Germany",
    dial_code: "+49",
    code: "DE",
  },
  {
    name: "Georgia",
    dial_code: "+995",
    code: "GE",
  },
  {
    name: "Iceland",
    dial_code: "+354",
    code: "IS",
  },
  {
    name: "Jamaica",
    dial_code: "+1876",
    code: "JM",
  },
  {
    name: "Norway",
    dial_code: "+47",
    code: "NO",
  },
  {
    name: "Netherlands",
    dial_code: "+31",
    code: "NL",
  },
  {
    name: "Mexico",
    dial_code: "+52",
    code: "MX",
  },
  {
    name: "Poland",
    dial_code: "+48",
    code: "PL",
  },
  {
    name: "Qatar",
    dial_code: "+974",
    code: "QA",
  },
  {
    name: "Romania",
    dial_code: "+40",
    code: "RO",
  },
  {
    name: "Russia",
    dial_code: "+7",
    code: "RU",
  },
  {
    name: "Spain",
    dial_code: "+34",
    code: "ES",
  },
  {
    name: "Switzerland",
    dial_code: "+41",
    code: "CH",
  },
  {
    name: "Sweden",
    dial_code: "+46",
    code: "SE",
  },
  {
    name: "Turkey",
    dial_code: "+90",
    code: "TR",
  },
  {
    name: "Kuwait",
    dial_code: "+965",
    code: "KW",
  },
  {
    name: "Other",
    dial_code: "",
    code: "other",
  },
];

var digiphone_dir = wp_digiphone.dir ?? "";

// onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}

// var digiphone_input = document.querySelector('.digiphone input[type="tel"]');
// digiphone_input.addEventListener('keyup', function() {
//     if(this.value.slice(0, 3)[0] === '+') {
//         this.value.slice(0, 3);
//     }
// });

document.addEventListener("click", function (event) {
  var digiphones = document.querySelectorAll(".digiphone:not(input).active");
  for (let x = 0; x < digiphones.length; x++) {
    let digiphone = digiphones[x];
    if (!digiphone.contains(event.target)) {
      digiphone.classList.remove("active");
    }
  }
});

document.addEventListener("click", function (event) {
  var uls = document.querySelectorAll(".digiphone ul");
  for (let x = 0; x < uls.length; x++) {
    let ul = uls[x];
    if (!ul.parentElement.contains(event.target)) {
      ul.style.display = "none";
    }
  }
});

function digiphone_onkeyup(event) {
  for (let x = 0; x < digicountrieslist.length; x++) {
    let country = digicountrieslist[x];
    if (country.code == "other") continue;
    let { dial_code, code } = country;
    let val = this.value.replace(/\s/g, "");
    if (val.startsWith(dial_code)) {
      setTimeout(() => {
        let imgPreview = this.parentElement.querySelector('span');
        imgPreview.style.backgroundPosition = '0 -' + (x * 24) + 'px';
      }, 50);
      return x;
    } else {
      setTimeout(() => {
        let imgPreview = this.parentElement.querySelector('span');
        imgPreview.style.backgroundPosition = '0 -696px';
      }, 50);
    }
  }
  this.onchange();
}

function digiphone_validation(el) {
  return function () {
    let val = this.value.replace(/\s/g, "");
    if (isNaN(val)) {
      this.setCustomValidity("Invalid Phone Number");
      el.setCustomValidity("Invalid Phone Number");
    } else {
      el.value = val;
      this.setCustomValidity("");
      el.setCustomValidity("");
    }
  };
}



function render_digiphone(el) {
  // Digiphone

  let digiphone = document.createElement("div");
  digiphone.classList.add("digiphone");

  // Digiphone > Field

  let dpfield = document.createElement("div");
  dpfield.classList.add("field");
  digiphone.appendChild(dpfield);

  // Digiphone > Field > Span

  let dpfspan = document.createElement("span");
  dpfspan.onclick = function () {
    let ul = this.parentNode.parentNode.children[1];
    ul.style.display = ul.style.display == "block" ? "none" : "block";
  };
  dpfield.appendChild(dpfspan);

  // Digiphone > Field > Input

  let dpinput = document.createElement("input");
  dpinput.onkeyup = digiphone_onkeyup;
  dpinput.onchange = digiphone_validation(el);
  dpinput.type = "tel";
  dpinput.placeholder = el.placeholder.length
    ? el.placeholder
    : "Enter your number";
  dpfield.appendChild(dpinput);

  // Digiphone > UL

  let dpul = document.createElement("ul");
  digiphone.appendChild(dpul);

  for (let x = 0; x < digicountrieslist.length; x++) {
    let country = digicountrieslist[x];
    // Digiphone > UL > LI
    let dpulli = document.createElement("li");
    dpulli.setAttribute("data-index", x);
    dpulli.onclick = digiphone_on_select(dpinput);
    dpul.appendChild(dpulli);

    // Digiphone > UL > LI > Span 1
    let dpullispan2 = document.createElement("span");
    dpullispan2.innerText = country.name;
    dpulli.appendChild(dpullispan2);
    // Digiphone > UL > LI > Span 2
    let dpullispan3 = document.createElement("span");
    dpullispan3.innerText = country.dial_code;
    dpulli.appendChild(dpullispan3);
    // Select first one
    if (dpullispan3.innerText === "+1") {
      dpulli.onclick(dpinput);
    }
  }

  return digiphone;
}

function digiphone_on_select(input) {
  return function () {
    let li = this;
    setTimeout(() => {
      let liIndex = parseInt(li.getAttribute("data-index"), 10);
      let imgPreview = li.parentElement.parentElement.querySelector('.field span');
      imgPreview.style.backgroundPosition = '0 -' + (liIndex * 24) + 'px';

    }, 5);

    let dial_code = li.children[1].innerText;
    let val = input.value.split(" ");
    input.value = dial_code;
    input.value += " " + (val[1] ?? "");
    input.value = input.value.replace(/\s\s+/g, " ");
    li.parentElement.style.display = "none";
    input.onchange();
  };
}

document.addEventListener("DOMContentLoaded", function (event) {
  var digiPhones = document.querySelectorAll("input.digiphone");
  for (let x = 0; x < digiPhones.length; x++) {
    let digiPhone = digiPhones[x];
    let renderedDigiPhone = render_digiphone(digiPhone);
    digiPhone.parentNode.appendChild(renderedDigiPhone);
  }
});
