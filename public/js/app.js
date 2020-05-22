console.log("client side javascript file");
//fetch is only used in developer tools in browser side,node cannot implement fetch

const search = document.querySelector("input");

const weatherForm = document.querySelector("form");
const m1 = document.querySelector("#m1");
const m2 = document.querySelector("#m2");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location1 = search.value;
  m1.textContent = "Loading...";
  m2.textContent = "";
  fetch("/weather?address=" + location1).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        m1.textContent = data.error;
      } else {
        m1.textContent = data.location;
        m2.textContent = data.forecast;
      }
    });
  });
});
