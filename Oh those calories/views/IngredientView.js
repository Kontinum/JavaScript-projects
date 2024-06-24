import { IMG_LINK } from "../config.js";

class IngredientView {
  #container = document.querySelector(".ingredient-info");
  #loader = document.querySelector(".ingredient-loader");
  #siteInfo = document.querySelector(".site-info");
  #ingredientErrorContainer = document.querySelector(".ingredient-error");
  #ingredientErrorMessageEl = document.querySelector(
    ".ingredient-error-message"
  );
  #errorMessage =
    "Cannot fetch data for this ingredient. Try with another one.";

  displayIngredient(ingredient) {
    const HTML = `
    <div class="ingredient-header">
    <div class="row">
      <div class="col s12 center-align">
        <img src="${IMG_LINK}/${
      ingredient.image
    }" alt="" class="circle responsive-img z-depth-3">
      </div>
    </div>
    <div class="row">
      <div class="col s12 center-align ingredient-info-name">
        ${ingredient.name} nutrient information
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="row percentage-info">
    <div class="col s3"></div>
    <div class="col l2 m12 s12 center-align white z-depth-1 percentage-box">
      <span class="big-percent">${
        ingredient.percentageNutrients.protein
      }%</span>
      <span class="percentage-info-nutrient">protein</span>
    </div>
    <div class="col l2 m12 s12 center-align white z-depth-1 percentage-box">
      <span class="big-percent">${ingredient.percentageNutrients.fat}%</span>
      <span class="percentage-info-nutrient">fat</span>
    </div>
    <div class="col l2 m12 s12 center-align white z-depth-1 percentage-box">
      <span class="big-percent">${ingredient.percentageNutrients.carb}%</span>
      <span class="percentage-info-nutrient">carb</span>
    </div>
    <div class="col s3"></div>
  </div>
  <div class="row nutrition-tables">
      <div class="col s3"></div>
      <div class="col l3 m12 s12">
        <div class="nutrients">
          <table class="highlight">
            <thead>
              <tr>
                <th colspan="3" class="center-align">Nutrients</th>
              </tr>
              <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th class="right-align">Daily need %</th>
              </tr>
            </thead>
            <tbody>
                ${ingredient.nutrients
                  .map(this.#generateNutrientMarkup)
                  .join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="col l3 m12 s12">
        <div class="flavonoids">
          <table class="highlight">
            <thead>
              <tr>
                <th colspan="3" class="center-align">Flavonoids</th>
              </tr>
              <tr>
                  <th>Name</th>
                  <th class="right-align">Amount</th>
              </tr>
            </thead>
            <tbody>
              ${ingredient.flavonoids
                .map(this.#generateGlavonoidMarkup)
                .join("")}
            </tbody>
          </table>
        </div>
      </div>
      <div class="col s3"></div>
  </div>
  <div class="row glycemic-info">
    <div class="col s4"></div>
    <div class="col l2 m12 s12 center-align white z-depth-1 glycemic-box">
      <span class="big-glycemic ${ingredient.glycemicData.index.class}">${
      ingredient.glycemicData.index.value
    }</span>
      <span class="glycemic-info-name">Glycemic index</span>
    </div>
    <div class="col l2 m12 s12 center-align white z-depth-1 glycemic-box">
      <span class="big-glycemic ${ingredient.glycemicData.load.class}">${
      ingredient.glycemicData.load.value
    }</span>
      <span class="glycemic-info-name">Glycemic load</span>
    </div>
    <div class="col s4"></div>
  </div>
    `;

    this.#container.insertAdjacentHTML("beforeend", HTML);
  }

  #generateNutrientMarkup(nutrient) {
    return `<tr>
    <td>${nutrient.name}</td>
    <td>${nutrient.amount}${nutrient.unit}</td>
    <td class="daily-need-percent">${nutrient.percentOfDailyNeeds}</td>
  </tr>`;
  }
  #generateGlavonoidMarkup(flavonoid) {
    return `<tr>
        <td>${flavonoid.name}</td>
        <td class="right-align">${flavonoid.amount}${flavonoid.unit}</td>
      </tr>`;
  }
  renderError(message = this.#errorMessage) {
    this.hideLoader();
    this.#ingredientErrorContainer.classList.remove("hide");
    this.#ingredientErrorMessageEl.textContent = message;
  }

  showLoader() {
    this.#loader.classList.remove("hide");
  }
  hideLoader() {
    this.#loader.classList.add("hide");
  }
  emptyResults() {
    this.#container.innerHTML = "";
    this.#siteInfo.classList.remove("hide");
    this.#ingredientErrorContainer.classList.add("hide");
  }
  hideSiteInfo() {
    this.#siteInfo.classList.add("hide");
  }
}

export default new IngredientView();
