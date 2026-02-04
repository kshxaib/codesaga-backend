export const sampleMathBasic3 = {
  title: "Even or Odd",
  description: "Given an integer n, determine whether it is even or odd.",
  difficulty: "EASY",
  tags: ["Math", "Operators"],
  constraints: "-10^9 <= n <= 10^9",
  hints: "Use modulo operator.",
  editorial: "If n % 2 == 0 it is even, otherwise odd.",
  testcases: [
    { input: "4", output: "Even" },
    { input: "7", output: "Odd" }
  ],
  examples: {
    JAVASCRIPT: {
      input: "10",
      output: "Even",
      explanation: "10 is divisible by 2"
    }
  },
  codeSnippets: {
    PYTHON: `n = int(input())
# Write your code here
print("")`,

    JAVA: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    // Write your code here
    System.out.println("");
  }
}`,

    JAVASCRIPT: `const fs = require('fs');
const n = parseInt(fs.readFileSync(0,'utf8').trim());
// Write your code here
console.log("");`
  },
  referenceSolutions: {
    PYTHON: `n = int(input())
print("Even" if n % 2 == 0 else "Odd")`,

    JAVA: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    int n = sc.nextInt();
    System.out.println(n % 2 == 0 ? "Even" : "Odd");
  }
}`,

    JAVASCRIPT: `const fs = require('fs');
const n = parseInt(fs.readFileSync(0,'utf8').trim());
console.log(n % 2 === 0 ? "Even" : "Odd");`
  }
};
