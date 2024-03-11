const Router = require("express");
const { createUser} = require("../controllers/usuario");
const router = Router();

module.exports = router;

//router.get("/", )

router.post("/", createUser)

//router.delete("/:id", usersDelete)

//router.put("/:id", usersPut)

//router.patch("/", usersPatch)