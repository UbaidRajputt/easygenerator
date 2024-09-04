"use client";

import { useAuthStore } from "@/stores/auth";
import styles from "./index.module.css";
import AuthRoute from "@/common/protectedroutehoc/useAuthRouter";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  const { user, setUser, setToken } = useAuthStore();

  const handleLogout = () => {
    router.push("/signin");
    setUser(null);
    setToken(null);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>Welcome, {user?.fullName}</h1>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main className={styles.main}>
        <p className={styles.description}>
          This is your personalized dashboard. Explore and enjoy!
        </p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Profile</h2>
            <p>View and edit your profile information.</p>
          </div>
          <div className={styles.card}>
            <h2>Settings</h2>
            <p>Customize your account settings.</p>
          </div>
          <div className={styles.card}>
            <h2>Analytics</h2>
            <p>Check your activity and performance.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthRoute(Home);
