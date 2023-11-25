function getCurrentDate(){

    let date = new Date();
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;

}
function updateExpenses(){
    localStorage.setItem('expenses',JSON.stringify(expenses));
    localStorage.setItem('expId',id);

}
function deleteExpense(idNum){
    expenses = expenses.filter(obj=>obj.id!==idNum);
    updateExpenses();
    displayExpenses(expenses);
}
let expenses = JSON.parse(localStorage.getItem('expenses'))??[];
let id = +(localStorage.getItem('expId')??1)

function displayExpenses(data){
    let newExpens = "";

    data.forEach(obj => {
        newExpens += `
        <li class="list-group-item d-flex justify-content-between align-items-start">
            <div class="ms-2 me-auto">
                <div class="fw-bold">${obj.spentOn}</div>
                <p class="text-secondary">${obj.date}</p>
            </div>
            <div class="ms-3 me-auto">
                <div class="fw-bold">${obj.amount}</div>
            </div>
            <span data-value=${obj.id} class="badge bg-danger rounded-pill btn del-btn">Delete</span>
        </li>`;
    });
    $("#expenses-tab").html(newExpens);
    $('.del-btn').click(function(){
        deleteExpense(+$(this).attr('data-value'))
    })
    getTotal();
}

function getTotal(){
    let bal = 0;
    expenses.forEach(obj=>{
        bal+=+obj.amount;
    })
    $("#total").text(bal);
}

function getDetails() {
  let newExpens = "";

  let desc = $("#desc");
  let amnt = $("#amnt");
  if (desc.val().trim() === "" || amnt.val().trim() === "") {
    alert("Please enter all the fields!");
    return;
  }
  if (isNaN(+amnt.val().trim())) {
    alert("Amount should be a valid number!");
    return;
  }
  expenses.push({id,spentOn:desc.val(),amount:amnt.val(),date:getCurrentDate()})
    displayExpenses(expenses);
    updateExpenses();
    id++;
    desc.val('');
    amnt.val('');
}

$("#add-btn").click(() => {
  getDetails();
});

displayExpenses(expenses);