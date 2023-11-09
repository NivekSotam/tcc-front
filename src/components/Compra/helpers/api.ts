import axios from "axios";

export const fetchCompraData = async ({userToken}: any) => {
    const url = `/compra/?colaborador=&clienteFornecedor=&limit=5&offset=1`;
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