import React, { Dispatch, SetStateAction, useState } from "react";
import { SignInFlow } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import Image from "next/image";
import { icons } from "@/data/assets";
interface SignUpCardProps {
  setflow: Dispatch<SetStateAction<SignInFlow>>;
}

const signUpFormSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password must be at most 16 characters")
      .refine((val) => /[A-Z]/.test(val), {
        message: "Password must contain at least one uppercase letter.",
      })
      .refine((val) => /\d/.test(val), {
        message: "Password must contain at least one number.",
      })
      .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
        message: "Password must contain at least one symbol.",
      }),
    confirm_password: z
      .string()
      .min(8, "Confirm password must be at least 8 characters")
      .max(16, "Confirm password must be at most 16 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Password and Confirm Password don't match.",
    path: ["confirm_password"], // This makes sure the error is linked to the confirm_password field
  });

const SignUpCard: React.FC<SignUpCardProps> = ({ setflow }) => {
  const [is_loading, setis_loading] = useState(false);
  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpFormSchema>) => {
    setis_loading(true);
    console.log(values);
    setTimeout(() => {
      setis_loading(false);
    }, 3000);
  };
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Signup to continue</CardTitle>
        <CardDescription>
          Use your email or another service to continue
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5 px-0 pb-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2.5">
            <FormField
              control={form.control}
              name={"email"}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter your email"}
                      {...field}
                      type={"email"}
                    />
                  </FormControl>
                  <FormMessage color="crimson" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"password"}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter your password"}
                      {...field}
                      type={"password"}
                    />
                  </FormControl>
                  <FormMessage color="crimson" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={"confirm_password"}
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={"Enter your password"}
                      {...field}
                      type={"password"}
                    />
                  </FormControl>
                  <FormMessage color="crimson" />
                </FormItem>
              )}
            />
            <Button disabled={is_loading} className={"shad-primary-btn w-full"}>
              {is_loading ? (
                <div className="flex items-center gap-4">
                  <Image
                    src={icons.loader}
                    width={20}
                    height={20}
                    alt="loader"
                    className="animate-spin"
                  />
                  Submitting
                </div>
              ) : (
                <div>Submit</div>
              )}
            </Button>
          </form>
        </Form>
        <Separator />
        <div className="flex flex-col gap-y-2.5">
          <Button
            variant={"outline"}
            className="w-full relative"
            size={"lg"}
            onClick={() => {}}
          >
            <FcGoogle className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl" />
            Continue with google
          </Button>
          <Button
            variant={"outline"}
            className="w-full relative"
            size={"lg"}
            onClick={() => {}}
          >
            <FaGithub className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl" />
            Continue with github
          </Button>
        </div>

        <p className="text-center text-muted-foreground text-sm">
          Already have an account?{" "}
          <span
            className="cursor-pointer hover:underline text-sky-700"
            onClick={() => setflow("signIn")}
          >
            Sign In
          </span>
        </p>
      </CardContent>
    </Card>
  );
};

export default SignUpCard;
