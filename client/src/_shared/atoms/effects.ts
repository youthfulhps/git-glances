import { AtomEffect } from 'recoil';

const localStorageEffect = <AtomDataType>(key: string) => {
  const effects: AtomEffect<AtomDataType> = ({ setSelf, onSet }) => {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, JSON.stringify(newValue));
      }
    });
  };

  return effects;
};

export default localStorageEffect;
