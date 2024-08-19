import { useQuery } from "@tanstack/react-query"
import { fetchCabins, type Cabin, type FetchError } from "../../../http"

export default function useCabinsFetch() {
  const { data, isPending, isError, error } = useQuery<Cabin[], FetchError>({
    queryKey: ["cabins"],
    queryFn: fetchCabins,
  })

  return { data, isPending, isError, error }
}
