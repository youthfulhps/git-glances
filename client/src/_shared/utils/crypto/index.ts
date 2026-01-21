/**
 * Web Crypto API를 사용한 토큰 암호화/복호화
 *
 * 주의: 이것은 평문 저장보다 나은 방법이지만 완벽한 보안은 아닙니다.
 * XSS 공격자가 소스코드에 접근할 수 있다면 여전히 복호화 가능합니다.
 * 최선의 보안을 위해서는 HttpOnly Cookie + 백엔드가 필요합니다.
 */

const ENCRYPTION_KEY_NAME = 'gitGlances:encKey';

// 암호화 키를 생성하거나 가져오기
async function getOrCreateKey(): Promise<CryptoKey> {
  // 세션 스토리지에서 키 확인 (페이지 새로고침 시에도 유지)
  const storedKey = sessionStorage.getItem(ENCRYPTION_KEY_NAME);

  if (storedKey) {
    try {
      const keyData = JSON.parse(storedKey);
      return await crypto.subtle.importKey(
        'jwk',
        keyData,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      );
    } catch (error) {
      // 키 import 실패시 새로 생성
    }
  }

  // 새 암호화 키 생성
  const key = await crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  );

  // 키를 세션 스토리지에 저장 (탭이 닫히면 사라짐)
  const exportedKey = await crypto.subtle.exportKey('jwk', key);
  sessionStorage.setItem(ENCRYPTION_KEY_NAME, JSON.stringify(exportedKey));

  return key;
}

// 문자열을 ArrayBuffer로 변환
function stringToArrayBuffer(str: string): Uint8Array {
  const encoder = new TextEncoder();
  return encoder.encode(str);
}

// ArrayBuffer를 문자열로 변환
function arrayBufferToString(buffer: ArrayBuffer): string {
  const decoder = new TextDecoder();
  return decoder.decode(buffer);
}

// ArrayBuffer를 Base64로 변환
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Base64를 ArrayBuffer로 변환
function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

/**
 * 토큰을 암호화합니다
 */
export async function encryptToken(token: string): Promise<string> {
  if (!token) return '';

  try {
    const key = await getOrCreateKey();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV for AES-GCM
    const encodedToken = stringToArrayBuffer(token);

    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      encodedToken
    );

    // IV와 암호화된 데이터를 결합하여 저장
    const combined = new Uint8Array(iv.length + encryptedData.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(encryptedData), iv.length);

    return arrayBufferToBase64(combined.buffer);
  } catch (error) {
    console.error('Token encryption failed:', error);
    // 암호화 실패시 평문 반환 (fallback)
    return token;
  }
}

/**
 * 암호화된 토큰을 복호화합니다
 */
export async function decryptToken(encryptedToken: string): Promise<string> {
  if (!encryptedToken) return '';

  try {
    const key = await getOrCreateKey();
    const combined = new Uint8Array(base64ToArrayBuffer(encryptedToken));

    // IV와 암호화된 데이터 분리
    const iv = combined.slice(0, 12);
    const encryptedData = combined.slice(12);

    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedData
    );

    return arrayBufferToString(decryptedData);
  } catch (error) {
    console.error('Token decryption failed:', error);
    // 복호화 실패시 원본 반환 (이전 평문 토큰과의 호환성)
    return encryptedToken;
  }
}

/**
 * 브라우저가 Web Crypto API를 지원하는지 확인
 */
export function isCryptoSupported(): boolean {
  return typeof crypto !== 'undefined' && !!crypto.subtle;
}
