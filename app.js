"use strict";

const billInput = document.getElementById("bill-input");
const blockTipInput = document.querySelector(".block-tip-input");
const tipsInput = document.querySelectorAll(".tip");
const customInput = document.querySelector(".custom");
const numberOfPeopleInput = document.getElementById("number-of-people-input");
const resetButton = document.querySelector("button[type='reset']");

let bill = 100;
let tip = 0.15;
let numberOfPeople = 5;

// set and validate bill
billInput.addEventListener("change", (event) => {
	let inputValue = event.target.value;
	if (+inputValue > 0) {
		inputValue = +inputValue;
		bill = inputValue;
		billInput.value = inputValue.toFixed(2);
		calculateTip(tip, bill, numberOfPeople);
		return;
	}
	billInput.placeholder = 0;
	bill = undefined;
	showError(event);
});

// set tip
blockTipInput.addEventListener("click", (event) => {
	if (!event.target.classList.contains("tip")) return;

	tipsInput.forEach((tip) => tip.classList.remove("tip-selected"));
	event.target.classList.add("tip-selected");

	if (event.target.classList.contains("custom")) return;
	tip = parseInt(event.target.innerText) / 100;
	calculateTip(tip, bill, numberOfPeople);
});

// validate custom input
customInput.addEventListener("change", (event) => {
	let inputValue = event.target.value;
	if (+inputValue > 0) {
		tip = +inputValue / 100;
		calculateTip(tip, bill, numberOfPeople);
		return;
	}

	customInput.value = "";
	tip = undefined;
	showError(event);
});

// validate input of number of people
numberOfPeopleInput.addEventListener("change", (event) => {
	if (event.target.value <= 0 || event.target.value > 10000) {
		showError(event);
		numberOfPeople = undefined;
		return;
	}
	numberOfPeople = +event.currentTarget.value;
	calculateTip(tip, bill, numberOfPeople);
});

function showError(event) {
	const label = event.target.parentElement.previousElementSibling;
	label.classList.add("error");
	setTimeout(() => {
		label.classList.remove("error");
	}, 2000);
}

function calculateTip(tip, bill, numberOfPeople) {
	if (!tip || !bill || !numberOfPeople) return;

	const tipPerPerson = document.querySelector(".block-tip-amount .show-data span");
	const totalPerPerPerson = document.querySelector(".block-total .show-data span");

	let tipResult = (bill * tip) / numberOfPeople;
	let totalResult = (bill * (1 + tip)) / numberOfPeople;

	tipResult > 1000000
		? (tipPerPerson.innerText = tipResult.toPrecision(3))
		: (tipPerPerson.innerText = tipResult.toFixed(2));

	totalResult > 1000000
		? (totalPerPerPerson.innerText = totalResult.toPrecision(3))
		: (totalPerPerPerson.innerText = totalResult.toFixed(2));
}

// implement reset button functionality