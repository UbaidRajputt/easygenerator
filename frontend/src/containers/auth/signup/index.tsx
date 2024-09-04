"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { SignupFormData } from "./dto";
import { TextInput } from "@/components/inputs/text-input";
import { CONSTANTS } from "@/common/constants";
import { PrimaryButton } from "@/components/buttons/primary";
import { AXIOS_INSTANCE } from "@/common/api-client";
import { useAuthStore } from "@/stores/auth";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toasts } from "@/components/toasts";

export default function Signup() {
  const router = useRouter();

  const { setUser, setToken } = useAuthStore();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignupFormData>();

  const handleRegister = async (data: SignupFormData) => {
    setSubmitting(true);
    try {
      const response = (
        await AXIOS_INSTANCE.post(`/auth/signup`, {
          email: data.email,
          fullName: data.fullName,
          password: data.password,
        })
      )?.data;
      setToken({
        accessToken: response.result.access_token,
        refreshToken: response.result.refresh_token,
      });
      const user = (
        await AXIOS_INSTANCE.get(`/auth/me`, {
          headers: {
            Authorization: `bearer ${response.result.access_token}`,
          },
        })
      )?.data;
      setUser(user.result);
      router.push("/home");
      setSubmitting(false);
    } catch (error: any) {
      setSubmitting(false);
      Toasts.error(error.response.data.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div className={styles.logoWrapper}>
          <Image src="/logo.webp" alt="Brand Logo" width={220} height={100} />
        </div>
        <h1 className={styles.title}>Register your account</h1>
        <form onSubmit={handleSubmit(handleRegister)} className={styles.form}>
          <TextInput
            name={`email`}
            label={`Email`}
            placeholder={`john.doe@example.com`}
            register={register}
            validation={{
              required: true,
              pattern: CONSTANTS.EMAIL_REGEX,
            }}
            error={
              errors.email?.type === `required`
                ? `Email is required`
                : errors.email?.type === `pattern`
                ? `Email is invalid`
                : ``
            }
          />
          <TextInput
            name={`fullName`}
            label={`Name`}
            placeholder={`John Doe`}
            register={register}
            validation={{
              required: true,
            }}
            error={
              errors.fullName?.type === `required` ? `Name is required` : ``
            }
          />

          <TextInput
            name={`password`}
            label={`Password`}
            type="password"
            placeholder={`Password@123`}
            register={register}
            validation={{
              required: true,
              pattern: CONSTANTS.PASSWORD_REGEX,
            }}
            error={
              errors.password?.type === `required`
                ? `Password is required`
                : errors.password?.type === `pattern`
                ? `Password must be 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character`
                : ``
            }
          />

          <TextInput
            name={`confirmPassword`}
            label={`Confirm password`}
            type="password"
            placeholder={`Same as password`}
            register={register}
            validation={{
              required: true,
              validate: (value: string) =>
                value === watch(`password`) || `Passwords do not match`,
            }}
            error={
              errors.confirmPassword?.type === `required`
                ? `Password is required`
                : errors.confirmPassword?.type === `validate`
                ? `Passwords do not match`
                : ``
            }
          />
          <PrimaryButton
            type="submit"
            disabled={submitting}
            isLoading={submitting}
          >
            Register
          </PrimaryButton>
        </form>
        <div className={styles.footer}>
          <p>Already have an account?</p>
          <Link href="/signin">Login</Link>
        </div>
      </div>
    </div>
  );
}
