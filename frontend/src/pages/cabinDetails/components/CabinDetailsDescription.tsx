import { useOutletContext } from "react-router-dom"

export default function CabinDetailsDescription() {
  const { description } = useOutletContext<{ description: string }>()
  return <p>{description}</p>
}
