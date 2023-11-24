import axios from "axios";

type ListItemPrestacao = {
    prestacaoId: number;
    servicoId: number;
    userToken: any;
}

export const fetchPrestacaoData = async ({
    prestacaoId,
    servicoId,
    userToken
}: ListItemPrestacao) => {
    const url = `/prestacao/${prestacaoId}/servicos/${servicoId}/itens`
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

type AddItemToPrestacao = {
    prestacaoId: number;
    data: any;
    servicoId: number;
    userToken: any
}

export const addItemToPrestacao = async ({
    prestacaoId,
    data,
    servicoId,
    userToken
}: AddItemToPrestacao) => {
    const url = `/prestacao/${prestacaoId}/servicos/${servicoId}/itens`
    try {
        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        return response;
    } catch(error){
        throw error;
    }
}

type UpdateItemServico = {
    prestacaoId: number;
    data: any;
    itemServicoId: number;
    servicoId: number;
    userToken: any
}

export const editItemServico = async ({
    prestacaoId,
    data,
    servicoId,
    itemServicoId,
    userToken
}: UpdateItemServico) => {
    const url = `/prestacao/${prestacaoId}/servicos/${servicoId}/itens/${itemServicoId}`
    try {
        const response = await axios.put(url, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        })
        return response;
    } catch(error){
        throw error;
    }
}