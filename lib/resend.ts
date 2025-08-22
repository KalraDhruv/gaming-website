import { Resend } from "resend";
import { env } from "process";

export const resend = new Resend(env.RESEND_API_KEY)