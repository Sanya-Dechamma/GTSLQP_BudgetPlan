<script>
import {authHandlers} from "../../store/store";
import { calculateBudget } from './calculate.js';

let showForm = false;
let totalAmount = 0;
let exceededBudget = 0;
let savedBudget = 0;
let totalAllocatedBudget = 0;
let expenses = [];

function handleAddNewClick() {
    showForm = true;
}

function handleCloseForm() {
    showForm = false;
}

function handleFormSubmit(event) { 
    event.preventDefault();
    const expenseCategory = event.target.elements['expense-category'].value; //form input
    const expenseAmount = parseFloat(event.target.elements['expense-amount'].value);

    const expenseDisplay = document.getElementById('expense-display');
    const expenseItem = document.createElement('div');
    expenseItem.classList.add('expense-item'); 
    expenseItem.style.marginBottom = '15px';  //display&add class

    const expenseText = document.createTextNode(` ${expenseCategory}: $${expenseAmount}`);

    const trashCanIcon = document.createElement('i');
    trashCanIcon.classList.add('fa-regular', 'fa-trash-can');
    trashCanIcon.style.cssText = 'cursor: pointer; font-size: 0.7em; opacity:0.4;';

    trashCanIcon.addEventListener('click', () => handleDelete(expenseDisplay, expenseItem));

    expenseItem.appendChild(trashCanIcon);
    const gap = document.createTextNode('\u00A0\u00A0 ');

    expenseItem.appendChild(gap);
    expenseItem.appendChild(expenseText);

    expenseDisplay.appendChild(expenseItem);
    expenses.push({ category: expenseCategory, amount: expenseAmount });
    event.target.reset();

    handleCloseForm();
}

function handleBudgetInput(event) {
    const totalAllocatedBudgetInput = event.target;
    if(totalAllocatedBudgetInput.value < 0)
{
    totalAllocatedBudgetInput.value = 0;
}
}

function handleCalculateClick() {
    const budgetResults = calculateBudget(totalAllocatedBudget, expenses);
    totalAmount = budgetResults.totalAmount;
    exceededBudget = budgetResults.exceededBudget;
    savedBudget = budgetResults.savedBudget;
  }

  function handleDelete(expenseDisplay, expenseItem) {
    const index = Array.from(expenseDisplay.children).indexOf(expenseItem);
    if (index !== -1) {
        expenseItem.remove();
        expenses.splice(index, 1);
        expenses = [...expenses]; // Trigger 
    }
}

function handleRefreshClick() { //clear out items
    expenses = [];
    totalAmount = 0;
    exceededBudget = 0;
    savedBudget = 0;
    totalAllocatedBudget = 0;
    document.getElementById('expense-display').innerHTML = '';

}
</script>


<div class="mainCont">
    <div class="headCont">
        <h1 class="head-center">Budget Planner</h1>
        <div class = "hdrbtn">
            <button class="refresh-button" on:click={handleRefreshClick}>
                <i class="fa-solid fa-sync"></i>
                <span>Clear All</span>
            </button>
            <button on:click={authHandlers.logout}>
                <i class="fa-solid fa-right-from-bracket"></i>
                <p>Logout</p>
            </button>
            </div>
        </div>

        <div class="budget-input">
            <label>
                <span>Total allocated budget ($):</span>
                <input id="totalAllocatedBudget" type="number" bind:value={totalAllocatedBudget} min="0" on:input={handleBudgetInput} />    
              </label>
        </div>     

        <main>
            <div class="button-cotainer">
              <button class="add-new-button" on:click={() => handleAddNewClick()}>
                <i class="fa-solid fa-plus"></i><span style="gap: 10px;"></span>Add Item</button>
              </div>
      </main>

      {#if showForm}
      <div class="popup-overlay">
        <div class="popup-box">
        <form class="expense-form" on:submit={handleFormSubmit}>
      <label for="expense-category">Category:</label>
      <select id="expense-category" name="expense-category" required>
        <option value="" disabled selected hidden>Choose</option>
          <option value="Rent">Rent</option>
          <option value="Groceries">Groceries</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Utilities">Utilities</option>
          <option value="Transportation">Transportation</option>
          <option value="Phone & Internet Bills">Phone & Internet Bills</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Shopping">Shopping</option>
          <option value="Restaurant & Bars">Restaurant & Bars</option>
          <option value="Travel">Travel</option>
          <option value="Personal Care & Hygiene">Personal Care & Hygiene</option>
          <option value="Education">Education</option>
          <option value="Gifts">Gifts</option>
          <option value="Insurance">Insurance</option>
          <option value="Club Membership">Club Membership</option>
          <option value="Subscription">Subscriptions</option>
          <option value="Pet Expenses">Pet expenses</option>
          <option value="Mortgage">Mortgage</option>
          <option value="Repairs & Maintenance">Repairs & Maintenance</option>
          <option value="Other">Other</option>
      </select>

      <label for="expense-amount">Amount:</label>
      <input type="number" id="expense-amount" name="expense-amount" min="0" required>

      <button type="submit">Add</button>
      <button type="button" on:click={() => handleCloseForm()}>Cancel</button>
    </form>

        </div>
      </div>
      {/if}

  

      <div id="expense-display"></div>

      <div class="budget-info">
        <div class="total-amount">
          <span>Total Amount : </span>
          <span id="total-amount">${totalAmount}</span>
        </div>
      
        <div class="exceeded-budget">
          <span>Exceeded Budget Amount :</span>
          <span id="exceeded-budget">${exceededBudget}</span>
        </div>
      
        <div class="saved-budget">
          <span>Saved Budget Amount :</span>
          <span id="saved-budget">${savedBudget}</span>
        </div>
        
        <div class="calculate-button">
            <button class="calculate" on:click={handleCalculateClick}>
              <i class="fa-solid fa-calculator"></i><span style="gap: 10px;"></span>Calculate
            </button>
          </div>
   
      </div>
    </div>


        <style>
       .mainCont {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        gap: 24px;
        padding: 24px;
        width: 100%;
        margin: 0 auto;
    }

    .headCont{
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.5rem;
    }
    .head-center {
        text-align: center;
        flex: 1;
}
   
    .headCont button {
        background: #04273d;
        color: white;
        padding: 14px 35px;
        border: none;
        border-radius: 25px;
        font-size: 1rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    }
    .headCont button i {
        font-size: 1.2rem;
    }
    .headCont button:hover {
        background: rgb(92, 186, 165);
    }

    .hdrbtn {
        display: flex;
        align-items: center;
        gap: 14px;
    }
    main {
        display: flex;
        flex-direction: column;
        gap: 8px;
        flex: 1;
    }
    .budget-input {
        position: fixed;
        top: 150px;
        left: 100px;
        font-size: 25px;
        z-index: 0;
    }
    .budget-input span{
        font-size: 26px;
        margin-right: 5px;
    }
    .budget-input input[type="number"] {
        border: none;
        border-bottom: 1px solid #ccc;
        padding: 8px;
        width: 130px;
        font-size: 13px;
    }
    .add-new-button {
    margin-top: 100px;
    margin-bottom: 40px;
    margin-left: 80px;
    padding:10px 8px;
    right: 100px;
    font-size: 20px;
    background-color: #04273d;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
  }
  .add-new-button:hover{
   background-color: #65afc1;
  }

  .add-new-button i {
    margin-right: 10px;
}

  .budget-info span {
  font-size: 25px;
  }

  .calculate {
    margin-top: 5px;
    margin-bottom: 40px;
    padding: 10px 20px;
    font-size: 20px;
    background-color: #04273d;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
  }
  .calculate:hover{
   background-color: #65afc1;
  }

.budget-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    position: absolute;
    top: 250px;
    right: 200px;
}

.calculate-button {
    margin-top: 10px;
}

.calculate {
    display: block; 
}
.calculate i {
    margin-right: 10px;
}
@media screen and (max-width:1008px) {
    .budget-info {
        display: none;
    }
}  

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10001;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-box {
  background-color: #071e35;
  padding: 20px;
  border-radius: 40px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 500px;
}
.expense-form {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }

    .expense-form label {
        font-weight: bold;
    }

    .expense-form select,
    .expense-form input[type="text"],
    .expense-form input[type="number"] {
        padding: 9px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }



    .expense-form button {
        padding: 5px 10px;
        background-color: #145c5f;
        color: rgb(246, 240, 240);
        border: none;
        border-radius: 5px;
        font-weight: bold;
        font-size: 0.8rem;
        cursor: pointer;
    }

    .expense-form button[type="submit"] {
        margin-top: 10px;
    }

    .expense-form button[type="submit"]:hover,
    .expense-form button[type="button"]:hover {
        background-color: #65afc1;
    }

    #expense-display {
    font-size: 23px; 
    position: absolute;
    margin-left: 70px;
    margin-top: 250px;
    }

    .refresh-button {
    margin-left: 20px;
    padding: 10px 20px;
    background-color: #04273d;
    color: white;
    border: none;
    border-radius: 12px;
    cursor: pointer;
}
.refresh-button:hover {
    background-color: #65afc1;
}
  </style>
