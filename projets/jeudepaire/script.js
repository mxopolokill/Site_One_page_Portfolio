const deckCards = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg","1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg"];// Tableau d'images de jeux de cartes
const deck = document.querySelector(".deck");//Accéder au <ul> avec la classe de .deck
let opened = [];//Créez un tableau vide pour stocker les cartes ouvertesAccéder au <ul> avec la classe de .deck
let matched = [];// Créez un tableau vide pour stocker les cartes correspondantes.
const modal = document.getElementById("modal");//acces  a #modal
const reset = document.querySelector(".reset-btn");//access  bouton reset 
const playAgain = document.querySelector(".play-again-btn");//acceder au bouton play again 
const movesCount = document.querySelector(".moves-counter");//selectionner la class moove-counter  pour le changementde l'html 
let moves = 0;//Créer une variable pour le compteur de mouvements, démarrer le compte à zéro.
const star = document.getElementById("star-rating").querySelectorAll(".star");//acces a l'élement <ul>  ayant l'id Star rating dans la section <li> 
let starCount = 3;//Variable permettant de suivre le nombre d'étoiles restantes
const timeCounter = document.querySelector(".timer");//Obtenez le tag span pour le timer.
let time;// Utiliser cette variable pour arrêter le temps démarré dans le timer.
let minutes = 0;// Créez des variables pour le comptage du temps, commencez tous à zéro.
let seconds = 0;// Créez des variables pour le comptage du temps, commencez tous à zéro.
let timeStart = false;// À utiliser dans l'écouteur d'événements de la carte de clic.


//fonction random card, shuffle module de mélangement
function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;}return array;}

//Commencez la partie : Mélangez le jeu, 
//créez des balises <li> et <img> et ajoutez au paquet <ul> avec le nouveau contenu mélangé.
function startGame() { 
	const shuffledDeck = shuffle(deckCards); // Invoquer la fonction shuffle et la stocker dans une variable.
	for (let i = 0; i < shuffledDeck.length; i++) {// Itération sur un tableau de cartes
		const liTag = document.createElement('LI');// Créer les balises <li>
		liTag.classList.add('card');// Donner <li>la classe de la carte
		const addImage = document.createElement("IMG");// Créer les balises <img>
		liTag.appendChild(addImage);// Ajouter <img>à <li>.
		addImage.setAttribute("src", "./img/" + shuffledDeck[i] + "?raw=true");// Définir le chemin src de l'image avec le dec mélangé
		addImage.setAttribute("alt", "image of vault boy from fallout");// Ajouter une balise alt à l'image
		deck.appendChild(liTag);/* Mise à jour du nouveau <li> au pont <ul>. */}}  
		startGame();

//Supprimez tous les nœuds enfants des balises <li> etbalises <img>.
//  A appeler dans la fonction set everything uniquement
function removeCard() {
	
	while (deck.hasChildNodes()) {// Tant que le pont <ul> a un nœud enfant, le supprimer.
		deck.removeChild(deck.firstChild);}}

//Mise à jour de la minuterie dans le HTML pour les minutes et les secondesCette fonction timer() 
//est invoquée dans l'écouteur d'événementsau premier clic sur la carteUtilisée : https://www.w3schools.com/js/js_timing.asp
function timer() {
	time = setInterval(function() {// Mise à jour du compte toutes les 1 seconde
		seconds++;
			if (seconds === 60) { minutes++; seconds = 0;}
		timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Timer: " + minutes + " Mins " + seconds + " Secs" ;// Mettez à jour le minuteur en HTML avec le temps que met l'utilisateur à jouer au jeu.
	}, 1000);}

//arrêter le chronomètre une fois que l'utilisateur a apparié les 16 cartes, 
//soit un total de 8 paires Utilisé comme compréhension et aide https://www.w3schools.com/js/js_timing.asp
function stopTime() {
	clearInterval(time);
}
  //Réinitialiser toutes les variables globales et le contenu des éléments HTML timer, stars, moves, et les éléments HTML internes moves et timer
function resetEverything() {
	stopTime();//Arrêtez l'heure, remettez les minutes et les secondes à zéro et mettez à jour l'heure en HTML
	timeStart = false;
	seconds = 0;
	minutes = 0;
	timeCounter.innerHTML = "<i class='fa fa-hourglass-start'></i>" + " Temps: 00:00";
	star[1].firstElementChild.classList.add("fa-star"); //Remettez le compte des étoiles à zéro et ajoutez la classe pour afficher à nouveau les étoiles.
	star[2].firstElementChild.classList.add("fa-star");
	starCount = 3;
	moves = 0;//Réinitialiser le compte des mouvements et réinitialiser son HTML interne.
	movesCount.innerHTML = 0;
	matched = [];// Effacer les deux tableaux contenant les cartes ouvertes et appariées.
	opened = [];
	removeCard();// Effacer le pont
	startGame();/* Créer un nouveau pont*/}


//Incrémente le compteur de mouvements.  
//A appeler à chaque comparaison pour chaque deux cartes comparées ajouter un au compteur
function movesCounter() {
	movesCount.innerHTML ++;// Mise à jour du html pour le compteur de mouvements
	moves ++;/* Garder la trace du nombre de coups pour chaque paire vérifiée.*/}

	//Mettez à jour le classement par étoiles.  
	//En fonction du nombre de mouvements que l'utilisateur effectue dans le jeu, 
	//les étoiles diminueront avec le plus de mouvements que l'utilisateur prend.
function starRating() {
	if (moves === 14) {
		star[2].firstElementChild.classList.remove("fa-star");//// Le premier élément enfant est le <i> à l'intérieur du <li>.
		starCount--;}
	if (moves === 18) {
		star[1].firstElementChild.classList.remove("fa-star");
		starCount--;}}

//Comparez deux cartes pour voir si elles correspondent ou non.
function compareTwo() {
	if (opened.length === 2) {// Quand il y a 2 cartes dans le tableau ouvert
  		document.body.style.pointerEvents = "none";/* Désactiver tout autre clic de souris sur les autres cartes.*/}
	if (opened.length === 2 && opened[0].src === opened[1].src) {// Comparez les deux images src
		match();// En cas de correspondance, appelez match()
	} else if (opened.length === 2 && opened[0].src != opened[1].src) { //console.log("It's a Match !") ;
		noMatch();/*Si aucune correspondance, appelez noMatch(). console.log("NO Match!");*/ }}

//Si les deux cartes correspondent,
// gardez les cartes ouvertes et appliquer la classe de correspondance
function match() { 
	setTimeout(function() {//Accédez aux deux cartes dans le tableau ouvert et ajoutez la classe de correspondance au parent des images : la balise <li>.
		opened[0].parentElement.classList.add("match");
		opened[1].parentElement.classList.add("match");
		matched.push(...opened);// Poussez les cartes correspondantes dans le tableau correspondant.
		document.body.style.pointerEvents = "auto";	// Permettre d'autres clics de souris sur les cartes
		winGame();// Vérifiez si le jeu a été gagné avec les 8 paires.
		opened = [];// Effacer le tableau ouvert
	}, 600);
	movesCounter();// Appelez movesCounter pour l'incrémenter d'une unité.
	starRating();}

	//Si les deux cartes ne correspondent pas, 
	//retirez les cartescartes du tableau ouvert et retournez les cartes en retirant la classeen retirant la classe de retournement.
function noMatch() {
	setTimeout(function() {//Après 700 milisecondes, les deux cartes ouvertes aurontla classe de flip supprimée de l'élément parent des images <li>.
		opened[0].parentElement.classList.remove("flip");// Suppression du retournement de classe sur l'élément parent des images
		opened[1].parentElement.classList.remove("flip");// Suppression du retournement de classe sur l'élément parent des images
		document.body.style.pointerEvents = "auto";// Autoriser les clics de souris supplémentaires sur les cartes
		opened = [];// Retirer les cartes du tableau ouvert
	}, 700);
	movesCounter();// Appelez movesCounter pour l'incrémenter d'une unité.
	starRating();}

	//Obtenez des statistiques sur le temps, le nombre de coups, 
	//et le classement par étoilespour la fin de partie et mettez à jour la modale avec ces statistiques.
function AddStats() {
	const stats = document.querySelector(".modal-content");// Accéder au contenu modal div
	for (let i = 1; i <= 3; i++) {// Créer trois paragraphes différents
		const statsElement = document.createElement("p");	// Créer un nouveau paragraphe
		statsElement.classList.add("stats");	// Ajouter une classe au nouveau Paragraphe
		stats.appendChild(statsElement);/*Add the new created <p> tag to the modal content*/}
	let p = stats.querySelectorAll("p.stats"); // Sélectionnez toutes les balises p avec la classe de stats et mettez à jour le contenu
		p[0].innerHTML = "temps de complétion du jeu " + minutes + " minutes et  " + seconds + " secondes";// Définir le nouveau <p> pour qu'il ait le contenu des statistiques (temps, mouvements et classement par étoiles).
		p[1].innerHTML = "mouvement utilisé " + moves;
		p[2].innerHTML = "Votre classement par étoiles est : " + starCount + " sur 3"; }

//Afficher la modale lors du gain de la partie Aide avec la modale de :https://www.w3schools.com/howto/howto_css_modals.asp
function displayModal() {
const modalClose = document.getElementsByClassName("close")[0];// Accéder à l'élément modal <span> (x) qui ferme la modale
	modal.style.display= "block";// Lorsque la partie est gagnée, la modale devient un bloc d'affichage pour la montrer.
	modalClose.onclick = function() {// Lorsque l'utilisateur clique sur <span>(x), fermer la modale
		modal.style.display = "none";	};
	window.onclick = function(event) {// Quand l'utilisateur clique n'importe où en dehors de la modale, la fermer.
		if (event.target == modal) {
			modal.style.display = "none"; }};}
			
//Vérifiez la longueur du tableau apparié et s'il y a sont 8 paires 16 cartes ensemble alors le jeu est gagné. 
//Arrêtez le chronomètre, mettez à jour la modale avec les statistiques et affichez la modale.
function winGame() {
	if (matched.length === 16) {
		stopTime();
		AddStats();
		displayModal();}}

		var soundMain;
		var soundMain = "./sfx/starting-round-csgo-music-sound-effect.mp3";

//Event Listener si une carte <li> est cliquée appelle flipCard()
deck.addEventListener("click", function(evt) {
	if (evt.target.nodeName === "LI") {         //event = création évenement 
												//TARGET = referencement d'un objet spécifique ayant recueillis un évenement au click
												//NodeName = La propriété nodeName renvoie le nom du noeud spécifié donc ici on vas ce servir d'un noeud d'élément car il renvera le nom d'une balise 
												// === ce qui signie strictement égale 
												// LI est le grand chef des Li étant situer dans la fonction  Startgame.
		console.log(evt.target.nodeName + " Was clicked");// Pour vérifier si je clique sur le bon élément.
		if (timeStart === false) { // Démarre le minuteur après le premier clic d'une carte, Exécute la fonction timer()
			timeStart = true; 
			timer();
			soundMain = document.getElementById("soundMain");}
		flipCard();/* Appelez la fonction flipCard()*/}
	function flipCard() { // Retourner la carte et afficher les cartes img
		evt.target.classList.add("flip");// Lorsque l'on clique sur <li>, ajouter la classe .flip pour afficher l'image.Appel de la fonction addToOpened()
		addToOpened();/*Appel de la fonction addToOpened()*/}
	function addToOpened() {//Ajoutez les cartes retournées au tableau vide des cartes ouvertes.
		if (opened.length === 0 || opened.length === 1) {//Si le tableau ouvert contient zéro ou une autre image, il faut pousser une autre image dans le tableau. dans le tableau afin que nous puissions comparer les deux pour les faire correspondre.
			opened.push(evt.target.firstElementChild);}//Poussez cet img dans le tableau ouvert
		compareTwo();/*Appelez la fonction compareTwo()*/ }}); //Écouteur d'événements

//écouteur d'événements pour écouter un clic sur le bouton de Une fois le bouton cliqué, 
//il faut appeler resetEverything().
reset.addEventListener('click', resetEverything);

//Ecouteur d'événements pour écouter un clic sur le bouton de lecture une fois qu'il a cliqué, 
//il appelle resetEverything().
playAgain.addEventListener('click',function() { 
	modal.style.display = "none";
	resetEverything(); });