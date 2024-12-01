import { RegistrationForm } from "./RegistrationForm";

import { z } from "zod";
import { schema } from "../app/registrationSchema";

export default function Home() {
  const onDataAction = async (data: z.infer<typeof schema>) => {
    "use server";
    const parsed = await schema.safeParseAsync(data);

    if (parsed.success) {
      console.log("User registerd");
      return { message: "User register", user: parsed.data };
    } else {
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };
  const onFormAction = async (
    prevState: {
      message: string;
      user?: z.infer<typeof schema>;
      issues?: string[];
    },
    formData: FormData
  ) => {
    "use server";
    const data = Object.fromEntries(formData);
    const parsed = schema.safeParse(data);

    if (parsed.success) {
      console.log("User registered");
      return { message: "User registered", user: parsed.data };
    } else {
      return {
        message: "Invalid data",
        issues: parsed.error.issues.map((issue) => issue.message),
      };
    }
  };

  return (
    <div className="mx-auto max-w-xl my-10">
      <RegistrationForm
        onFormAction={onFormAction}
        onDataAction={onDataAction}
      />
    </div>
  );
}
