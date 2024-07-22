import { ReactNode } from "react"

export const ListHeader = ({ children, subtitle, size = 'md' }: { children: ReactNode; subtitle?: string; size?: 'md' | 'lg' }) => {
  const sizes = {
    md: 'text-lg',
    lg: 'text-2xl',
  }

  return (
    <div className={`w-full font-medium text-gray-800 border-b border-gray-300 pb-2 mb-2 mx-1 ${sizes[size]}`}>
      {children}
      {subtitle &&
        <span className="w-full text-xs text-gray-500">
          {" "} - {subtitle}
        </span>}
    </div>
  )
}