import { Resend } from "resend";
import { RESEND_API_KEY } from "./env.js";

export default new Resend(RESEND_API_KEY);
