export const sampleMathBasic2 = {
  title: "Count Digits",
  description: "Given an integer n, count the number of digits in it.",
  difficulty: "EASY",
  tags: ["Math"],
  constraints: "-10^9 <= n <= 10^9",
  hints: "Convert number to string or repeatedly divide by 10.",
  editorial: "We can count digits by converting the number to a string or by repeated division.",
  testcases: [
    { input: "12345", output: "5" },
    { input: "-90", output: "2" }
  ],
  examples: {
    PYTHON: {
      input: "100",
      output: "3",
      explanation: "100 has 3 digits"
    }
  },
  codeSnippets: {
    PYTHON: `n = input().strip()
# Write your code here
print("")`,

    JAVA: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String n = sc.nextLine();
    // Write your code here
    System.out.println("");
  }
}`,

    JAVASCRIPT: `const fs = require('fs');
const n = fs.readFileSync(0,'utf8').trim();
// Write your code here
console.log("");`
  },
  referenceSolutions: {
    PYTHON: `n = input().strip()
print(len(n.replace('-', '')))`,

    JAVA: `import java.util.*;
public class Main {
  public static void main(String[] args) {
    Scanner sc = new Scanner(System.in);
    String n = sc.nextLine().replace("-", "");
    System.out.println(n.length());
  }
}`,

    JAVASCRIPT: `const fs = require('fs');
const n = fs.readFileSync(0,'utf8').trim().replace('-', '');
console.log(n.length);`
  }
};
