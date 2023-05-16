//Import puppeteer module to use in our project
import puppeteer from "puppeteer";

// ---------------- Configure the use of puppeteer -------------------------//
// We'll use a single function to get all the quotes from the website: http://quotes.toscrape.com/
// Start a Puppeteer session with:
// - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
// - no default viewport (`defaultViewport: null` - website page will in full width and height)
const getQuotes = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });

  // ----------------- Initiate Scrapping Process (Entire Website) -------------------- //

  // Open a new Page:
  // On this new page:
  // - open the "http://quotes.toscrape.com/" website
  // - wait until the dom content is loaded (HTML is ready)
  //   const page = await browser.newPage();
  //   await page.goto("http://quotes.toscrape.com/", {
  //     waitUntil: "domcontentloaded",
  //   });

  // ----------------Scrapping the first quote from the webpage ----------------------- //
  //   const page = await browser.newPage();
  //   await page.goto("http://quotes.toscrape.com/", {
  //     waitUntil: "domcontentloaded",
  //   });

  //   // Get the Page Data
  //   const quotes = await page.evaluate(() => {
  //     // Fetch the first element with class "quote"
  //     const quote = document.querySelector(".quote");

  //     // Fetch the sub-elements from the previously fetched quote element
  //     // Get the displayed text and return it (`.innerText`)
  //     const text = quote.querySelector(".text").innerText;
  //     const author = quote.querySelector(".author").innerText;

  //     return { text, author };
  //   });

  //   // Display the quote
  //   console.log(quotes);

  //   // Close the browser
  //   await browser.close();

  // -------------------- Scrapping all the quotes from the website -------------------- //
  const page = await browser.newPage();
  await page.goto("http://quotes.toscrape.com/", {
    waitUntil: "domcontentloaded",
  });

  //   // Get the Page Data
  const quotes = await page.evaluate(() => {
    // Fetch the first element with class "quote"
    const quoteList = document.querySelectorAll(".quote");

    // Convert the quoteList to an iterable array
    // For each quote fetch the text and author

    return Array.from(quoteList).map((quote) => {
      // Get the displayed text and return it (`.innerText`)
      const text = quote.querySelector(".text").innerText;
      const author = quote.querySelector(".author").innerText;
      return { text, author };
    });
  });

  // Display the quote
  console.log(quotes);

  // Close the browser
  await browser.close();
};

// Start Scrapping by call getQuotes:
getQuotes();
