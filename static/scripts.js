const actions = {
  "/mundus": loadMundus,
  "/addere": viewTemplate,
  "/quaerere": viewTemplate,
};

function actionsActive() {
  const hash = location.hash.slice(1);
  if (actions[hash]) actions[hash](hash);
  else if (hash == "") actions["/mundus"]();
}

function viewTemplate(hash) {
  const tmpl = document.querySelector(`template[id="${hash}"]`);
  if (!tmpl) return;
  const clone = tmpl.content.cloneNode(true);
  const view = document.querySelector("#view");
  view.innerHTML = "";
  view.appendChild(clone);
}

async function loadMundus() {}

async function onSubmit(event) {
  event.preventDefault();
  console.log(1);
}

window.addEventListener("hashchange", actionsActive);
window.addEventListener("load", actionsActive);
