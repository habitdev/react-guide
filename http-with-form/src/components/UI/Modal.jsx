import { useEffect } from 'react';
import { useRef } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ open, children, className = '', onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const modal = dialog.current;
    // ref는 함수 실행 어딘가에서 변경될 수 있으므로 참조 값을 지정해 놓는 것이 좋다
    if (open) {
      modal.showModal();
    }

    return () => {
      modal.close();
    };
  }, [open]);

  return createPortal(
    <dialog
      className={`modal ${className}`}
      ref={dialog}
      onClose={onClose}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')
  );
}
