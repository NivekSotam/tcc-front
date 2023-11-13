import axios from "axios";

type ListItem = {
    nome?: string;
    userToken: any,
    itemsPerPage: number,
    currentPage: number
}

export const fetchItemData = async ({
    nome,
    userToken,
    itemsPerPage,
    currentPage}: ListItem) => {
    const url = `/item/?nome=${nome}&limit=${itemsPerPage}&page=${currentPage}`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw error;
    }
};

type CreateItem = {
    data: any;
    userToken: any;
}

export const createItem = async ({
    data,
    userToken
}: CreateItem) => {
    const url = `/item/`;
    try {
      const response = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw error;
    }
}

type DeleteItem = {
    itemId: number;
    userToken: any;
}

export const deleteItem = async ({
    itemId,
    userToken
}: DeleteItem) => {
    try {
        const response = await axios.delete(`/item/${itemId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        });
        return response.data;
      } catch (error) {
        console.error("Erro ao excluir item:", error);
        throw error;
      }
}