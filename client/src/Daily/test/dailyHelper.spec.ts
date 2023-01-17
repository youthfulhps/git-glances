import { getDestructuredRepo } from '../utils/dailyHelper';
import { mockedNestedRepository, mockedDestructuredRepository } from './mocks';

describe('dailyHelper는 매일 확인하기 위한 선택된 저장소의 전처리된 결과를 반환한다.', () => {
  it('getDestructuredRepo는 중첩된 객체에서 선택된 데일리 저장소를 반환한다.', () => {
    expect(getDestructuredRepo(mockedNestedRepository)).toStrictEqual(
      mockedDestructuredRepository
    );
  });
});
