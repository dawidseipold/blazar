"use server";

import { redirect } from "next/navigation";
import { validateSession } from "../session";
import {
  createAccountDetails,
  getAccountUsername,
  updateAccountUsername,
} from "../account";
// import { cloudinary } from "@/lib/cloudinary";
import { fill } from "@cloudinary/url-gen/actions/resize";
import { file } from "bun";
import { v2 as cloudinary } from "cloudinary";
import { uploadFile } from "@/lib/cloudinary";

type Step = "account-details" | "workspace";

export const checkIfStepCompleted = async (step: Step) => {
  const session = await validateSession();

  if (!session.user) {
    return redirect("/auth/signin");
  }

  if (step === "account-details") {
    const username = await getAccountUsername(session.user.id);

    if (username) {
      // return redirect("/onboarding/workspace");
      return redirect("/");
    }
  }
};

export const setAccountDetails = async (formData: FormData) => {
  const session = await validateSession();

  if (!session.user) {
    throw new Error("Unauthorized");
  }

  // TODO: Check if username is already in use
  const username = String(formData.get("username"));

  // TODO: Avatar upload
  // const avatar = formData.get("avatar") as File;

  // if (avatar) {
  //   await uploadFile(avatar, "avatars", [session.user.id, "avatar"]);

  //   const avatarUrl = await cloudinary.api.resources_by_asset_folder(
  //     "avatars",
  //     {
  //       context: true,
  //     }
  //   );

  //   console.log(avatarUrl);
  // }

  // TODO: Add a check to see if the account details already exist if so update the username (manual fetch security)
  await createAccountDetails({
    userId: session.user.id,
    username,
  });

  // return redirect("/onboarding/workspace");
  return redirect("/");
};
