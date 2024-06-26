import axios from "axios";

type ListCategoria = {
  nome?: string;
  userToken: any;
  itemsPerPage: number;
  currentPage: number;
};

export const fetchCategoriaData = async ({
  nome,
  userToken,
  itemsPerPage,
  currentPage,
}: ListCategoria) => {
  const url = `/categoria/?nome=${nome}&limit=&page=`;
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

type CreateCategoria = {
  data: any;
  userToken: any;
};

export const createCategoria = async ({ data, userToken }: CreateCategoria) => {
  const url = `/categoria/`;
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
};

type CategoriaById = {
  categoriaId: number | null;
  userToken: any;
};

export const deleteCategoria = async ({
  categoriaId,
  userToken,
}: CategoriaById) => {
  try {
    const response = await axios.delete(`/categoria/${categoriaId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    throw error;
  }
};

export const getCategoriaById = async ({
  categoriaId,
  userToken,
}: CategoriaById) => {
  try {
    const response = await axios.get(`/categoria/${categoriaId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir categoria:", error);
    throw error;
  }
};

export type UpdateCategoria = {
  nome: string | null;
};

type EditCategoria = {
  data: UpdateCategoria;
  categoriaId: number | null;
  userToken: any;
};

export const editCategoria = async ({
  data,
  categoriaId,
  userToken,
}: EditCategoria) => {
  const url = `/categoria/${categoriaId}`;
  try {
    const response = await axios.put(url, data, {
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
