import { useReducer } from "react";
import "./index.css";

const initialState = {
  inputValue: "",
  entryType: "Expense",
  entries: [],
  balance: 50,
};
 
function reducer(state, action) {
  switch (action.type) {
    case "SET_INPUT":
      return { ...state, inputValue: action.payload };

    case "SET_TYPE":
      return { ...state, entryType: action.payload };

    case "ADD_ENTRY": {
      const amount = parseFloat(state.inputValue);
      if (isNaN(amount)) return state;

      const newEntry = {
        id: Date.now(),
        name: state.entryType,
        amount,
      };

      const updatedBalance = ["Income", "Salary"].includes(state.entryType)
        ? state.balance + amount
        : state.balance - amount;

      return {
        ...state,
        entries: [...state.entries, newEntry],
        inputValue: "",
        balance: updatedBalance,
      };
    }

    case "DELETE_ENTRY": {
      const entryToDelete = state.entries.find((e) => e.id === action.payload);
      if (!entryToDelete) return state;

      const updatedEntries = state.entries.filter((e) => e.id !== action.payload);
      const updatedBalance = ["Income", "Salary"].includes(entryToDelete.name)
        ? state.balance - entryToDelete.amount
        : state.balance + entryToDelete.amount;

      return {
        ...state,
        entries: updatedEntries,
        balance: updatedBalance,
      };
    }

    default:
      return state;
  }
}

export default function AddTransaction() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSubmit = () => {
    if (!state.inputValue || isNaN(state.inputValue)) {
      alert("Please enter a valid amount");
      return;
    }

    dispatch({ type: "ADD_ENTRY" });
  };

  return (
    <div id="container">
      <h1 className="head">Add New Transaction</h1>

      <h2 className="balance">Current Balance: ${state.balance.toFixed(2)}</h2>

      <label htmlFor="region">Choose entry type:</label>
      <select
        name="Entry Type"
        className="select"
        value={state.entryType}
        onChange={(e) => dispatch({ type: "SET_TYPE", payload: e.target.value })}
      >
        <option value="Expense">Expense</option>
        <option value="Rent">Rent</option>
        <option value="Food">Food</option>
        <option value="Salary">Salary</option>
        <option value="Income">Income</option>
      </select>

      <div className="input-container">
        <label htmlFor="amount">Amount</label>
        <input
          type="text"
          id="amount"
          value={state.inputValue}
          onChange={(e) => dispatch({ type: "SET_INPUT", payload: e.target.value })}
          placeholder="0"
        />
      </div>

      <button className="button" onClick={handleSubmit}>
        Add Transaction
      </button>

      <table className="entry-table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {state.entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.name}</td>
              <td>${entry.amount.toFixed(2)}</td>
              <td>
                <button onClick={() => dispatch({ type: "DELETE_ENTRY", payload: entry.id })}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}