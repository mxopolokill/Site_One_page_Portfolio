const inputElem = document.querySelector('#input-name');//constante élement HTML
const form = document.querySelector('#form');//constante élement HTML
const listElem = document.querySelector('#to-do-list');//constante élement HTML
const buttonElem = document.querySelector('#to-do-list button');//constante élement HTML

const toDoArray = JSON.parse(localStorage.getItem('to-do-list')) || [];////renvoie la valeur spécifier  





//fonction de mise a jour de la to do list lors de l'ajout d'un élement 
function updateList(){
  listElem.innerHTML = '';

  for (const key in toDoArray) {
    const li = document.createElement('li');//création constant li pour la création d'une liste a puce 

    const span = document.createElement('span');//création dune constante  pour l'élement texte
    span.innerText = toDoArray[key];

    const button = document.createElement('button');//création d'une constante bouton pour obtenir un bouton de suppresion 
    button.innerText = 'Delete';//insertion du Text delete dans le button 
    button.setAttribute('key',key); 
    button.classList.add('delete');

    li.appendChild(span);//situer le lieu de la création de la span 
    li.appendChild(button);//situer le lieu de la création du  bouton  
    listElem.appendChild(li);//situer le lieu de la création du li  
  }

  localStorage.setItem('to-do-list',JSON.stringify(toDoArray));//ajout des valeurs 
}




//fonctio ajout d'un élement
function addToList(value){
  if (value === '') return;// si la valeur est vide rien ne se passe

  toDoArray.push(value);// si la veleur et remplie alors cela lance la fonction updatelist

  updateList();//lance de la fonction spécifique 
  inputElem.value = '';//récuperation de la valeur marquer 
  inputElem.focus();//garde la valeur précedente 
}




//fonction suppression élement 
function deleteFromList(key){

  toDoArray.splice(Number(key),1);//récupération de l'id key

  updateList();//ouvre la fonction updateliste
  inputElem.value = '';//vide totalement la valeur 
  inputElem.focus();//
}

//ajout de l'évement d'ajout d'un élement en apuyyant sur le bouton add
form.addEventListener('submit', e => {
  e.preventDefault();
  addToList(inputElem.value);// ajout la valeur présente dans l'input
});




//un évenement de suppresion delement au click sur bouton 
document.addEventListener('click', e => {
  const el = e.target;
  if (el.classList.contains('delete')){ 
    deleteFromList(el.getAttribute('key'));//supprime l'id spécifique de l'élement voulant etre supprimer 
  }
});

updateList();