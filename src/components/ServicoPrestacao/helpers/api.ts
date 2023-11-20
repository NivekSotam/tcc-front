import axios from "axios";

type ListPrestacao = {
    prestacaoId: number;
    userToken: any;
}

export const fetchPrestacaoData = async ({
    prestacaoId,
    userToken
}: ListPrestacao) => {
    try {
        const response = await axios.get(`/prestacao/${prestacaoId}/servicos/`, {
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

type CreateServicoPrestacao = {
    data: any;
    prestacaoId: number;
    userToken: any;
}

export const createServicoPrestacao = async ({
    data,
    prestacaoId,
    userToken
}: CreateServicoPrestacao) => {
    try {
        const response = await axios.post(`/prestacao/${prestacaoId}/servicos/`, data, {
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


type UpdateServicoPrestacao = {
    data: any;
    prestacaoId: number | null;
    userToken: any;
}

export const editServicoPrestacao = async ({
    data,
    prestacaoId,
    userToken
}: UpdateServicoPrestacao) => {
    try {
        const response = await axios.put(`/prestacao/servicos/${prestacaoId}/`, data, {
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