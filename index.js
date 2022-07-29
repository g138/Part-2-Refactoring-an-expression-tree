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

  // using recursion to get the string expression
  // instaed of using switch case use the operator chan as it is 
  const toString = function () {
    if (operator === '') {
		return value.toString();
	  }
  
	  return `(${left.toString() + ' ' + operator + ' ' + right.toString()})`;
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

console.log(tree.toString())

assert.strictEqual("((7 + ((3 - 2) x 5)) ÷ 6)", tree.toString());
assert.strictEqual(2, tree.result());