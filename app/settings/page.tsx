"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Menu } from "lucide-react";

import AccountSettingsCard from "@/components/settings/AccountSettingsCard";
import AppearanceSettingsCard from "@/components/settings/AppearanceSettingsCard";
import MerchantRulesSettingsCard from "@/components/settings/MerchantRulesSettingsCard";
import ProfileSettingsCard from "@/components/settings/ProfileSettingsCard";
import SecuritySettingsCard from "@/components/settings/SecuritySettingsCard";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import {
  ApiError,
  clearSession,
  deleteMerchantCategoryRule,
  deleteProfile,
  getMerchantCategoryRules,
  getProfile,
  getToken,
  logout,
  requestEmailChange,
  saveUser,
  updatePassword,
  updateProfile,
  updateThemePreference,
} from "@/lib/api";
import type { MerchantCategoryRule, User } from "@/types/api";

type Notice = {
  type: "success" | "error";
  message: string;
} | null;

export default function SettingsPage() {
  const router = useRouter();
  const { setOpen } = useSidebar();
  const { theme, setTheme } = useTheme();
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState("");
  const [merchantRules, setMerchantRules] = useState<MerchantCategoryRule[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMerchantRules, setLoadingMerchantRules] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingTheme, setSavingTheme] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deletingRuleId, setDeletingRuleId] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice>(null);

  useEffect(() => {
    if (!getToken()) {
      router.replace("/auth");
      return;
    }

    const controller = new AbortController();

    async function loadProfile() {
      try {
        const profile = await getProfile(controller.signal);
        setUser(profile);
        setUsername(profile.username);
        setEmail(profile.email);
        saveUser(profile);
      } catch (requestError) {
        if (isAbortError(requestError)) return;

        handleAuthError(requestError, router);
        showError(
          setNotice,
          requestError,
          "Nao foi possivel carregar suas configuracoes.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadProfile();

    return () => controller.abort();
  }, [router]);

  useEffect(() => {
    if (!getToken()) return;

    const controller = new AbortController();

    async function loadMerchantRules() {
      try {
        setMerchantRules(await getMerchantCategoryRules(controller.signal));
      } catch (requestError) {
        if (isAbortError(requestError)) return;

        handleAuthError(requestError, router);
        showError(
          setNotice,
          requestError,
          "Nao foi possivel carregar as regras de merchant.",
        );
      } finally {
        if (!controller.signal.aborted) setLoadingMerchantRules(false);
      }
    }

    void loadMerchantRules();

    return () => controller.abort();
  }, [router]);

  const canDelete = useMemo(
    () => deleteConfirmation.trim().toUpperCase() === "DELETAR",
    [deleteConfirmation],
  );

  async function submitProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingProfile(true);
    setNotice(null);

    try {
      if (username.trim() !== user?.username) {
        const updatedUser = await updateProfile({
          username: username.trim(),
          email: email.trim(),
        });
        setUser(updatedUser);
        saveUser(updatedUser);
      } else {
        await requestEmailChange(email.trim());
      }
      setNotice({
        type: "success",
        message:
          "Enviamos um e-mail de confirmação para o novo endereço. A alteração só será concluída após a confirmação.",
      });
    } catch (requestError) {
      handleAuthError(requestError, router);
      showError(setNotice, requestError, "Nao foi possivel atualizar seu perfil.");
    } finally {
      setSavingProfile(false);
    }
  }

  async function submitPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSavingPassword(true);
    setNotice(null);

    try {
      await updatePassword({
        currentPassword,
        password,
        confirmPassword,
      });
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
      setNotice({ type: "success", message: "Senha atualizada." });
    } catch (requestError) {
      handleAuthError(requestError, router);
      showError(setNotice, requestError, "Nao foi possivel atualizar sua senha.");
    } finally {
      setSavingPassword(false);
    }
  }

  async function changeTheme(nextTheme: "light" | "dark") {
    setSavingTheme(true);
    setNotice(null);
    setTheme(nextTheme);

    try {
      const updatedUser = await updateThemePreference(
        nextTheme === "dark" ? "DARK" : "LIGHT",
      );
      setUser(updatedUser);
      saveUser(updatedUser);
      setNotice({ type: "success", message: "Tema atualizado." });
    } catch (requestError) {
      handleAuthError(requestError, router);
      showError(setNotice, requestError, "Nao foi possivel atualizar o tema.");
    } finally {
      setSavingTheme(false);
    }
  }

  async function handleLogout() {
    await logout();
    router.replace("/auth");
  }

  async function deleteAccount() {
    if (!canDelete) return;

    setDeleting(true);
    setNotice(null);

    try {
      await deleteProfile();
      clearSession();
      router.replace("/auth");
    } catch (requestError) {
      handleAuthError(requestError, router);
      showError(setNotice, requestError, "Nao foi possivel deletar sua conta.");
      setDeleting(false);
    }
  }

  async function removeMerchantRule(ruleId: string) {
    const confirmed = window.confirm("Deseja excluir esta regra de merchant?");
    if (!confirmed) return;

    setDeletingRuleId(ruleId);
    setNotice(null);

    try {
      await deleteMerchantCategoryRule(ruleId);
      setMerchantRules((currentRules) =>
        currentRules.filter((rule) => rule.id !== ruleId),
      );
      setNotice({ type: "success", message: "Regra removida." });
    } catch (requestError) {
      handleAuthError(requestError, router);
      showError(setNotice, requestError, "Nao foi possivel remover a regra.");
    } finally {
      setDeletingRuleId(null);
    }
  }

  return (
    <main className="w-full not-lg:max-w-[100vw]">
      <header className="flex items-center justify-between border-b border-border px-4 py-4">
        <div>
          <h1 className="text-xl font-semibold">Configuracoes</h1>
          <p className="text-sm text-muted-foreground">
            Gerencie sua conta e preferencias.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
          className="rounded-lg p-2 hover:bg-muted lg:hidden"
        >
          <Menu size={22} />
        </button>
      </header>

      {notice && <SettingsNotice notice={notice} />}

      <div className="grid gap-4 p-4 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <ProfileSettingsCard
          username={username}
          email={email}
          loading={loading}
          saving={savingProfile}
          onUsernameChange={setUsername}
          onEmailChange={setEmail}
          onSubmit={submitProfile}
        />

        <AppearanceSettingsCard
          theme={theme}
          saving={savingTheme}
          onThemeChange={(nextTheme) => void changeTheme(nextTheme)}
        />

        <SecuritySettingsCard
          currentPassword={currentPassword}
          password={password}
          confirmPassword={confirmPassword}
          saving={savingPassword}
          onCurrentPasswordChange={setCurrentPassword}
          onPasswordChange={setPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={submitPassword}
        />

        <MerchantRulesSettingsCard
          rules={merchantRules}
          loading={loadingMerchantRules}
          deletingRuleId={deletingRuleId}
          onDeleteRule={(ruleId) => void removeMerchantRule(ruleId)}
        />

        <AccountSettingsCard
          user={user}
          deleteConfirmation={deleteConfirmation}
          canDelete={canDelete}
          deleting={deleting}
          onDeleteConfirmationChange={setDeleteConfirmation}
          onLogout={() => void handleLogout()}
          onDeleteAccount={() => void deleteAccount()}
        />
      </div>
    </main>
  );
}

function SettingsNotice({ notice }: { notice: Exclude<Notice, null> }) {
  return (
    <div
      role="alert"
      className={`mx-4 mt-4 rounded-xl border px-4 py-3 text-sm ${
        notice.type === "success"
          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-400"
          : "border-red-500/25 bg-red-500/10 text-red-400"
      }`}
    >
      {notice.message}
    </div>
  );
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function handleAuthError(error: unknown, router: ReturnType<typeof useRouter>) {
  if (error instanceof ApiError && error.status === 401) {
    clearSession();
    router.replace("/auth");
  }
}

function showError(
  setNotice: (notice: Notice) => void,
  error: unknown,
  fallback: string,
) {
  setNotice({
    type: "error",
    message: error instanceof ApiError ? error.message : fallback,
  });
}
