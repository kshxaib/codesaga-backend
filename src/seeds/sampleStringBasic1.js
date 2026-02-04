export const sampleStringBasic1 = {
  title: "Reverse a String",
  description: "Given a string s, reverse it and return the reversed string.",
  difficulty: "EASY",
  tags: ["String", "Two Pointers"],
  constraints: "1 <= s.length <= 10^5",
  hints: "Try iterating from the end of the string.",
  editorial: "The simplest approach is to reverse the string using two pointers or built-in methods.",
  testcases: [
    { input: "hello", output: "olleh" },
    { input: "CodeSaga", output: "agaSedoC" }
  ],
  examples: {
    PYTHON: {
      input: "hello",
      output: "olleh",
      explanation: "Reversing 'hello' gives 'olleh'"
    },
    JAVA: {
      input: "abc",
      output: "cba",
      explanation: "Characters reversed"
    },
    JAVASCRIPT: {
      input: "xyz",
      output: "zyx",
      explanation: "Simple reverse"
    }
  },
  codeSnippets: {
    PYTHON: `s = input().strip()
# Write your code here
print("")`,

    JAVA: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String s = sc.nextLine();
    // Write your code here
    System.out.println("");
  }
}`,

    JAVASCRIPT: `const fs = require('fs');
const s = fs.readFileSync(0,'utf8').trim();
// Write your code here
console.log("");`
  },
  referenceSolutions: {
    PYTHON: `s = input().strip()
print(s[::-1])`,

    JAVA: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String s = sc.nextLine();
    System.out.println(new StringBuilder(s).reverse().toString());
  }
}`,

    JAVASCRIPT: `const fs = require('fs');
const s = fs.readFileSync(0,'utf8').trim();
console.log(s.split('').reverse().join(''));`
  }
};

