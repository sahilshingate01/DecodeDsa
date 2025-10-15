import type { SearchingAlgorithm } from "../../types/algorithms";
import type { SearchStep } from "../../types/steps";
import { SearchingAlgorithms } from "../../enums/SearchingAlgorithms";

/**
 * Implementation of Jump Search algorithm
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 */
export class JumpSearch implements SearchingAlgorithm {
  public name = "Jump Search";
  public description = "Jump Search is an algorithm designed for searching in sorted arrays. It works by jumping fixed steps to find an interval where element may be present, and then uses linear search to find the exact element within that interval.";
  public timeComplexity = "O(√n)";
  public spaceComplexity = "O(1)";
  public bestCase = "O(1)";
  public worstCase = "O(√n)";
  public algorithm = SearchingAlgorithms.JumpSearch;
  public code = `function jumpSearch(arr: number[], target: number): number {
    const n = arr.length;
    const jumpSize = Math.floor(Math.sqrt(n));
    
    let currentIndex = 0;
    let previousIndex = 0;
    
    while (currentIndex < n && arr[currentIndex] <= target) {
        previousIndex = currentIndex;
        currentIndex = Math.min(currentIndex + jumpSize, n);
        
        if (arr[currentIndex - 1] === target) {
            return currentIndex - 1;
        }
    }
    
    for (let i = previousIndex; i < Math.min(currentIndex, n); i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    
    return -1;
}`;

  public generateSteps(array: number[], target: number): SearchStep[] {
    const steps: SearchStep[] = [];
    const n = array.length;
    const jumpSize = Math.floor(Math.sqrt(n)); // optimal jump size is √n
    
    let currentIndex = 0;
    let previousIndex = 0;
    
    // Add initial state
    steps.push({
      array: [...array],
      description: "Starting Jump Search with optimal jump size of " + jumpSize,
      code: "const jumpSize = Math.floor(Math.sqrt(n));",
      currentIndex: currentIndex
    });
    
    // Finding the block where element may be present
    while (currentIndex < n && array[currentIndex] <= target) {
      steps.push({
        array: [...array],
        description: `Checking block starting at index ${currentIndex}`,
        code: "while (currentIndex < n && arr[currentIndex] <= target)",
        comparing: [currentIndex],
        currentIndex: currentIndex
      });
      
      previousIndex = currentIndex;
      currentIndex = Math.min(currentIndex + jumpSize, n);
      
      if (array[currentIndex - 1] === target) {
        steps.push({
          array: [...array],
          description: `Found target ${target} at index ${currentIndex - 1}`,
          code: "if (arr[currentIndex - 1] === target) return currentIndex - 1;",
          currentIndex: currentIndex - 1,
          found: true,
          foundIndex: currentIndex - 1
        });
        return steps;
      }
    }
    
    // Linear search in the identified block
    for (let i = previousIndex; i < Math.min(currentIndex, n); i++) {
      steps.push({
        array: [...array],
        description: `Linear search within block at index ${i}`,
        code: "for (let i = previousIndex; i < Math.min(currentIndex, n); i++)",
        comparing: [i],
        currentIndex: i
      });
      
      if (array[i] === target) {
        steps.push({
          array: [...array],
          description: `Found target ${target} at index ${i}`,
          code: "if (arr[i] === target) return i;",
          currentIndex: i,
          found: true,
          foundIndex: i
        });
        return steps;
      }
    }
    
    steps.push({
      array: [...array],
      description: `Target ${target} not found in the array`,
      code: "return -1;",
      found: false
    });
    return steps;
  }
}