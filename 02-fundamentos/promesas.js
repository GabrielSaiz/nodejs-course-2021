const empleados = [
  {
    id: 1,
    nombre: 'Fernando'
  },
  {
    id: 2,
    nombre: 'Linda'
  },
  {
    id: 3,
    nombre: 'Karen'
  }
];

const salarios = [
  {
    id: 1,
    salario: 1000
  },
  {
    id: 2,
    salario: 1500
  }
];

const getEmpleado = (id) => {
  const empleado = empleados.find((e) => e.id === id);

  return new Promise((resolve, reject) => {
    empleado ? resolve(empleado) : reject(`Empleado con id ${id} no existe`);
  });
};

const getSalario = (id) => {
  const salario = salarios.find((e) => e.id === id)?.salario;

  return new Promise((resolve, reject) => {
    salario
      ? resolve(salario)
      : reject(`Empleado con id ${id} no tiene salario registrado`);
  });
};

const id = 1;
// getEmpleado(id)
//   .then((empleado) => console.log(empleado.nombre))
//   .catch((err) => console.log(err));

// getSalario(id)
//   .then((salario) => console.log(salario))
//   .catch((err) => console.log(err));

// getEmpleado(id)
//   .then((empleado) =>
//     getSalario(id)
//       .then((salario) =>
//         console.log(
//           `El empleado ${empleado.nombre} tiene un salario de: ${salario}`
//         )
//       )
//       .catch((err) => console.log(err))
//   )
//   .catch((err) => console.log(err));

let nombre;

getEmpleado(id)
  .then((empleado) => {
    nombre = empleado.nombre;
    return getSalario(id);
  })
  .then((salario) =>
    console.log(`El empleado ${nombre} tiene un salario de: ${salario}`)
  )
  .catch((err) => console.log(err));
