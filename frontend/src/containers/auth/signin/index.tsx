"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "@/components/inputs/text-input";
import { CONSTANTS } from "@/common/constants";
import { PrimaryButton } from "@/components/buttons/primary";
import { AXIOS_INSTANCE } from "@/common/api-client";
import { useAuthStore } from "@/stores/auth";
import { SigninFormData } from "./dto";
import styles from "./index.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Toasts } from "@/components/toasts";

export default function Signin() {
  const router = useRouter();

  const { setUser, setToken } = useAuthStore();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const handleLogin = async (data: SigninFormData) => {
    setSubmitting(true);
    try {
      const response = (
        await AXIOS_INSTANCE.post(`/auth/login`, {
          email: data.email,
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
        <h1 className={styles.title}>Login to your account</h1>
        <form onSubmit={handleSubmit(handleLogin)}>
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
          <div style={{ marginTop: `16px` }} />
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
          <PrimaryButton
            type="submit"
            disabled={submitting}
            isLoading={submitting}
          >
            Register
          </PrimaryButton>
          <div className={styles.footer}>
            <p>Don't have an account?</p>
            <Link href="/signup">Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
