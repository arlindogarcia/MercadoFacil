import { usePage } from "@inertiajs/react"
import { useEffect, useState } from "react";

export const Banner = () => {
  const page = usePage();

  const [show, setShow] = useState(true);
  const [style, setStyle] = useState('success');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const flash: any = page.props?.flash;
    if (flash) {
      setStyle(flash?.bannerStyle || 'success');
      setMessage(flash?.banner || '');
      setShow(true);
    }
  }, [page.props?.flash])

  return (
    <div className="sticky w-full top-0 z-10">
      {show && message && <div className={`${style == 'success' ? 'bg-green-500' : 'bg-red-700'}`}>
        <div className="max-w-screen-xl mx-auto py-2 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center min-w-0">
              <span className={`flex p-2 rounded-lg ${style == 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
                {style == 'success' && <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>}

                {style == 'danger' && <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>}
              </span>

              <p className="ms-3 font-medium text-sm text-white truncate">
                {message}
              </p>
            </div>

            <div className="shrink-0 sm:ms-3">
              <button
                type="button"
                className={`-me-1 flex p-2 rounded-md focus:outline-none sm:-me-2 transition ${style == 'success' ? 'hover:bg-green-600 focus:bg-green-600' : 'hover:bg-red-600 focus:bg-red-600'}`}
                aria-label="Dismiss"
                onClick={() => setShow(false)}
              >
                <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>}
    </div>
  )
}