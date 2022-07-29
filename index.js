const assert = require("assert");
const math = require('mathjs');

const Node = (operator, value, left, right) => {
  return {
    operator,
    value,
    left,
    right,
  };
};


// using recursion to get the string expression
// instaed of using switch case use the operator chan as it is 
const toString = (tree) => {
	if (tree === null || tree?.operator === null) {
		return 'Incorrect Node input';
	}

	if (tree.operator === '') {
	  return tree.value.toString();
	}
  
	return `(${
	  toString(tree.left) + ' ' + tree.operator + ' ' + toString(tree.right)
	})`;
};

// Use toString function to get the expression
// then replace sthe char 'x' and '÷' as they are not read by compiler while performing calculation
// the use math library to evalute the result
const result = (tree) => {
	if (tree === null || tree?.operator === null) {
		return 'Incorrect Node input';
	}

	return math.evaluate(toString(tree)?.replace('x', '*')?.replace('÷', '/'));
};

const tree = Node(
  "÷",
  null,
  Node(
    "+",
    null,
    Node("", 7, null, null),
    Node(
      "x",
      null,
      Node("-", null, Node("", 3, null, null), Node("", 2, null, null)),
      Node("", 5, null, null)
    )
  ),
  Node("", 6, null, null)
);

try {
	console.log(result(tree), toString(tree));
} catch (error) {
	console.log(error);
}

try {
	assert.strictEqual('((7 + ((3 - 2) x 5)) ÷ 6)', toString(tree));
} catch (error) {
	console.log(error);
}
  
try {
	assert.strictEqual(2, result(tree));
} catch (error) {
	console.log(error);
}
  