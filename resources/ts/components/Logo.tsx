export const Logo = () => {
  return (
    <div className="text-center py-6 flex justify-center align-center">
      <span className="flex justify-center align-center font-bold text-3xl text-gray-700 my-auto gap-2">
        <img src="/logo.png" className="w-12 h-12" />
        <span className="my-auto">
          Mercado {" "} <span className="text-green-500">Fácil</span>
        </span>
      </span>
    </div>
  )
}