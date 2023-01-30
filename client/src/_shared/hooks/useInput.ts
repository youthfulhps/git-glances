import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react';

const useInput = (initialValue: string, onEnterKeyPress?: () => void) => {
  const [value, setValue] = useState(initialValue);

  const onChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setValue(e.target.value);
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    if (e.key === 'Enter' && onEnterKeyPress) {
      onEnterKeyPress();
    }
  };

  const resetValue = () => {
    setValue('');
  };

  return { value, setValue, onChange, onKeyDown, resetValue };
};

export default useInput;
