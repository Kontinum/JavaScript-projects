export const MIN_LENGTH_FOR_AUTOCOMPLETE = 3;

export const API_KEY = {
  value: "27e7ec6064fd4b0881ee2c05c7fcb5f4",
  string: "apiKey",
};
export const API_LINK_BASE = "https://api.spoonacular.com/food/ingredients";
export const IMG_LINK = "https://img.spoonacular.com/ingredients_100x100";

export const AUTOCOMPLETE_PART = "autocomplete";
export const AUTOCOMPLETE_LIMIT = 5;

export const SEARCH_PART = "search";
export const SEARCH_LIMIT = 7;

export const GLYCEMIC_CHARTS = {
  index: [
    {
      value: "LOW",
      min: 0,
      max: 55,
      class: "green-text",
    },
    {
      value: "MEDIUM",
      min: 56,
      max: 69,
      class: "orange-text",
    },
    {
      value: "HIGH",
      min: 70,
      max: 100,
      class: "red-text",
    },
  ],
  load: [
    {
      value: "LOW",
      min: 0,
      max: 10,
      class: "green-text",
    },
    {
      value: "MEDIUM",
      min: 11,
      max: 19,
      class: "orange-text",
    },
    {
      value: "HIGH",
      min: 20,
      max: 999,
      class: "red-text",
    },
  ],
};
