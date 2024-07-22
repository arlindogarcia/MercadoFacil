import { FiCopy, FiEdit, FiEdit2, FiTrash2 } from "react-icons/fi";
import { DangerButton } from "./DangerButton"
import { DefaultButton } from "./DefaultButton"

interface ActionsGroupButtonProps {
  onEdit: () => void;
  onRemove: () => void;
  onDuplicate?: () => void;
}

export const ActionsGroupButton = ({ onEdit, onRemove,onDuplicate }: ActionsGroupButtonProps) => {
  return (
    <div className="flex py-2 px-2 gap-2">
      <DefaultButton externalClass="w-auto" onClick={onEdit} size="sm">
        <div className="flex gap-1 items-center">
          <FiEdit2 />
          Editar
        </div>
      </DefaultButton>
      <DangerButton externalClass="w-auto" onClick={onRemove} size="sm">
        <div className="flex gap-1 items-center">
          <FiTrash2 />
          Excluir
        </div>
      </DangerButton>
      {typeof onDuplicate === 'function' && <DefaultButton externalClass="w-auto" onClick={onDuplicate} size="sm">
        <div className="flex gap-1 items-center">
          <FiCopy />
          Duplicar
        </div>
      </DefaultButton>}
    </div>
  )
}