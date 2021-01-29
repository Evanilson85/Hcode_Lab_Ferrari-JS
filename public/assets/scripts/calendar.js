import { startOfMonth, addMonths } from "date-fns";
import {
  startOfDay,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  format,
  differenceInSeconds,
  addDays,
  subMonths,
} from "date-fns/esm";
import { ptBR } from "date-fns/locale";

document.querySelectorAll("#schedules-new").forEach((page) => {
  const form = page.querySelector("form");
  const input = page.querySelector("[name=schedule_at]");
  const button = form.querySelector("[type=submit]");

  input.addEventListener("change", (e) => {
    // console.log(e.target.value);
    let alvo = e.target.value;
    console.log(alvo);
    if (alvo) {
      button.disabled = false;
    } else {
      button.disabled = true;
    }
  });

  form.addEventListener("submit", (e) => {
    if (!page.querySelector("[name=schedule_at]").value) {
      e.preventDefault();
      button.disabled = true;
    }
  });
});

document.querySelectorAll(".calendar").forEach((calendar) => {
  const today = new Date(); //! me retorna o dia atual com js puro
  let startMonth = startOfMonth(today); //! me retorna o meu primeiro dia do mês
  let startAt = startOfWeek(startMonth); //! vai me retoranar o primeiro dia do calendario da view primeira dia da semana
  let endAt = endOfWeek(endOfMonth(today)); //! vai me retoranar o ultimo dia do calendario da view ultimo dia da semana do calendario

  const title = calendar.querySelector("h2");
  const days = calendar.querySelector(".days");
  const btnToday = calendar.querySelector(".btn-today");
  const btnPrev = calendar.querySelector(".btn-prev");
  const btnNext = calendar.querySelector(".btn-next");

  btnToday.addEventListener("click", (e) => {
    startMonth = startOfMonth(new Date());
    startAt = startOfWeek(startMonth);
    endAt = endOfWeek(endOfMonth(startMonth));
    render();
  });
  btnPrev.addEventListener("click", (e) => {
    startMonth = subMonths(startMonth, 1);
    startAt = startOfWeek(startMonth);
    endAt = endOfWeek(endOfMonth(startMonth));
    render();
  });
  btnNext.addEventListener("click", (e) => {
    startMonth = addMonths(startMonth, 1);
    startAt = startOfWeek(startMonth);
    endAt = endOfWeek(endOfMonth(startMonth));
    render();
  });

  const render = () => {
    title.innerHTML = format(startMonth, "MMMM-yyyy", {
      locale: ptBR,
    });

    days.innerHTML = "";

    let currrentDay = new Date(startAt.getTime());

    while (differenceInSeconds(endAt, currrentDay) > 0) {
      // console.log(differenceInSeconds(endAt, currrentDay));
      const li = document.createElement("li");
      li.innerHTML = format(currrentDay, "d");
      li.dataset.date = format(currrentDay, "yyyy-MM-dd");

      if (format(currrentDay, "yyyyMMdd") < format(today, "yyyyMMdd")) {
        li.classList.add("month-prev");
        li.style.backgroundColor = "#ccc";
        li.style.cursor = "no-drop";
      } else {
        if (format(currrentDay, "yyyyMM") < format(startMonth, "yyyyMM")) {
          li.classList.add("month-prev");
        } else if (
          format(currrentDay, "yyyyMM") > format(startMonth, "yyyyMM")
        ) {
          li.classList.add("month-next");
        } else if (
          format(currrentDay, "yyyyMMdd") === format(today, "yyyyMMdd")
        ) {
          li.classList.add("active");
        }

        li.addEventListener("click", (e) => {
          const { target } = e;
          const selectd = calendar.querySelector(".selected");
          if (selectd) {
            selectd.classList.remove("selected");
          }

          target.classList.add("selected");

          document.querySelector("[name=schedule_at]").value =
            target.dataset.date;

          const evt = document.createEvent("HTMLEvents");

          evt.initEvent("change", false, true);

          document.querySelector("[name=schedule_at]").dispatchEvent(evt);
        });
      }
      days.append(li);

      currrentDay = addDays(currrentDay, 1);
    }
  };

  render();
});
