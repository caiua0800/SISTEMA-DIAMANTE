
export const formatarMoedaBrasil = (valor) => {
  // Verifica se o valor é um número
  if (typeof valor !== 'number' || isNaN(valor)) {
    throw new Error('O valor deve ser um número.');
  }

  // Cria uma instância de NumberFormat para o formato brasileiro
  const formatador = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatador.format(valor);
}



export const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

export const gerarStringAleatoria = () => {
  let tamanho = 4;
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
  let resultado = '';
  for (let i = 0; i < tamanho; i++) {
    resultado += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return resultado;
};


export function isDateAfterToday(dateString) {

  function parseDate(dateStr) {
      const [day, month, year] = dateStr.split('/').map(Number);
      return new Date(year, month - 1, day); 
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const providedDate = parseDate(dateString);
  return providedDate > today;
}