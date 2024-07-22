import { ReactNode, useEffect } from "react";
import React from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  show: boolean;
  maxWidth?: string;
  closeable?: boolean;
  close: () => void;
  children: ReactNode;
}

export const Modal = ({ show, maxWidth = '2xl', closeable = true, close, children }: ModalProps) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [show]);


  const closeModal = () => {
    typeof close === 'function' && close();

    // document.removeEventListener('keydown', closeOnEscape);
    document.body.style.overflow = '';
  }


  // const closeOnEscape = (e: any) => {
  //   if (e.key === 'Escape' && show && closeable) {
  //     closeModal();
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('keydown', closeOnEscape)
  // }, [])

  const maxWidthClass = {
    'sm': 'sm:max-w-sm',
    'md': 'sm:max-w-md',
    'lg': 'sm:max-w-lg',
    'xl': 'sm:max-w-xl',
    '2xl': 'sm:max-w-2xl',
    '4xl': 'sm:max-w-4xl',
  }[maxWidth];

  if (!show) return <></>;

  return (
    createPortal(
      <div className="fixed inset-0 overflow-y-auto px-4 py-6 sm:px-0 z-50">
        <div className="fixed inset-0 transform transition-all" onClick={closeModal}>
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <div className={`mb-6 bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full sm:mx-auto ${maxWidthClass}`}>
          {children}
        </div>
      </div>, document.getElementById('modal-root') as any,
    )
  )
}