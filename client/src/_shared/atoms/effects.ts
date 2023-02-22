import { AtomEffect } from 'recoil';
import { getChromeStorageItem, setChromeStorageItem } from '@shared/utils/chrome';

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

const chromeStorageEffect = <AtomDataType>(key: string) => {
  const effects: AtomEffect<AtomDataType> = ({ setSelf, onSet }) => {
    getChromeStorageItem<string>(key).then((value) => {
      if (value) {
        setSelf(JSON.parse(value));
      }
    });

    onSet(async (newValue) => {
      await setChromeStorageItem({ [key]: JSON.stringify(newValue) });
    });
  };

  return effects;
};

const storageEffect = process.env.IS_WEB ? localStorageEffect : chromeStorageEffect;

export default storageEffect;
