const assert = require("assert");

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
const toString = function (tree) {
	if (tree.operator === '') {
	  return tree.value.toString();
	}
  
	return `(${
	  toString(tree.left) + ' ' + tree.operator + ' ' + toString(tree.right)
	})`;
};

const result = function (tree) {
	switch (tree.operator) {
	  case '+':
		return result(tree.left) + result(tree.right);
	  case '-':
		return result(tree.left) - result(tree.right);
	  case 'x':
		return result(tree.left) * result(tree.right);
	  case '÷':
		return result(tree.left) / result(tree.right);
	  default:
		return tree.value;
	}
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

console.log(result(tree), toString(tree));

assert.strictEqual('((7 + ((3 - 2) x 5)) ÷ 6)', toString(tree));
assert.strictEqual(2, result(tree));