import { useState } from "react"

export default function useToggle(initial = false) {
  const [value, setValue] = useState(Boolean(initial))
  return [value, () => setValue(!value)]
}
