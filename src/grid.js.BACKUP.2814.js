var _ = require('lodash');
/**
 * @author Andrei Cojocariu
 */

/**
 * @typedef {Object} Item
 * @property {Number} id Unique identifier.
 * @property {Number} stack The stack this item is part of.
 */

/**
 * @typedef {Number[4]} Position
 *
 * The position and size are numbers that represent percentages i.e. x: 10 means
 * that the items will be positioned 10% of the container's width to the left.
 *
 * @property {Number} 1 The x position.
 * @property {Number} 2 The y position.
 * @property {Number} 3 The width.
 * @property {Number} 4 The height.
 */


/**
 * Create a new grid that efficiently places the given items.
 * @class
 *
 * @param {Item[]} items
 */

function Grid(items) {

    var itemCount,
        stackCount = 1, // at least one stack
        largestStackSize = 1, // at least one item per stack
        itemsPerStack,
        squareDiv, // number of grid divisions
        width,
        height;
    var i, j, k, key;

    //Sorting the object by its properties using lodash.
    items = _.sortByAll(items, ['stack', 'id']);

    this._items = items;
    this.Position = {};
    itemCount = this._items.length;

    function getNextClosestSqrt(number) {
        /**
         * Finds out closest bigger square and returns the root.
         *
         * @param {Number} number - The number we want to fit in a square
         * @returns {Number} Square root 
         */
        if (typeof number !== 'number') {
            return undefined;
        }
        var nextSqrt,
            multiple = 1;

        function square(val) {
            /**
             * Getting square of value
             *
             * @param {Number} val - number for which the square is wanted
             * @returns {Number} Square
             */
            return val * val;
        }
        while (square(multiple) <= number) {
            if (square(multiple) === number) {
                return multiple;
            }
            multiple++;
        }
        nextSqrt = square(multiple);
        return Math.sqrt(nextSqrt);
    }    
    /**
     * Counting stacks and getting the size of the stack with most items
     */
    for (i = 0; i < this._items.length - 1; i++) {
        if (this._items[i].stack !== this._items[i + 1].stack) {
            stackCount++;
            itemsPerStack = 1;
        } 
        else itemsPerStack++;
        if (itemsPerStack > largestStackSize) largestStackSize = itemsPerStack;
    }

    /**
     * CASE 1 - when there are no stacks with multiple items.
     */
    if (largestStackSize === 1) {
        key = 0;
        // Get square divisions by number of items per line
        squareDiv = getNextClosestSqrt(stackCount);
        width = 100 / squareDiv; // width of each item
        var numberOfLines = Math.ceil(itemCount / squareDiv);
        height = 100 / numberOfLines; // height of each item

        // Creating grid with items from left to right and 
        // from top to bottom 
        for (i = 0; i < squareDiv; i++) {
            for (j = 0; j < squareDiv; j++) {
                // Don't exceed number of items when creating the grid
                if (key === itemCount) break;
                // Inserting item values [x pos, y pos, width, height]
                this.Position[this._items[key].id] = [
                    j * width,
                    i * height,
                    width,
                    height
                ];
                key++; // Next item
            }
        }
    }

    /**
     * CASE 2 - Grid will have stacks with multiple items
     */
    else {
        // Calculating grid divisions

        // Fitting itemCount into a square
        var nextClosestSqrt = getNextClosestSqrt(itemCount);
<<<<<<< HEAD
        //console.log(nextClosestSqrt);
=======
        console.log(nextClosestSqrt);
>>>>>>> iss#1
        if(stackCount <= nextClosestSqrt) {
            // There is no need for another stack column
            if(stackCount <= largestStackSize) squareDiv = largestStackSize;
            // If stackCount > largestStackSize means that we need to 
            // stretch the grid horizontally
            else squareDiv = nextClosestSqrt;
        }
        // Case where stackCount > nextClosestSqrt but still needs to have a single stack column
        else if(largestStackSize <= nextClosestSqrt && stackCount/largestStackSize < 2) {
            squareDiv = stackCount;
        }
        else {
            // There should be more than one stack column
            var cols = Math.ceil(stackCount / nextClosestSqrt);
            if(largestStackSize * cols <= nextClosestSqrt)
                // It fits horizontally
                // The side can be ODD
                squareDiv = nextClosestSqrt;
                // Else we have to make sure that it will
            else squareDiv = largestStackSize * cols;
        }

        // Calculating number of stacks on each line helps calculating
        // number of items per line
        var numberOfStacksPerLine = Math.floor(squareDiv / largestStackSize),
            numberOfColumns = 0;
        width = 0;
        height = 0;
        key = 0;

        if (numberOfStacksPerLine === 1 && itemsPerStack < stackCount) 
            numberOfColumns = itemsPerStack;
        else numberOfColumns = itemsPerStack * numberOfStacksPerLine;

        width = 100 / numberOfColumns; // width of each item
        height = 100 / squareDiv; // height of each item

        // Creating grid with stacks from top to bottom and left to right and 
        // with items inside them from left to right

        for (i = 0; i < numberOfStacksPerLine; i++)
            for (k = 0; k < squareDiv; k++)
                for (j = 0; j < itemsPerStack; j++) {
                        // Don't exceed number of items when creating the grid
                        if (key === itemCount) break;
                        // Inserting item values [x pos, y pos, width, height] 
                        this.Position[this._items[key].id] = [
                            i * itemsPerStack * width + j * width,
                            k * height,
                            width,
                            height
                        ];
                        key++; // Next item
                }

    }
    //console.log(this.Position);
}

/**
 * Get the positions of the items.
 *
 * Items will be stacked and sorted by ID inside the stacks. The stacks are
 * sorted by stack ID.
 *
 * The stacks will be positioned inside a minimum square (the length of its side
 * is minimized). Items inside a stack will be positioned from left to right. A
 * stack can't span more than one row.
 *
 * If the largest stack has only one item, the stacks will be positioned from
 * left to right and from top to bottom. If the largest stack has more than one
 * item, then they will be positioned top-bottom and left-right.
 *
 * @returns {Object.<ID, Position>}
 */
Grid.prototype.getPositions = function() {

    return this.Position;
};

module.exports = Grid;



/*

5 stack-uri de cate 3 elemente => 6x6. Solutia corecta este un grid de 3x5. 
Problema este la bucata asta de cod

else squareDiv = largestStackSize * cols;

Cand intri pe branch-ul asta, ti-ai dat seama ca patratul ales anterior nu 
este destul de incapator pentru toate stack-urile.  Formula aleasa de tine 
va calcula latura unui patrat mult prea mare.


5 3
8 4
10 7
12 6
20 2
*/
