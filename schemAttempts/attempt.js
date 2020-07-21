let cheeriLogs = {};
let cheeriInstructions = [];
let cheeriIngredients = [];
let nowPrintI = false;
$("*[itemprop]")
  .get()
  .map(i => {
    if (nowPrintI) {
      console.log(i);
    }
    const itemProp = i.attribs ? i.attribs.itemprop : null;

    if (itemProp === "recipeInstructions") {
      i.children[0].children.map((y, x) => {
        console.log(`RECIPE INSTRUCTION ${x}: `, y.children);
        console.log(1);
        if (y.children) {
          console.log(
            `RECIPE INSTRUCTION ${x} DATA: `,
            Array.isArray(y.children) ? y.children[0].data : y.children.data
          );
        } else if (Array.isArray(y.children)) {
          console.log(3);
          if (y.children[0].data) {
            console.log(`RECIPE INSTRUCTION ${x} DATA: `, y.children[0].data);
          }
        }
      });
    }

    let secondary;
    switch (itemProp) {
      //  'url',
      //   'name',
      //   'description',
      //   'image',
      //   'name',
      //   'recipeYield',
      //   'description',
      //   'recipeCategory',
      //   'prepTime',
      //   'cookTime',
      //   'author',
      //   'image',
      //   'ingredients',
      //   'ingredients',
      //   'ingredients',
      //   'ingredients',
      //   'ingredients',
      //   'ingredients',
      //   'ingredients',
      //   'ingredients',
      //   'recipeInstructions'
      case "url":
        secondary = i.attribs.href ? i.attribs.href : null;
        break;
      case "name":
        secondary = i.attribs.content ? i.attribs.content : null;
        break;
      case "description":
        secondary = i.attribs.content ? i.attribs.content : null;
        break;
      case "recipeYield":
        secondary = i.attribs.content ? i.attribs.content : null;
        break;
      case "recipeCategory":
        secondary = i.attribs.content ? i.attribs.content : null;
        break;
      case "prepTime":
        secondary = i.attribs.content ? i.attribs.content : null;
        break;
      case "cookTime":
        secondary = i.attribs.content ? i.attribs.content : null;
      case "author":
        secondary = i.attribs.content ? i.attribs.content : null;
        break;
      case "image":
        secondary = i.attribs.src ? i.attribs.src : null;
        break;
      case "ingredients":
        secondary = i.attribs.content ? i.attribs.content : null;
      default:
        secondary = null;
        break;
    }
    console.log("ItemProp:", itemProp, "Secondary:", secondary);

    if (itemProp === "ingredients" || itemProp === "recipeIngredient") {
      console.log("IIIIIIIIIIIIIIIIIII: ", i);
      if (i.attribs.content) {
        console.log("ingredients first option");
        cheeriIngredients.push(i.attribs.content);
      } else if (i.children[0].data) {
        cheeriIngredients.push(i.children[0].data);
      } else if (
        $(`*[itemprop=${i.attribs.itemprop}]`).get()[0].children[0] &&
        $(`*[itemprop=${i.attribs.itemprop}]`).get()[0].children[0].data
      ) {
        console.log("ingredients second option");
        console.log(
          "Ingredient Data: ",
          $(`*[itemprop=${i.attribs.itemprop}]`).get()[0].children[0].data
        );
        cheeriIngredients.push(
          $(`*[itemprop=${i.attribs.itemprop}]`)
            .get()[0]
            .children[0].data.trim()
        );
        console.log("Completed Ingredient task");
      }
    }

    if (secondary === null && itemProp !== "ingredients" && itemProp !== null) {
      console.log("Entering Abyss");

      if (
        $(`*[itemprop=${i.attribs.itemprop}]`).get()[0].children[0] &&
        $(`*[itemprop=${i.attribs.itemprop}]`).get()[0].children[0].data !==
          undefined
      ) {
        console.log("Yup");
        secondary = $(`*[itemprop=${i.attribs.itemprop}]`)
          .get()[0]
          .children[0].data.trim();
      }
      console.log("To End");
    }

    if (secondary !== null && itemProp !== null) {
      console.log("Other end");
      cheeriLogs[`${i.attribs.itemprop}`] = secondary;
    }
  });

console.log("Cheri Log Time");
console.log(cheeriIngredients);
cheeriLogs["ingredients"] = cheeriIngredients;
console.log("CheeriLogs: ", cheeriLogs);
