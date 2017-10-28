import { expect } from 'chai';
import * as utils from '../src/utils';

describe('normaliseData', () => {
    const data = [
      { _id: 50, title: 'cooking' },
      { _id: 23, title: 'coding' },
      { _id: 56, title: 'football' }
        ];
    const exp = {
      '23': { _id: 23, title: 'coding' },
      '50': { _id: 50, title: 'cooking' },
      '56': { _id: 56, title: 'football' }
    };
    it('returns normalised data', () => {
      expect(utils.normaliseData(data)).to.eql(exp);
    });
  });
