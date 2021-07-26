import { expect } from 'chai';
import { parseActions, parseMapDimensions, parseRobot } from '../../src/utils/files';
import Robot from '../../src/classes/Robot';
import { Direction } from '../../types';

describe('#parseMapDimensions', () => {
  context('with a string', () => {
    it('should raise an exception if the string is empty', () => {
      expect(() => parseMapDimensions('')).to.throw();
    });
    it('should raise an exception with an invalid string', () => {
      expect(() => parseMapDimensions('6 6 6')).to.throw();
    });
    it('should return a parsed coordinates object', () => {
      const result = parseMapDimensions('5 10');
      expect(result).to.has.property('x');
      expect(result).to.has.property('y');
      expect(result.x).to.be.eq(5);
      expect(result.y).to.be.eq(10);
    });
  });
});

describe('#parseRobot', () => {
  context('with a string', () => {
    const bigMap = { x: 50, y: 50 };
    const smallMap = { x: 2, y: 2 };
    it('should raise an exception if the string is empty', () => {
      expect(() => parseRobot('', 0, bigMap)).to.throw();
    });
    it('should raise an exception with an invalid string', () => {
      expect(() => parseRobot('A A', 0, bigMap)).to.throw();
    });
    it('should raise an exception with an initial position outside the map', () => {
      expect(() => parseRobot('5 5 E', 0, smallMap)).to.throw();
    });
    const result = parseRobot('5 10 E', 0, bigMap);
    it('should return a Robot instance', () => {
      expect(result).to.be.instanceOf(Robot);
    });
    it('the Robot instance should have the correct initial position set', () => {
      expect(result).to.have.property('position');
      expect(result.position.x).to.be.eq(5);
      expect(result.position.y).to.be.eq(10);
    });
    it('the Robot instance should have the correct initial direction set', () => {
      expect(result).to.have.property('direction');
      expect(result.direction).to.be.eq(Direction.E);
    });
  });
});

describe('#parseActions', () => {
  context('with a string', () => {
    it('should raise an exception with an invalid string', () => {
      expect(() => parseActions(Array(150).join('F'), 0)).to.throw();
    });
    it('should raise an exception with an invalid action', () => {
      expect(() => parseActions('TTT', 0)).to.throw();
    });
    const result = parseActions('RLR', 0);
    it('should return an Array of actions', () => {
      expect(result).to.be.an('array');
    });
  });
});
