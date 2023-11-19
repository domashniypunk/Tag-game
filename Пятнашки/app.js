const field = document.querySelector(".field");
const cellSize = 100; //размер ячейки
let moveSteps = 0;

document.querySelector(".submit").addEventListener("click", () => {
  const userName = document.querySelector(".user-name");
  localStorage.setItem("userName", userName.value);
});

const empty = {
  value: 0,
  top: 0,
  left: 0,
};

const cells = [];
cells.push(empty);

//Function Declaration
function move(index) {
  //изменяет координаты каждой ячейки
  
  const cell = cells[index]; //достаем ячейку
  //здесь мы проверяем ячейки на соседство(находятся ли они рядом)
  const leftDiff = Math.abs(empty.left - cell.left); //разница координат на расстоянии по горизонтали
  const topDiff = Math.abs(empty.top - cell.top); //по вертикали

  if (leftDiff + topDiff > 1) { 
    //если больше единицы, то ячейки не рядом
    return;
  }
  //изменение положения ячейки
  cell.element.style.left = `${empty.left * cellSize}px`;
  cell.element.style.top = `${empty.top * cellSize}px`;
  //пустая клетка меняется с предыдущей ячейкой
  //промежуточные переменные
  //можно сравнить с методом 3 стаканов
  const emptyLeft = empty.left;
  const emptyTop = empty.top;
//в координаты пустой клетки записываем текущие координаты ячейки
  empty.left = cell.left;
  empty.top = cell.top;
  //в ячейку записываем временные переменные
  cell.left = emptyLeft;
  cell.top = emptyTop;

  const isFinished = cells.every((cell) => {
    //проверка выполнения условия для каждого эл-та массива
    return cell.value === cell.top * 4 + cell.left; //номер ряда умн на количество ячеек в ряду и прибавить номер колонки
  }); //=== -  в точности равен

  if (isFinished) {
  //  alert("You won");
    let block = document.getElementById("form");
    block.insertAdjacentHTML('beforeend', "<input type='button' value='Поздравляю с победой' class='form'>");
  }
}
//Ключи массива 0-14, формируем новый массив из этих ключей
const numbers = [...Array(15).keys()].sort(() => Math.random() - 0.5); //половина генерируемого диапазона
//нулевая ячейка занята пустой клеткой
for (let i = 1; i <= 15; i++) {
  const cell = document.createElement("div"); //прямоугольник
  const value = numbers[i - 1] + 1; //от 1 до 15 если прибавить 1
  cell.className = "cell";
  cell.innerHTML = value; 
  field.append(cell);

  cell.style.backgroundImage = `url(images/image_part_${value}.jpg)`;

  const left = i % 4; //позиция ячейки считая слева
  const top = (i - left) / 4; //смещение сверху вниз
  //складываем объект
  cells.push({
    value: value, //значение ячейки 
    left: left, //64
    top: top, //65
    element: cell, //ячейка(56)
  });

  cell.style.left = `${left * cellSize}px`; //сдвиг на кол-во пикселей(здесь мы поместили все ячейки в поле)
  cell.style.top = `${top * cellSize}px`;

  cell.addEventListener("click", () => {
    //DOM-свойство, позволяет следить за событиями //
    move(i);
    moveSteps++;
    localStorage.setItem("Количество ходов", moveSteps);
  });
}
