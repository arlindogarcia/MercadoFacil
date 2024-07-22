import { ReactNode } from "react";
import { Modal } from "./Modal";

interface DialogModalProps {
  show: boolean;
  maxWidth?: string;
  closeable?: boolean;
  close: () => void;
  footer?: ReactNode;
  content?: ReactNode;
  title?: ReactNode;
  hasMaxH?: boolean;
}

export const DialogModal = ({ show, maxWidth = '2xl', closeable = true, close, footer, content, title, hasMaxH = true }: DialogModalProps) => {
  return (
    <Modal
      show={show}
      maxWidth={maxWidth}
      closeable={closeable}
      close={close}
    >
      <div className="px-6 py-4">
        {title && <div className="text-lg font-medium text-gray-900">
          {title}
        </div>}

        {content && show && <div className={`${hasMaxH ? 'max-h-[70vh]' : 'max-h-[90vh] overflow-hidden'} mt-4 text-sm text-gray-600 overflow-auto`}>
          {content}
        </div>}
      </div>

      {footer && <div className="flex flex-row justify-end px-6 py-4 bg-gray-100 text-end">
        {footer}
      </div>}
    </Modal>
  )
}
