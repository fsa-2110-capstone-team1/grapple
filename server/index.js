const { db } = require("./db");
const PORT = process.env.PORT || 8080;
const app = require("./app");
const seed = require("../script/seeds");

const init = async () => {
  try {
    if (process.env.SEED === "true") {
      await seed();
    } else {
      //TODO: delete force true if we want db to persist - but reseting makes testing easier
      await db.sync({ force: true });
    }
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
