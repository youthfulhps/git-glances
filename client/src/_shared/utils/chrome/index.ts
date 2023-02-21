/* eslint-disable no-undef */

export const getChromeStorageItem = <ItemType>(key: string) =>
  new Promise<ItemType>((resolve) => {
    chrome.storage.local.get([key], (result) => {
      if (result[key] !== undefined) {
        resolve(result[key]);
      }
    });
  });

export const setChromeStorageItem = async (object: Record<string, any>) => {
  try {
    await chrome.storage.local.set(object);
  } catch (error) {
    throw new Error('아이템을 저장하는데 실패하였습니다.');
  }
};

export const removeChromeStorageItem = async (key: string) => {
  try {
    await chrome.storage.local.remove(key);
  } catch (error) {
    throw new Error('아이템을 삭제하는데 실패하였습니다.');
  }
};
