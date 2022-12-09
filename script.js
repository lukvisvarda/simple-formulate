const firstName = document.getElementById("name");
const surname = document.getElementById("surname");
const label = document.getElementById("lblname");
const labelSurname = document.getElementById("lblsurname");
const email = document.getElementById("email");
const labelEmail = document.getElementById("lblemail");
const mobileNumber = document.getElementById("mobile-number");
const labelMobile = document.getElementById("lblmobile");
const birthDate = document.getElementById("date");
const labelDate = document.getElementById("lbldate");
const ageInput = document.getElementById("age");
const labelAge = document.getElementById("lblage");
const select1 = document.getElementById("select-1");
const select2 = document.getElementById("select-2");
const select3 = document.getElementById("select-3");
const radio1 = document.getElementById("1");
const radio2 = document.getElementById("2");
const checkboxAnother = document.getElementById("answer3");
const buttonName = document.getElementById("button");
const modal = document.querySelector(".modal");
const showModal = document.querySelector(".show-modal");
const closeModal = document.querySelector(".close-modal");
const checkbox = document.getElementsByName("purpose");
const originalValue = checkbox[checkbox.length - 1].value;

firstName.addEventListener("blur", nameHandler);
surname.addEventListener("blur", surnameHandler);
birthDate.addEventListener("blur", ageHandler);
ageInput.addEventListener("blur", ageHandler);
radio1.addEventListener("click", setCodeVisible);
radio2.addEventListener("click", setCodeVisible);
select1.addEventListener("change", change1);
select2.addEventListener("change", change2);
checkboxAnother.addEventListener("click", setAnswerVisible);
buttonName.addEventListener("click", setNameVisible);
email.addEventListener("blur", emailHandler);
mobileNumber.addEventListener("blur", mobileNumberHandler);
showModal.addEventListener("click", submitHandler);

function submitHandler() {
  const required = [firstName, surname, email, mobileNumber, birthDate, age];
  const labels = [
    label,
    labelSurname,
    labelEmail,
    labelMobile,
    labelDate,
    labelAge,
  ];
  let values = [];
  for (let i = 0; i < 6; i++) {
    let value = required[i].value;
    values.push(value);
    if (!value.trim()) {
      setLabelError(required[i], labels[i], true);
    }
  }
  emailHandler();
  mobileNumberHandler();
  ageHandler();
  const validEmail = labelEmail.style === "none" ? false : true;
  const validPhone = labelMobile.style === "none" ? false : true;
  const validAge = labelAge.style === "none" ? false : true;
  const validBirtDate = labelDate.style === "none" ? false : true;

  if (
    !values.includes("") &&
    validEmail &&
    validPhone &&
    validAge &&
    validBirtDate
  ) {
    getModal();
  }
}

function getModal() {
  let values = getFormValues();
  const modalBody = document.getElementsByClassName("modal-body");

  for (let key in values) {
    const keyText = `${key.toUpperCase()}: `;
    const valueText = `${values[key]}`;
    const keyElement = document.createElement("h3");
    const valueElement = document.createElement("p");
    keyElement.textContent = keyText;
    valueElement.textContent = valueText;

    modalBody[0].appendChild(keyElement);
    modalBody[0].appendChild(valueElement);
  }

  modal.style.display = "block";

  closeModal.onclick = function () {
    while (modalBody[0].firstChild) {
      modalBody[0].removeChild(modalBody[0].lastChild);
      checkbox[checkbox.length - 1].value = originalValue;
    }
    modal.style.display = "none";
  };

  window.onclick = function (e) {
    if (e.target == modal) {
      while (modalBody[0].firstChild) {
        modalBody[0].removeChild(modalBody[0].lastChild);
        checkbox[checkbox.length - 1].value = originalValue;
      }
      modal.style.display = "none";
    }
  };
}

function getFormValues() {
  const gender = document.querySelector('input[name="gender"]:checked').value;
  const radioCode = document.querySelector('input[name="code"]:checked').value;
  const anotherAnswer = document.getElementById("another-answer");
  const sport = document.getElementById("select-1");
  const textSport = sport.options[sport.selectedIndex].text;
  const tools = document.getElementById("select-2");
  const textTools = tools.options[tools.selectedIndex].text;
  const hall = document.getElementById("select-3");
  const textHall = hall.options[hall.selectedIndex].text;
  let purpose = "";
  for (let i = 0; i < checkbox.length; ++i) {
    if (checkbox[i].checked && checkbox[i].value !== "another ") {
      purpose += `${checkbox[i].value} / `;
    }
    if (checkbox[i].checked && checkbox[i].value === "another ") {
      purpose += anotherAnswer.value;
    }
  }
  checkbox[checkbox.length - 1].value = purpose;

  const values = {
    Meno: firstName.value,
    Priezvisko: surname.value,
    Email: email.value,
    "Telefónne číslo": mobileNumber.value,
    Pohlavie: gender,
    Vek: ageInput.value,
    "Dátum narodenia": birthDate.value,
    "Druh športu": textSport,
    Náčinie: textTools,
    Hala: textHall,
    Kupón: radioCode,
    "Kód kupónu": document.getElementById("code").value,
    Účel: purpose,
    Poznámky: document.getElementById("notes").value,
  };
  return values;
}

function setCounterNumber(input, where) {
  var len = document.getElementById(input).value.length;
  document.getElementById(where).innerHTML = `${len}/20`;
}

function setLabelError(input, label, bool) {
  if (bool) {
    input.style.border = "solid 1px red";
    label.style.display = "block";
  } else {
    input.style.border = "solid 1px #3ecc1f";
    label.style.display = "none";
  }
}

function setAnswerVisible() {
  var div = document.getElementsByClassName("inputs-div-another");
  if (checkboxAnother.checked) {
    for (var i = 0; i < div.length; i += 1) {
      div[i].style.display = "block";
    }
  } else {
    for (var i = 0; i < div.length; i += 1) {
      div[i].style.display = "none";
    }
  }
}

function setNameVisible() {
  var div = document.getElementsByClassName("inputs-div-name");
  for (var i = 0; i < div.length; i += 1) {
    if (div[i].style.display === "none") {
      div[i].style.display = "flex";
      buttonName.textContent = "Zakry meno!";
    } else {
      buttonName.textContent = "Odokry meno!";

      div[i].style.display = "none";
    }
  }
}

function setCodeVisible() {
  var div = document.getElementsByClassName("inputs-div-code");
  if (radio1.checked) {
    for (var i = 0; i < div.length; i += 1) {
      div[i].style.display = "block";
    }
  } else {
    for (var i = 0; i < div.length; i += 1) {
      div[i].style.display = "none";
    }
  }
}

function nameHandler(e) {
  if (!e.target.value.trim()) {
    setLabelError(firstName, label, true);
  } else {
    setLabelError(firstName, label, false);
  }
}

function surnameHandler(e) {
  if (!e.target.value.trim()) {
    setLabelError(surname, labelSurname, true);
  } else {
    setLabelError(surname, labelSurname, false);
  }
}

function emailHandler(e) {
  reg = /[A-Za-z0-9._%+-]{3,}@[A-Za-z0-9._%+-]{1,}([.]{1,100}[a-zA-Z]{2,4})$/;
  if (!reg.test(email.value)) {
    setLabelError(email, labelEmail, true);
  } else {
    setLabelError(email, labelEmail, false);
  }
}

function mobileNumberHandler(e) {
  const numberVal = mobileNumber.value;
  for (let i = 1; i <= numberVal.length - 1; i++) {
    if (isNaN(numberVal[i])) {
      setLabelError(mobileNumber, labelMobile, true);
      return;
    }
  }
  if (numberVal[0] !== "+" || numberVal.length < 11) {
    setLabelError(mobileNumber, labelMobile, true);
  } else {
    setLabelError(mobileNumber, labelMobile, false);
  }
}

function ageHandler() {
  let today = new Date();
  const birth = new Date(birthDate.value);
  var diff_ms = today - birth.getTime();
  var age_dt = new Date(diff_ms);
  const age = Math.abs(age_dt.getUTCFullYear() - 1970);
  if (!ageInput.value.trim()) {
    ageInput.value = age;
  }
  if (ageInput.value != age) {
    setLabelError(ageInput, labelAge, true);
    setLabelError(birthDate, labelDate, true);
  } else {
    setLabelError(ageInput, labelAge, false);
    setLabelError(birthDate, labelDate, false);
  }
}

function change1() {
  if (select1.options[select1.selectedIndex].index == 0) {
    select2.options[0].text = "Hokejky";
    select2.options[1].text = "Bránky";
    select3.options[0].text = "Petržalka";
    select3.options[1].text = "Ružinov";
  } else {
    select2.options[0].text = "Kopačky";
    select2.options[0].value = "Kopačky";
    select2.options[1].text = "Lopta";
    select2.options[1].value = "Lopta";
    select3.options[0].text = "Dubravka";
    select3.options[0].value = "Dubravka";
    select3.options[1].text = "Staré mesto";
    select3.options[1].value = "Staré mesto";
  }
}

function change2() {
  if (
    select1.options[select1.selectedIndex].index == 0 &&
    select2.options[select2.selectedIndex].index == 0
  ) {
    select3.options[0].text = "Petržalka";
    select3.options[1].text = "Ružinov";
  } else if (
    select1.options[select1.selectedIndex].index == 0 &&
    select2.options[select2.selectedIndex].index == 1
  ) {
    select3.options[0].text = "Nové mesto";
    select3.options[0].value = "Nové mesto";
    select3.options[1].text = "Mlynska dolina";
    select3.options[1].value = "Mlynska dolina";
  } else if (
    select1.options[select1.selectedIndex].index == 1 &&
    select2.options[select2.selectedIndex].index == 0
  ) {
    select3.options[0].text = "Dubravka";
    select3.options[0].value = "Dubravka";
    select3.options[1].text = "Staré mesto";
    select3.options[1].value = "Staré mesto";
  } else {
    select3.options[0].text = "Karlova Ves";
    select3.options[0].value = "Karlova Ves";
    select3.options[1].text = "Vajnory";
    select3.options[1].value = "Vajnory";
  }
}
