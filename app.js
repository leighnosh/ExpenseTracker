document.addEventListener('DOMContentLoaded', loadExpenses);

let editMode = false;

let entryCounter = 1;

function loadExpenses() {
    const expenseList = document.getElementById('expenseList');
    expenseList.innerHTML = '';

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.includes('entry')) {
            const expense = JSON.parse(localStorage.getItem(key));
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.id = `expenseItem-${key}`;
            li.innerHTML = `
                ${expense.entry} - ${expense.description} - ${expense.category}
                <button class="btn btn-danger btn-sm float-right" onclick="deleteExpense('${key}')">Delete</button>
                <button class="btn btn-primary btn-sm float-right mr-2" onclick="editExpense('${key}')">Edit</button>
            `;
            expenseList.appendChild(li);
        }
    }
}

function addExpense() {
    const expenseAmount = document.getElementById('expenseAmount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    if (expenseAmount && description && category) {
        const expense = { entry: expenseAmount, description, category };
        const key = `entry-${entryCounter}`;
        entryCounter++; 
        localStorage.setItem(key, JSON.stringify(expense));
        loadExpenses();
        clearInputs();
    }
}

function deleteExpense(key) {
    localStorage.removeItem(key);
    loadExpenses();
}

function editExpense(key) {
    if (!editMode) {
        const expenseItem = document.getElementById(`expenseItem-${key}`);
        const expense = JSON.parse(localStorage.getItem(key));

        expenseItem.innerHTML = `
            <input type="number" class="form-control" id="editAmount" value="${expense.entry}">
            <input type="text" class="form-control" id="editDescription" value="${expense.description}">
            <select class="form-control" id="editCategory">
                <option value="Food" ${expense.category === 'Food' ? 'selected' : ''}>Food</option>
                <option value="Transportation" ${expense.category === 'Transportation' ? 'selected' : ''}>Transportation</option>
                <option value="Entertainment" ${expense.category === 'Entertainment' ? 'selected' : ''}>Entertainment</option>
                <option value="Other" ${expense.category === 'Other' ? 'selected' : ''}>Other</option>
            </select>
            <button class="btn btn-success btn-sm float-right" onclick="saveEdit('${key}')">Save</button>
        `;

        editMode = true;
    }
}

function saveEdit(key) {
    const editedAmount = document.getElementById('editAmount').value;
    const editedDescription = document.getElementById('editDescription').value;
    const editedCategory = document.getElementById('editCategory').value;

    if (editedAmount && editedDescription && editedCategory) {
        const editedExpense = { entry: editedAmount, description: editedDescription, category: editedCategory };
        localStorage.setItem(key, JSON.stringify(editedExpense));
        editMode = false;
        loadExpenses();
    }
}

function clearInputs() {
    document.getElementById('expenseAmount').value = '';
    document.getElementById('description').value = '';
    document.getElementById('category').value = '';
}
