import { parse, format } from "date-fns/esm";
import { ptBR } from "date-fns/locale";
import {
  appendTemplate,
  getFortmValues,
  getQueryString,
  setFormValues,
} from "./ultis";

const data = [
  {
    id: 1,
    value: "9:00",
  },
  {
    id: 2,
    value: "10:00",
  },
  {
    id: 3,
    value: "11:00",
  },
  {
    id: 4,
    value: "12:00",
  },
  {
    id: 5,
    value: "13:00",
  },
  {
    id: 6,
    value: "14:00",
  },
  {
    id: 7,
    value: "25:00",
  },
];

const renderTimeOptions = (contex) => {
  const target = contex.querySelector(".options");

  target.innerHTML = "";

  data.forEach((item) => {
    appendTemplate(
      target,
      "label",
      `<input type="radio" name="option" value="${item.value}" />
       <span>${item.value}</span>`
    );
  });
};
const validadeSubmitForm = (contex) => {
  const button = contex.querySelector("[type=submit]");

  const checkValue = () => {
    if (contex.querySelector("[name=option]:checked")) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  };

  contex.querySelectorAll("[name=option]").forEach((input) => {
    input.addEventListener("change", (e) => {
      checkValue();
    });
  });

  contex.querySelector("form").addEventListener("submit", (e) => {
    getFortmValues(e.target);

    if (!contex.querySelector("[name=option]:checked")) {
      button.disabled = true;
      e.preventDefault();
    }
  });

  window.addEventListener("load", (e) => {
    checkValue();
  });
};

document.querySelectorAll("#time-options").forEach((page) => {
  renderTimeOptions(page);

  validadeSubmitForm(page);
  const params = getQueryString();
  console.log(params);
  const title = page.querySelector("h3");
  const form = page.querySelector("form");

  const scheduleAt = parse(params.schedule_at, "yyyy-MM-dd", new Date());

  //! onde que guardo os valores da URL que vem do Calendario page.querySelector("[name=shedule_at]").value = params.schedule_at;schedule_at
  console.log(form);
  setFormValues(form, params);

  title.innerHTML = format(scheduleAt, "EEEE, d 'de' MMMM 'de' yyyy ", {
    locale: ptBR,
  });
});
