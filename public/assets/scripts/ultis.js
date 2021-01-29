export function appendTemplate(element, tagName, html) {
  const tags = document.createElement(tagName);
  tags.innerHTML = html;
  element.append(tags);
  return tags;
}
export function getQueryString() {
  const queryString = {};

  if (window.location.search) {
    window.location.search
      .split("?")[1]
      .split("&")
      .forEach((param) => {
        param = param.split("=");

        queryString[param[0]] = decodeURIComponent(param[1]); //!colocando em um objeto
      });
  }

  return queryString;
}
export function setFormValues(form, values) {
  Object.keys(values).forEach((key) => {
    console.log(key);

    const field = form.querySelector(`[name=${key}]`);
    console.log(field);
    switch (field.type) {
      case "select":
        field.querySelector(`option[value=${values[key]}]`).selected = true;
        break;
      case "checkbox":
      case "radio":
        form.querySelector(
          `[name=${key}][value=${values[key]}]`
        ).checked = true;
        break;
      default:
        field.value = values[key];
    }
  });
}

export function getFortmValues(form) {
  const values = {};

  form.querySelectorAll("[name]").forEach((field) => {
    switch (field.type) {
      case "select":
        values[field.name] = field.querySelector("option:selected")?.value;
        break;
      case "radio":
        values[field.name] = form.querySelector(
          `[name=${field.name}]:checked`
        )?.value;
        break;
      case "checkbox":
        values[field.name] = [];
        form
          .querySelectorAll(`[name=${field.name}]:checked`)
          .forEach((checkbox) => {
            values[field.name].push(checkbox.value);
          });
        break;
      default:
        values[field.name] = field.value;
    }
  });

  return values;
}
