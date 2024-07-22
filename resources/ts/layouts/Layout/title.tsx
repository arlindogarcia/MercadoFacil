import { ReactNode } from "react"

export const Title = ({ children }: { children: ReactNode }) => {
  return (
    <h2 className="font-semibold text-xl leading-tight">
      {children}
    </h2>
  )
}