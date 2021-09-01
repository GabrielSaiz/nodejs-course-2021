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

const getInfoUsuario = async (id) => {
  try {
    const empleado = await getEmpleado(id)?.nombre;
    const salario = await getSalario(id);

    return `El empleado ${empleado} tiene un salario de: ${salario}`;
  } catch (error) {
    throw error;
  }
};

const id = 5;
getInfoUsuario(id)
  .then((result) => console.log('TODO OK: ', result))
  .catch((err) => console.log('ERROR', err));
