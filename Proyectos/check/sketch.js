let checkboxes = []; // Array para almacenar los checkboxes
let checkboxValues = []; // Array para almacenar los valores de los checkboxes marcados

function setup() {
  createCanvas(400, 400);
  
  // Crear checkboxes
  for (let i = 0; i < 5; i++) {
    let checkbox = createCheckbox('Item ' + i, false);
    checkbox.position(20, 20 * i + 20);
    checkboxes.push(checkbox);
    checkboxValues.push(false);
  }
  
  // Agregar evento de cambio a los checkboxes
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].changed(updateCheckboxValues);
  }
}

function draw() {
  background(220);
  
  // Mostrar los valores marcados
  for (let i = 0; i < checkboxValues.length; i++) {
    let value = checkboxValues[i];
    let label = 'Item ' + i + ': ' + value;
    text(label, 150, 20 * i + 35);
  }
}

function updateCheckboxValues() {
  for (let i = 0; i < checkboxes.length; i++) {
    checkboxValues[i] = checkboxes[i].checked();
  }
}
