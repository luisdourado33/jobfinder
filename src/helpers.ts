export function cpfMask(cpf: string) {
  cpf = cpf.replace(/\D/g, '');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d)/, '$1.$2');
  cpf = cpf.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  return cpf;
}

export function formatDate(date: Date, returnType: string) {
  let dia = date.getDay();
  let mes = date.getMonth();
  let ano = date.getFullYear();
  let hora = date.getHours();
  let minutos = date.getMinutes();
  let segundos = date.getSeconds();

  switch (returnType) {
    case 'full':
      return `${dia}/${mes}/${ano} às ${hora}:${minutos}:${segundos}`;
      break;
    case 'short':
      return `${dia}/${mes}/${ano}`;
      break;
    default:
      break;
  }
}

export function dateNow(format?: string) {
  let date = new Date(Date.now());

  switch (format) {
    case 'full':
      return formatDate(date, 'full');
      break;
    case 'short':
      return formatDate(date, 'short');
      break;

    default:
      return {
        day: date.getDay(),
        month: date.getMonth(),
        fullYear: date.getFullYear(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      };
      break;
  }
}
