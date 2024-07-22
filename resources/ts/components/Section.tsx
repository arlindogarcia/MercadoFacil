import { ReactNode } from "react"

export const Section = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-5 md:mt-0 md:col-span-2">
      <div className="px-2 py-5 sm:p-2 bg-white shadow-md sm:rounded-lg">
        {children}
      </div>
    </div>
  )
}