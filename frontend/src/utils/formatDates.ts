//Definindo função de formatação de datas

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString("pt-BR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const formatDateTime = (date: Date): string => {
  const d = new Date(date);

  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();

  return `Atualizado às: ${hours}:${minutes}, de ${day}/${month}/${year}`;
};