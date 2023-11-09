import axios from "axios";

type SearchVenda = {
    colaboradorId?: number,
    clienteFornecedorId?: number,
    userToken: any,
    itemsPerPage: number,
    currentPage: number,
    dataInicio?: string,
    dataFim?: string,
}

export const fetchVendaData = async ({
        colaboradorId,
        clienteFornecedorId,
        dataInicio,
        dataFim,
        itemsPerPage,
        currentPage,
        userToken
    }: SearchVenda) => {
        const url = `/venda/?colaboradorId=${colaboradorId}&clienteFornecedorId=${clienteFornecedorId}&dataInicio=${dataInicio}&dataFim=${dataFim}&limit=${itemsPerPage}&page=${currentPage}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw error;
    }
};