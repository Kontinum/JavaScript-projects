"use strict";

import * as Helpers from "./helpers.js";

//Api links
const searchBookApiLink = "https://openlibrary.org/search.json?title=";
const getAuthorImgLink = "https://covers.openlibrary.org/a/olid/";

//Elements
const bookSearchBtn = document.querySelector(".bookSearchBtn");
const bookTitle = document.querySelector(".bookTitle");
const errMessageContainer = document.querySelector(".errMessage");
const resultsContainer = document.querySelector(".results");
const spinner = document.querySelector(".spinner");

//Messages
const emptyBookTitleMessage = "Please enter book title!";
const noBookFoundMessage = "No book found. Try with another title! :)";

const searchBooks = function () {
  Helpers.clearInnerHTML(resultsContainer);
  Helpers.setText(errMessageContainer, "");
  if (bookTitle.value.length === 0) {
    Helpers.setText(errMessageContainer, emptyBookTitleMessage);
    return;
  }
  Helpers.display(spinner);

  const bookTitleString = prepareBookTitleString(bookTitle.value);
  searchBookData(bookTitleString);
};

bookSearchBtn.addEventListener("click", searchBooks);

const searchBookData = async function (bookTitle) {
  try {
    const bookInfoResponse = await fetch(searchBookApiLink + bookTitle);
    const bookInfoData = await bookInfoResponse.json();
    Helpers.hide(spinner);

    if (bookInfoData.docs.length === 0) {
      Helpers.setText(errMessageContainer, noBookFoundMessage);
      return;
    }
    const bookData = bookInfoData.docs[0];

    displayResults(bookData);

    console.log(bookData);
  } catch (error) {
    Helpers.setText(errMessageContainer, error.message);
  }
};

const prepareBookTitleString = function (bookTitle) {
  return bookTitle.replaceAll(" ", "+");
};

const displayResults = function (bookData) {
  const html = `
  <h4>Book has been found! <span class="red">${bookData.title} :)</span> :</h4>
        <h5>Author: ${bookData.author_name}</h5>
        <img src=${createAuthorImgLink(bookData.author_key)} />
        <ul>
            <li>Published: ${bookData.first_publish_year}</li>
            <li>Pages: ${bookData.number_of_pages_median}</li>
        </ul>
        <h5>First sentence: <span class="red">${
          bookData.first_sentence?.[0]
            ? bookData.first_sentence
            : "No first sentence avaliable :("
        }</span></h5>
    `;

  resultsContainer.insertAdjacentHTML("beforeend", html);
};

const createAuthorImgLink = function (authorKey, size = "M") {
  return getAuthorImgLink + authorKey + `-${size}.jpg`;
};
