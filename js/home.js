const bgColor = document.querySelector('.bgcolor')
const modalForm = document.querySelector('.modal_form')
const openBtnModal = document.querySelector('.open_modal')
const xIcon = document.querySelector('.fa-xmark')
const closeBtnModal = document.querySelector('.close_btn')
const addedDataBtn = document.querySelector('.added_data_btn')
const dataTablet = document.querySelector('.json_data')

const firstNameValue = document.querySelector('#firstname')
const lastNameValue = document.querySelector('#lastname')
const addressValue = document.querySelector('#address')
const birthdayValue = document.querySelector('#birthday')
const positionFormValue = document.querySelector('#position_form')
const positionTypeFormValue = document.querySelector('#position_type_form')
const salaryValue = document.querySelector('#salary')
const isMarriedCheck = document.querySelector('#isMarried_form')

const search = document.querySelector('#search')
const positionTypeFilter = document.querySelector('#position_type')
const isMarriedFilter = document.querySelector('#isMarried')


openBtnModal.addEventListener('click', () =>{
    modalForm.classList.remove('open_form');
    bgColor.classList.remove('open_form');
})

bgColor.addEventListener("click", ()=>{
    modalForm.classList.add('open_form');
    bgColor.classList.add('open_form');
})

xIcon.addEventListener("click", ()=>{
    modalForm.classList.add('open_form');
    bgColor.classList.add('open_form');
})

closeBtnModal.addEventListener("click", ()=>{
    modalForm.classList.add('open_form');
    bgColor.classList.add('open_form');
})

modalForm.addEventListener('click', e =>{
    e.stopPropagation()
})
let dataStudent = JSON.parse(localStorage.getItem('students')) || []

function studentData(dataStudent) {
    let str = ''
    dataStudent.forEach(data => {
        str += `
            <tr>
            <th>${data.id}</th>
            <td>${data.firstName}</td>
            <td>${data.lastName}</td>
            <td>${data.address}</td>
            <td>${data.birthday}</td>
            <td>${data.position}</td>
            <td>${data.positionType}</td>
            <td>${data.salary}</td>
            <td>${data.isMarried ? 'Yes' : 'No'}</td>
            <td>
            <button type="submit" class="add_btn" onclick = 'editBtn(${data.id})'>Edit</button>
            <button type="submit" class="add_btn delete_btn" onclick = 'deleteBtn(${data.id})'>Delete</button>
            </td>
            </tr>
        `
    });
    dataTablet.innerHTML = str;
}
studentData(dataStudent);

addedDataBtn.addEventListener('click', e =>{
    e.preventDefault();
    let dataStudent = JSON.parse(localStorage.getItem('students')) || []
    let newData = {
        id: dataStudent.length + 1,
        firstName: firstNameValue.value,
        lastName: lastNameValue.value,
        address: addressValue.value,
        birthday: birthdayValue.value,
        position: positionFormValue.value,
        positionType: positionTypeFormValue.value,
        salary: salaryValue.value,
        isMarried: isMarriedCheck.checked,
    }

    if ((firstNameValue.value == '') && (lastNameValue.value == '')) {
        alert('Please ')
    }
    else{
        modalForm.classList.add('open_form');
        bgColor.classList.add('open_form');
        location.reload()
        let newDatas = [...dataStudent, newData]
        studentData(newDatas)
        localStorage.setItem('students', JSON.stringify(newDatas))
    }

})

search.addEventListener('input', e=>{
    let b = e.target.value.toLowerCase();
    let dataStudent = JSON.parse(localStorage.getItem('students'))
    let filterData = dataStudent.filter(e=>
        e.firstName.toLowerCase().includes(b) ||
        e.lastName.toLowerCase().includes(b)
    )
    studentData(filterData)
})

positionTypeFilter.addEventListener('click', e=>{
    let b = e.target.value;
    let filterData = dataStudent.filter(e=>
        e.positionType.includes(b)
    )
    studentData(filterData)
})

isMarriedFilter.addEventListener('click', e=>{
    let b = e.target.checked;
    console.log(isMarried.checked);
    if(b){
        let data = []
        dataStudent.forEach(e=>
            e.isMarried ? data.push(e) : []
            )
            studentData(data)
    }
    else {
        let data = []
        dataStudent.forEach(e=>
            e.isMarried ? [] : data.push(e)
            )
            studentData(data)
    }
})


function deleteBtn(data) {
    let dataStudent = JSON.parse(localStorage.getItem('students'))
    let newData = dataStudent.filter(e=>
        e.id !== data
    )
    studentData(newData)
    localStorage.setItem('students', JSON.stringify(newData))
}

function editBtn(data) {
    let dataStudent = JSON.parse(localStorage.getItem('students'))
    let newData = dataStudent.find(e=>
        e.id == data
    )
    modalForm.classList.remove('open_form');
    bgColor.classList.remove('open_form');

    firstNameValue.value = newData.firstName
    lastNameValue.value = newData.lastName
    addressValue.value = newData.address
    birthdayValue.value = newData.birthday
    positionFormValue.value = newData.position
    positionTypeFormValue.value = newData.positionType
    salaryValue.value = newData.salary
    isMarriedCheck.checked = newData.isMarried

    addedDataBtn.addEventListener('click', e=>{
        e.preventDefault()
        console.log(e.target);
    })
    studentData(newData)
    localStorage.setItem('students', JSON.stringify(newData))
}
