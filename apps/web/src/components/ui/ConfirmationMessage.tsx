import { Trash2 } from 'lucide-react';
import React, { useState } from 'react';

type ConfirmationMessageProps = {
  title?: string;
  description?: string;
  onClick: () => void;
  buttonText: string;
};

export default function ConfirmationMessage({
  title,
  description,
  onClick,
  buttonText,
}: ConfirmationMessageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 border border-gray-300 rounded-xl px-4 py-2 text-sm font-medium hover:bg-gray-100"
      >
        <Trash2 className="h-4 w-4" />
        Clear all
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-lg">
            {/* Title */}
            <h2 className="text-lg font-semibold mb-2">{title}</h2>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-6">{description}</p>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-xl border border-gray-300 text-sm hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  onClick();
                  setOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600"
              >
                {buttonText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
