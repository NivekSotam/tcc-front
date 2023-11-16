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
    currentPage,
  }: ListItem) => {
    const url = `/item/?nome=${nome}&categoria=&limit=${itemsPerPage}&page=${currentPage}`;
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
    console.log(data)
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
    const url = `/item/${itemId}`;
    try {
        const response = await axios.delete(url, {
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

type UpdateItem = {
    data: any;
    userToken: any;
    itemId: number | null;
}

export const editItem = async ({
    itemId,
    data,
    userToken
}: UpdateItem) => {
        const url = `/item/${itemId}`;
    try {
        const response = await axios.put(url, data, {
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