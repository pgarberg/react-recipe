const axios = require("axios");
const cheerio = require("cheerio");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const { URL } = require("jsdom-url");

const jackofallscrapers = async (recipe_url) => {
  const fetched_recipe = {};

  //  assign: [Function: assign],
  // replace: [Function: replace],
  // reload: [Function: reload],
  // href: [Getter/Setter],
  // toString: [Function: toString],
  // origin: [Getter],
  // protocol: [Getter/Setter],
  // host: [Getter/Setter],
  // hostname: [Getter/Setter],
  // port: [Getter/Setter],
  // pathname: [Getter/Setter],
  // search: [Getter/Setter],
  // hash: [Getter/Setter] } }
  try {
    console.log("RECIPE URL: ", recipe_url);

    const scrape = await axios.get(recipe_url);

    const dom = new JSDOM(scrape.data);

    let jsDomURL = new URL(recipe_url);
    const originURL = jsDomURL.origin;
    console.log("ORIGIN URL:", jsDomURL.origin);

    try {
      const $ = cheerio.load(scrape.data);

      let cheers;

      const cheerioFilter = [
        ...dom.window.document.querySelectorAll(
          `script[type="application/ld+json"]`
        ),
      ].filter((c) => c.innerHTML.includes("Ingredient"));
      console.log("Time to make our choice");

      if (
        JSON.parse(
          cheerioFilter[0].innerHTML
            .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
            .replace(/ /g, "SpAcE")
            .replace(/\s/g, "\\s")
            .replace(/SpAcE/g, " ")
            .replace(/(\s)/g, function ($0) {
              return $0 == " " ? " " : "\\s";
            })
            .replace(/\\/g, "")
        )["@graph"]
      ) {
        console.log("1");
        cheers = JSON.parse(
          cheerioFilter[0].innerHTML
            .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
            .replace(/ /g, "SpAcE")
            .replace(/\s/g, "\\s")
            .replace(/SpAcE/g, " ")
            .replace(/(\s)/g, function ($0) {
              return $0 == " " ? " " : "\\s";
            })
            .replace(/\\/g, "")
        )["@graph"].filter((c) => c["@type"] === "Recipe")[0];
      } else if (
        typeof JSON.parse(
          cheerioFilter[0].innerHTML
            .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
            .replace(/ /g, "SpAcE")
            .replace(/\s/g, "\\s")
            .replace(/SpAcE/g, " ")
            .replace(/(\s)/g, function ($0) {
              return $0 == " " ? " " : "\\s";
            })
            .replace(/\\/g, "")
        ) === "object"
      ) {
        console.log("2");
        cheers = JSON.parse(
          cheerioFilter[0].innerHTML
            .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
            .replace(/ /g, "SpAcE")
            .replace(/\s/g, "\\s")
            .replace(/SpAcE/g, " ")
            .replace(/(\s)/g, function ($0) {
              return $0 == " " ? " " : "\\s";
            })
            .replace(/\\/g, "")
        );
      } else {
        console.log("3");
        cheers = JSON.parse(
          cheerioFilter[0].innerHTML
            .replace(/[\x00-\x1F\x7F-\x9F]/g, "")
            .replace(/ /g, "SpAcE")
            .replace(/\s/g, "\\s")
            .replace(/SpAcE/g, " ")
            .replace(/(\s)/g, function ($0) {
              return $0 == " " ? " " : "\\s";
            })
            .replace(/\\/g, "")
        ).filter((c) => c["@type"] === "Recipe")[0];
      }

      console.log("CHEEEEEEERS : ", cheers);

      //COMMENTING BELOW OUT TO TRY AND MAKE OUR SCHEMA IDENTIFIER BETTER ADDING A FILTER FUNCTION TO ABOVE CHEERIO
      // cheerioFilter.map(c => {
      //   if (JSON.parse(c.innerHTML)["@graph"]) {
      //     cheers = JSON.parse(c.innerHTML)["@graph"].filter(
      //       sc => sc["@type"] === "Recipe"
      //     )[0];
      //   }
      //   if (JSON.parse(c.innerHTML)["@type"] === "Recipe") {
      //     cheers = JSON.parse(c.innerHTML);
      //   }
      // });

      // const cheers = JSON.parse(
      //   $("script")
      //     .get()
      //     .filter(v => v.attribs.type === "application/ld+json")[0]
      //     .children[0].data
      // );

      // const jaydom = JSON.parse(
      //   dom.window.document
      //     .querySelectorAll(`script[type="application/ld+json"]`)
      //     .filter(c => c.innerHTML.includes("Ingredient"))[0]
      // );

      // const jaydom =  dom.window.document.querySelectorAll(
      //     `script[type="application/ld+json"]`
      //   ).filter(c => JSON.parse(c.innerHTML)['@type'] === 'Recipe')
      // console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeeRE");
      // const recipeSnagger = fetched_recipe_data => {
      //   if (single_recipe(fetched_recipe_data)) {
      //     return fetched_recipe_data;
      //   } else if (graph_recipe(fetched_recipe_data)) {
      //     return fetched_recipe_data["@graph"].filter(
      //       graph_object => graph_object["@type"] === "Recipe"
      //     )[0];
      //   } else {
      //     return "The Recipe is in neither specified format";
      //   }
      // };
      // const single_recipe = fetched_recipe_data => {
      //   return fetched_recipe_data["@type"] === "Recipe" ? true : false;
      // };
      // const graph_recipe = fetched_recipe_data => {
      //   return fetched_recipe_data["@graph"] ? true : false;
      // };
      console.log("CHEERS : ", cheers);
      let {
        name,
        author,
        datePublished,
        image,
        recipeYield,
        prepTime,
        cookTime,
        totalTime,
        recipeIngredient,
        recipeInstructions,
        recipeCategory,
        recipeCuisine,
      } = cheers;

      let images = [];
      console.log("HEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEeeRE");
      if (typeof image === "string") {
        images.push(image);
      } else if (Array.isArray(image)) {
        image.map((i) => {
          if (typeof i === "string") {
            images.push(i);
          } else if (typeof i === "array") {
            images = [...images, ...i];
          }
        });
      } else if (typeof image === "object") {
        images = [...images, image.url];
      }
      let instructions = [];

      if (typeof recipeInstructions === "string") {
        instructions.push({
          "@type": "HowToStep",
          text: recipeInstructions,
        });
      }

      if (Array.isArray(recipeInstructions)) {
        console.log("Highway to the Array Zone");
        recipeInstructions.map((i) => {
          if (i.itemListElement) {
            i.itemListElement.map((x) => {
              if (typeof x === "object") {
                instructions.push(x);
              } else if (typeof x === "string") {
                instructions.push({
                  "@type": "HowToStep",
                  text: x,
                });
              }
            });
          }
          if (typeof i === "object") {
            console.log("Array Zone Object");
            instructions.push(i);
          } else if (typeof i === "string") {
            console.log("Array Zone String");
            instructions.push({
              "@type": "HowToStep",
              text: i,
            });
          } else if (Array.isArray(i)) {
            if (typeof i === "object") {
              console.log("Array Zone Object");
              instructions.push(i);
            } else if (typeof i === "string") {
              console.log("Array Zone String");
              instructions.push({
                "@type": "HowToStep",
                text: i,
              });
            }
          }
        });
      }

      if (Array.isArray(author)) {
        console.log("AUTHROAY");
        author = author.filter((c) => c["@type"] === "Person")[0].name;
        console.log("AUTHROA222Y", author);
      }

      if (typeof author === "object") {
        author = author.name;
      }

      console.log("LOOK AT ME RECIPE YIEEEEEEEEEEEEEELD : ", recipeYield);

      console.log("RECIPY YIELDY  : ", recipeYield);

      console.log("IS_ARRAY? : ", Array.isArray(recipeYield));

      if (Array.isArray(recipeYield)) {
        recipeYield = recipeYield.join(" ");
      }

      if (typeof recipeYield === "number") {
        recipeYield = recipeYield.toString();
      }
      console.log(typeof recipeYield);

      const recipe = {
        name,
        author,
        datePublished,
        image: images,
        recipeYield,
        prepTime,
        cookTime,
        totalTime,
        recipeIngredient,
        recipeInstructions: instructions,
        recipeCategory,
        recipeCuisine,
        url: recipe_url,
      };

      console.log("made it to end");
      return {
        status: 200,
        msg: "Recipe Successfully Created",
        recipe,
      };
    } catch (error) {
      return {
        status: 400,
        msg: "Error Encountered",
        recipe: "",
        url: originURL,
      };
    }
  } catch (error) {
    return {
      status: 400,
      msg: `Error Could Not Retrieve Recipe from ${recipe_url}`,
    };
  }
};

module.exports = jackofallscrapers;
