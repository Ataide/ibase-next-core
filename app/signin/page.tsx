"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useRouter } from "next/navigation";

import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Fade from "@mui/material/Fade";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { infer as Infer, object, string } from "zod";

const schema = object({
  email: string().email("Digite um email válido."),
  password: string().min(4, "Precisa ter ao menos 4 caracteres."),
});

type CredentialsType = Infer<typeof schema>;

export default function SignIn() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CredentialsType>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const onSubmit = async (data: CredentialsType) => {
    setLoading(true);
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    }).then((result) => {
      if (result?.error) {
        setError("Não foi possivel se logar. Verifique email/senha.");
        setLoading(false);
        setTimeout(() => {
          setError("");
        }, 3000);
      }
      if (result?.ok) {
        router.push("/app");
      }
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Autenticação
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
              <TextField
                variant="outlined"
                label="Email"
                margin="normal"
                fullWidth
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                inputRef={ref}
                {...field}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            defaultValue=""
            render={({ field: { ref, ...field } }) => (
              <TextField
                variant="outlined"
                label="Password"
                margin="normal"
                fullWidth
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                inputRef={ref}
                {...field}
              />
            )}
          />

          <Fade in={Boolean(error)}>
            <Alert severity="error">{error}</Alert>
          </Fade>

          <Button
            type="submit"
            disabled={loading}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        IBase.com
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
