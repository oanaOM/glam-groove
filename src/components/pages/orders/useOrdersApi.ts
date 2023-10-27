import useSWR from "swr"
import { API_URL } from "../../../../lib/consts"
import { fetcher } from "../../../../lib/msw"
import { Order } from "../../types"

export default function useOrdersApi(id: number) {
	const { data, isLoading } = useSWR<Order>(id !== 0 ? `${API_URL}/orders/${id}` : null, fetcher, {
		dedupingInterval: 0,
	})

	return {
		order: data,
		isLoading,
	}
}
