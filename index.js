const assert = require("assert");

const Node = (operator, value, left, right) => {
  const result = function () {
    switch (operator) {
      case "+":
        return left.result() + right.result();
      case "-":
        return left.result() - right.result();
      case "x":
        return left.result() * right.result();
      case "÷":
        return left.result() / right.result();
      default:
        return value;
    }
  };


  return {
    operator,
    value,
    left,
    right,
    result,
    toString
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

console.log(tree.result(), toString(tree));

assert.strictEqual('((7 + ((3 - 2) x 5)) ÷ 6)', toString(tree));
assert.strictEqual(2, tree.result());