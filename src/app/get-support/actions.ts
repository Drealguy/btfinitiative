"use server";

import { validateAll, type SupportApplication } from "@/lib/support-application";

type Result = { ok: true } | { ok: false; error: string };

export async function submitApplication(application: SupportApplication): Promise<Result> {
  const errors = validateAll(application);
  if (Object.keys(errors).length > 0) {
    return { ok: false, error: "Some answers are missing. Please go back and check each question." };
  }

  // TODO: deliver the application (email, CRM or database) once the team confirms where
  // applications should go. Until then nothing is stored — do not launch without this.
  return { ok: true };
}
