import { expect } from 'chai';
import { Direction } from '../../types';
import { directionArray, applyCircularTurn } from '../../src/utils';

describe('#applyCircularTurn', () => {
  context('with 0 value', () => {
    const initialDirection = Direction.N;
    const valueToTest = applyCircularTurn(initialDirection, 0);
    it('should be a valid Direction', () => {
      expect(directionArray).to.be.include(valueToTest);
    });
    it('should be the same Direction', () => {
      expect(valueToTest).to.be.eq(initialDirection);
    });
  });

  context('with positive value and North as initial value', () => {
    const initialDirection = Direction.N;
    it('should be a valid Direction', () => {
      const valueToTest = applyCircularTurn(initialDirection, 1);
      expect(directionArray).to.be.include(valueToTest);
    });
    it('should be West with a value of 1', () => {
      const valueToTest = applyCircularTurn(initialDirection, 1);
      expect(valueToTest).to.be.eq(Direction.W);
    });
    it('should be East with a value of 3', () => {
      const valueToTest = applyCircularTurn(initialDirection, 3);
      expect(valueToTest).to.be.eq(Direction.E);
    });
    it('should be South with a value of 6', () => {
      const valueToTest = applyCircularTurn(initialDirection, 6);
      expect(valueToTest).to.be.eq(Direction.S);
    });
  });

  context('with negative value and North as initial value', () => {
    const initialDirection = Direction.N;
    it('should be a valid Direction', () => {
      const valueToTest = applyCircularTurn(initialDirection, -1);
      expect(directionArray).to.be.include(valueToTest);
    });
    it('should be East with a value of -1', () => {
      const valueToTest = applyCircularTurn(initialDirection, -1);
      expect(valueToTest).to.be.eq(Direction.E);
    });
    it('should be West with a value of -3', () => {
      const valueToTest = applyCircularTurn(initialDirection, -3);
      expect(valueToTest).to.be.eq(Direction.W);
    });
    it('should be South with a value of -6', () => {
      const valueToTest = applyCircularTurn(initialDirection, -6);
      expect(valueToTest).to.be.eq(Direction.S);
    });
  });
});
