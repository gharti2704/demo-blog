const { Router } = require("express");
const { signup } = require("../controllers/signup");
const { activateAccount } = require("../controllers/activate");
const { login } = require("../controllers/login");
const { logout } = require("../controllers/logout");
const {
  signupValidation,
  emailValidation,
  passwordResetValidation,
} = require("../middlewares/validation");
const { validate } = require("../middlewares/validator");
const { requireAuth, checkHeaders } = require("../middlewares/auth");
const { getAllBlogs, postBlog, getBlog } = require("../controllers/blog");
const { updateProfile } = require("../controllers/updateProfile");
const { getUser } = require("../controllers/user");
const { uploadImage } = require("../controllers/image");
const { incrementVisits } = require("../controllers/visits");
const { forgotPassword, resetPassword } = require("../controllers/password");

const router = Router();

router.post("/api/signup", signupValidation, validate, signup);
router.post("/api/activate", activateAccount);
router.get("/api/logout", requireAuth, logout);
router.post("/api/login", checkHeaders, login);
router.post("/api/forgot-password", emailValidation, validate, forgotPassword);
router.patch(
  "/api/reset-password",
  passwordResetValidation,
  validate,
  resetPassword
);
router.get("/api/all-blogs", getAllBlogs);
router.post("/api/blog", requireAuth, postBlog);
router.get("/api/blog", requireAuth, getBlog);
router.patch("/api/update-profile", requireAuth, updateProfile);
router.get("/api/user", requireAuth, getUser);
router.post("/api/upload/:blogId", requireAuth, uploadImage);
router.patch("/api/visit/:id", incrementVisits);

module.exports = router;
