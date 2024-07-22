import { useState } from "react";
import { FiLoader, FiX } from "react-icons/fi";

interface FileInputProps {
  subtitulo?: string;
  accept: string;
  externalClass?: string;
  error?: string;
  value?: string;
  onChange: (file: { name: string; base64: string; extension: string }) => void;
}

interface Event<T = EventTarget> {
  target: T;
}

export const FileInput = ({ subtitulo, accept, externalClass, onChange, error, value }: FileInputProps) => {
  const [loading, setLoading] = useState(false);

  const readFile = (event: Event<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (!fileList?.length) {
      return;
    }
    setLoading(true);
    const file = fileList[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      setLoading(false);
      onChange({
        name: file.name,
        base64: reader.result as string,
        extension: file.name.split('.')[file.name.split('.').length - 1],
      })
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className={`flex flex-col items-center justify-center w-full ${externalClass}`}>

      {value && <span className="relative uppercase bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded border border-green-400 w-full mx-2 mb-1">
        certificado selecionado: <b>{value}</b>
        <span onClick={() => onChange({
          name: '',
          base64: '',
          extension: '',
        })} className="cursor-pointer absolute top-1 right-1">
          <FiX />
        </span>
      </span>}

      <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer ${error ? 'bg-red-50 border-red-300' : 'bg-gray-50 border-gray-300'}`}>
        <div className="text-center flex flex-col items-center justify-center pt-5 pb-6">
          {!loading && <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
          </svg>}
          {loading && <FiLoader className="animate-spin w-8 h-8 mb-4 text-gray-500" size={"30px"} />}
          <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Clique para buscar {value ? 'outro' : 'o'} arquivo</span> <br /> ou arraste ele até aqui</p>
          <p className="text-xs text-gray-500">
            {subtitulo}
          </p>
        </div>
        <input onChange={readFile} accept={accept} type="file" className="hidden" />
      </label>
      {error && <div className="text-sm text-red-500">{error}</div>}
    </div>
  )
}