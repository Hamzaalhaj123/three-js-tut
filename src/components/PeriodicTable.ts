export default function fetchInfo() {
  return fetch("./../../PeriodicTable/info.json")
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      const tableBody = document.querySelector("#periodicTable tbody");

      data.elements.forEach((element) => {
        const row = document.createElement("tr");

        const atomicNumberCell = document.createElement("td");
        atomicNumberCell.textContent = element.number;
        row.appendChild(atomicNumberCell);

        const symbolCell = document.createElement("td");
        symbolCell.textContent = element.symbol;
        row.appendChild(symbolCell);

        const nameCell = document.createElement("td");
        nameCell.textContent = element.name;
        row.appendChild(nameCell);

        const atomicWeightCell = document.createElement("td");
        atomicWeightCell.textContent = element.atomic_mass;
        row.appendChild(atomicWeightCell);

        row.addEventListener("click", () => {
          console.log(element);
        });

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
