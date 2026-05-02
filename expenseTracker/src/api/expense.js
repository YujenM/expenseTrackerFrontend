export default {
  expense: "v1/expense/expense",
  categoryExpense: "v1/expense/expense/category",
  updateDeleteExpense:(id)=>`v1/expense/expense/${id}`,
  monthlyBudget:"v1/expense/expense/monthlyBudget"
};
