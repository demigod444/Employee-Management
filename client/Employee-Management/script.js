var selectedRow = null

function onFormSubmit() {
    if (validate()){
        
        var formData = readFormData();
        if (selectedRow == null)
            insertNewRecord(formData);
        else
            updateRecord(formData);
        resetForm();
    }
}

function readFormData() {
    var formData = {};
    formData["fullName"] = document.getElementById("fullName").value;
    formData["empCode"] = document.getElementById("empCode").value;
    formData["salary"] = document.getElementById("salary").value;
    formData["city"] = document.getElementById("city").value;
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("employeeList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.fullName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.empCode;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.salary;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = data.city;
    cell4 = newRow.insertCell(4);
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

function resetForm() {
    document.getElementById("fullName").value = "";
    document.getElementById("empCode").value = "";
    document.getElementById("salary").value = "";
    document.getElementById("city").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("empCode").value = selectedRow.cells[1].innerHTML;
    document.getElementById("salary").value = selectedRow.cells[2].innerHTML;
    document.getElementById("city").value = selectedRow.cells[3].innerHTML;
}
function updateRecord(formData){
    selectedRow.cells[0].innerHTML = formData.fullName;
    selectedRow.cells[1].innerHTML = formData.empCode;
    selectedRow.cells[2].innerHTML = formData.salary;
    selectedRow.cells[3].innerHTML = formData.city;
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("employeeList").deleteRow(row.rowIndex);
        resetForm();
    }
}
function validate() {
    isValid = true;
    var name = document.getElementById("fullName").value
    var salaryInput = document.getElementById("salary").value;
    var EMPInput = document.getElementById("empCode").value;
    var cityInput = document.getElementById("city").value;
    if (name == "" || name.length >= 20) {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    }
    else if (!/^\d+$/.test(EMPInput)) {
        isValid = false;
        document.getElementById("EMPValidationError").classList.remove("hide");
    }
    else if (!/^\d+$/.test(salaryInput)) {
        isValid = false;
        document.getElementById("SalaryValidationError").classList.remove("hide");
    }
    else if (!/^[a-zA-Z]+$/.test(cityInput)) {
        isValid = false;
        document.getElementById("CityValidationError").classList.remove("hide");
    } 
    else{
        isValid = true;
        document.getElementById("fullNameValidationError").classList.add("hide");
        document.getElementById("SalaryValidationError").classList.add("hide");
        document.getElementById("EMPValidationError").classList.add("hide");
        document.getElementById("CityValidationError").classList.add("hide");
    }
    return isValid;
}