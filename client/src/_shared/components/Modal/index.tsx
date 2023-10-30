import { CheckCircleFillIcon, XCircleFillIcon } from '@primer/octicons-react';
import { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel?: () => void;
  children: ReactNode;
};

function Modal({ isOpen, onConfirm, onCancel, children }: ModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-screen items-center justify-center bg-[rgba(110,118,129,0.4)]">
      <div
        className="max-h-[200px] max-w-[300px] rounded-2xl bg-zinc-800 p-6 text-zinc-100"
        role="dialog"
      >
        <div className="text-xs font-thin text-zinc-300">{children}</div>
        <div className="mt-8 flex animate-rising items-center justify-end">
          <button onClick={onConfirm}>
            <CheckCircleFillIcon size={24} className="fill-emerald-500" />
          </button>
          {onCancel ? (
            <button onClick={onCancel}>
              <XCircleFillIcon size={24} className="ml-1 fill-red-400" />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default Modal;
