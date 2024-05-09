export function calculateBudget(totalAllocatedBudget, expenses) {
    const totalAmount = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const exceededBudget = Math.max(0, totalAmount - totalAllocatedBudget);
    const savedBudget = Math.max(0, totalAllocatedBudget - totalAmount);
  
    return {
        totalAmount,
        exceededBudget,
        savedBudget
    };
  }