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
    const url = `/prestacao/${prestacaoId}/servicos/${servicoId}/`
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