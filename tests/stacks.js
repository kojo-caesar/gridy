var Grid = require('../src/grid.js'),
    _ = require('lodash');


describe('Grid', function() {
  describe('with 2 stacks x 2 elements', function() {
    it('should place each stack on a row', function() {
      var grid = new Grid([
        {id: 1, stack: 1},
        {id: 2, stack: 1},
        {id: 3, stack: 2},
        {id: 4, stack: 2}
      ]);

      expect(grid).to.have.positions({
        1: [0, 0, 50, 50],
        2: [50, 0, 50, 50],
        3: [0, 50, 50, 50],
        4: [50, 50, 50, 50]
      });
    });
  });

  describe('with 3 stacks x 3 elements', function() {
    it('should place each stack on a row', function() {
      var grid = new Grid([
        {id: 1, stack: 1},
        {id: 2, stack: 1},
        {id: 3, stack: 1},
        {id: 4, stack: 2},
        {id: 5, stack: 2},
        {id: 6, stack: 2},
        {id: 7, stack: 3},
        {id: 8, stack: 3},
        {id: 9, stack: 3}
      ]);

      expect(grid).to.have.positions({
        1: [0, 0, 33.33, 33.33],
        2: [33.33, 0, 33.33, 33.33],
        3: [66.66, 0, 33.33, 33.33],
        4: [0, 33.33, 33.33, 33.33],
        5: [33.33, 33.33, 33.33, 33.33],
        6: [66.66, 33.33, 33.33, 33.33],
        7: [0, 66.66, 33.33, 33.33],
        8: [33.33, 66.66, 33.33, 33.33],
        9: [66.66, 66.66, 33.33, 33.33]
      });
    });
  });

  describe('with 5 stacks x 2 elements', function() {
    it('should place 4 on the left and 1 on the right', function() {
      var grid = new Grid([
        {id: 1, stack: 1}, {id: 2, stack: 1},
        {id: 3, stack: 2}, {id: 4, stack: 2},
        {id: 5, stack: 3}, {id: 6, stack: 3},
        {id: 7, stack: 4}, {id: 8, stack: 4},
        {id: 9, stack: 5}, {id: 10, stack: 5}
      ]);

      expect(grid).to.have.positions({
        1: [0, 0, 25, 25],
        2: [25, 0, 25, 25],
        3: [0, 25, 25, 25],
        4: [25, 25, 25, 25],
        5: [0, 50, 25, 25],
        6: [25, 50, 25, 25],
        7: [0, 75, 25, 25],
        8: [25, 75, 25, 25],
        9: [50, 0, 25, 25],
        10: [75, 0, 25, 25],
      });
    });
  });
  describe('with 5 stacks x 3 elements', function() {
    it('should place each stack on a row', function() {
      var grid = new Grid([
        {id: 1, stack: 1}, {id: 2, stack: 1}, {id: 3, stack: 1},
        {id: 4, stack: 2}, {id: 5, stack: 2}, {id: 6, stack: 2},
        {id: 7, stack: 3}, {id: 8, stack: 3}, {id: 9, stack: 3},
        {id: 10, stack: 4}, {id: 11, stack: 4}, {id: 12, stack: 4},
        {id: 13, stack: 5}, {id: 14, stack: 5}, {id: 15, stack: 5}
      ]);

      expect(grid).to.have.positions({
        1: [0, 0, 33.33, 20],
        2: [33.33, 0, 33.33, 20],
        3: [66.66, 0, 33.33, 20],
        4: [0, 20, 33.33, 20],
        5: [33.33, 20, 33.33, 20],
        6: [66.66, 20, 33.33, 20],
        7: [0, 40, 33.33, 20],
        8: [33.33, 40, 33.33, 20],
        9: [66.66, 40, 33.33, 20],
        10: [0, 60, 33.33, 20],
        11: [33.33, 60, 33.33, 20],
        12: [66.66, 60, 33.33, 20],
        13: [0, 80, 33.33, 20],
        14: [33.33, 80, 33.33, 20],
        15: [66.66, 80, 33.33, 20]
      });
    });
  });
  describe('with 8 stacks x 4 elements', function() {
    it('should place each stack on a row', function() {
      var grid = new Grid(_.times(8 * 4, function(i) {
        return {id: i, stack: parseInt(i / 4)};
      }));

      var p = {}, width = 100 / 4, height = 100 / 8, i;
      for (i = 0; i < 8 * 4; i++) {
        p[i] = [
          i % 4 * width,
          parseInt(i / 4) * height,
          width,
          height
        ];
      }

      expect(grid).to.have.positions(p);
      console.log(p);
    });
  });
  describe('with 11 stacks x 4 elements', function() {
    it('should place 8 on the left and 3 on the right', function() {
      var grid = new Grid(_.times(11 * 4, function(i) {
        return {id: i, stack: parseInt(i / 4)};
      }));

      var p = {}, width = 100 / 8, height = 100 / 8, i;
      for (i = 0; i < 8 * 4; i++) {
        p[i] = [
          i % 4 * width,
          parseInt(i / 4) * height,
          width,
          height
        ];
      }
      for (i = 8 * 4; i < 11 * 4; i++) {
        p[i] = [
          i % 4 * width + 4 * width,
          (parseInt(i / 4) - 8) * height,
          width,
          height
        ];
      }

      expect(grid).to.have.positions(p);
    });
  });
});
